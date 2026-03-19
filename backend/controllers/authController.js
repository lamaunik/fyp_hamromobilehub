import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

    if (!isApproved) {
      return res.status(201).json({
        success: true,
        pendingApproval: true,
        message: "Registration successful. Please wait for an Admin to approve your Vendor account before logging in.",
      });
    }

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

    if (user.isApproved === false) {
      return res.status(403).json({
        success: false,
        message: "Your vendor account is pending admin approval.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

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