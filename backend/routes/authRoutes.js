import express from "express";
import { register, login, getMe, logout, verifyEmail, resendVerification, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;
