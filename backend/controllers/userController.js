import User from "../models/User.js";
import Order from "../models/Order.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile (name, email, phone, address, bio, profilePicture, storeName, password)
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Update all allowed fields
    const fields = ["name", "email", "phone", "address", "profilePicture", "bio", "storeName", "panNumber", "storeLocation"];
    fields.forEach(field => {
      if (req.body[field] !== undefined) user[field] = req.body[field];
    });

    if (req.body.password) {
      user.password = req.body.password; // pre-save hook hashes it
    }

    const updated = await user.save();

    res.json({
      success: true,
      data: {
        _id:            updated._id,
        name:           updated.name,
        email:          updated.email,
        role:           updated.role,
        profilePicture: updated.profilePicture,
        phone:          updated.phone,
        address:        updated.address,
        bio:            updated.bio,
        storeName:      updated.storeName,
        isDeactivated:  updated.isDeactivated,
        isApproved:     updated.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user stats (orders count, total spent, wishlist count)
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("wishlist");

    // Count orders and calculate total spent
    const orders = await Order.find({ user: req.user._id });
    const ordersPlaced = orders.length;
    const totalSpent = orders
      .filter(o => o.paymentStatus !== "Cancelled")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    const wishlistCount = user?.wishlist?.length || 0;

    res.json({
      success: true,
      data: {
        ordersPlaced,
        totalSpent,
        wishlistCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Sync wishlist IDs to DB
// @route   PUT /api/users/wishlist
// @access  Private
export const syncWishlist = async (req, res) => {
  try {
    const { wishlist } = req.body; // array of product IDs
    if (!Array.isArray(wishlist)) {
      return res.status(400).json({ success: false, message: "wishlist must be an array" });
    }
    await User.findByIdAndUpdate(req.user._id, { wishlist });
    res.json({ success: true, message: "Wishlist synced" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user (admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name         = req.body.name         || user.name;
    user.email        = req.body.email        || user.email;
    user.role         = req.body.role         || user.role;
    user.isActive     = req.body.isActive     !== undefined ? req.body.isActive     : user.isActive;
    user.isDeactivated= req.body.isDeactivated!== undefined ? req.body.isDeactivated: user.isDeactivated;
    user.isApproved   = req.body.isApproved   !== undefined ? req.body.isApproved   : user.isApproved;

    const updated = await user.save();
    res.json({
      success: true,
      data: {
        _id:           updated._id,
        name:          updated.name,
        email:         updated.email,
        role:          updated.role,
        isActive:      updated.isActive,
        isDeactivated: updated.isDeactivated,
        isApproved:    updated.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    await User.deleteOne({ _id: user._id });
    res.json({ success: true, message: "User removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Submit Vendor KYC
// @route   PUT /api/users/kyc
// @access  Private/Vendor
export const submitKYC = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.role !== "vendor") {
      return res.status(403).json({ success: false, message: "Only vendors can submit KYC" });
    }

    const { storeName, storePhone, storeLocation, panNumber, panImage, licenseImage } = req.body;

    user.storeName = storeName || user.storeName;
    user.storePhone = storePhone || user.storePhone;
    user.storeLocation = storeLocation || user.storeLocation;
    user.panNumber = panNumber || user.panNumber;
    user.panImage = panImage || user.panImage;
    user.licenseImage = licenseImage || user.licenseImage;
    user.kycSubmitted = true;

    await user.save();

    res.json({
      success: true,
      message: "KYC submitted successfully! Please wait for admin approval.",
      data: {
        kycSubmitted: true,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
