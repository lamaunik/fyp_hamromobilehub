import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  syncWishlist,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  submitKYC,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// User profile routes (any logged-in user)
router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// User stats route (orders count, total spent, wishlist count)
router.get("/stats", protect, getUserStats);

// Wishlist sync route
router.put("/wishlist", protect, syncWishlist);

// Vendor KYC route
router.put("/kyc", protect, restrictTo("vendor"), submitKYC);

// Admin only routes below
router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(getUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;