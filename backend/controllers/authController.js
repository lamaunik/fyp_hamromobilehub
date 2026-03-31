import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Send token response helper
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id:             user._id,
      name:           user.name,
      email:          user.email,
      role:           user.role,
      profilePicture: user.profilePicture,
      phone:          user.phone,
      address:        user.address,
      bio:            user.bio,
      storeName:      user.storeName,
      isDeactivated:  user.isDeactivated,
      isApproved:     user.isApproved,
      kycSubmitted:   user.kycSubmitted,
    },
  });
};

// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const VALID_ROLES = ["user", "vendor", "admin"];
    const assignedRole = VALID_ROLES.includes(role) ? role : "user";

    // Vendors require admin approval
    const isApproved = assignedRole !== "vendor";

    const user = await User.create({ name, email, password, role: assignedRole, isApproved });

    // Generate OTP
    const otp = user.getEmailVerificationOTP();
    await user.save({ validateBeforeSave: false });

    // Send Verification Email
    try {
      await sendEmail({
        email: user.email,
        subject: "HamroMobileHub - Verify your email",
        message: "Please use the following 6-digit code to verify your email address.",
        otp,
      });

      return res.status(201).json({
        success: true,
        requiresEmailVerification: true,
        email: user.email,
        message: "Registration successful. Please check your email for the verification code.",
      });
    } catch (err) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Please provide email and verification code" });
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      emailVerificationToken: hashedOTP,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });

    if (!user.isApproved) {
      return res.status(200).json({
        success: true,
        pendingApproval: true,
        message: "Email verified successfully. Please wait for an Admin to approve your Vendor account.",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: "Email is already verified" });
    }

    const otp = user.getEmailVerificationOTP();
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: "HamroMobileHub - Verify your email",
      message: "Please use the following 6-digit code to verify your email address. It will expire in 10 minutes.",
      otp,
    });

    res.status(200).json({ success: true, message: "Verification code sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email could not be sent" });
  }
};

// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated. Contact support.",
      });
    }

    // REMOVED: isApproved check. Vendors can now log in but will be restricted to KYC page in frontend.

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isEmailVerified) {
      const otp = user.getEmailVerificationOTP();
      await user.save({ validateBeforeSave: false });
      
      try {
        await sendEmail({
          email: user.email,
          subject: "HamroMobileHub - Verify your email",
          message: "Please use the following 6-digit code to verify your email address.",
          otp,
        });
        return res.status(403).json({
          success: false,
          requiresEmailVerification: true,
          email: user.email,
          message: "Email not verified. A new verification code has been sent.",
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: "Error sending verification email" });
      }
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = user.getEmailVerificationOTP();
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: "HamroMobileHub - Password Reset Code",
      message: "Please use the following 6-digit code to reset your password.",
      otp,
    });

    res.status(200).json({ success: true, message: "Reset code sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email could not be sent" });
  }
};

// @route   PUT /api/auth/resetpassword
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      emailVerificationToken: hashedOTP,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset code" });
    }

    user.password = password;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id:             user._id,
        name:           user.name,
        email:          user.email,
        role:           user.role,
        profilePicture: user.profilePicture,
        phone:          user.phone,
        address:        user.address,
        bio:            user.bio,
        storeName:      user.storeName,
        isDeactivated:  user.isDeactivated,
        createdAt:      user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};