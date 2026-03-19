import express from "express";
import {
  getUsedProducts,
  getMyUsedProducts,
  getUsedProductById,
  createUsedProduct,
  deleteUsedProduct,
  markAsSold,
  updateUsedProductImage,
} from "../controllers/usedProductController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getUsedProducts).post(protect, createUsedProduct);
router.route("/mine").get(protect, getMyUsedProducts);
router.route("/:id").get(getUsedProductById).delete(protect, deleteUsedProduct);
router.route("/:id/sold").put(protect, markAsSold);
router.route("/:id/image").put(protect, updateUsedProductImage);

export default router;