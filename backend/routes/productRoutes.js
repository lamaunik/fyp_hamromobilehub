import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/vendor/myproducts")
  .get(protect, restrictTo("vendor"), getMyProducts);

router.route("/")
  .get(getProducts)
  .post(protect, restrictTo("admin", "vendor"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, restrictTo("admin", "vendor"), updateProduct)
  .delete(protect, restrictTo("admin", "vendor"), deleteProduct);

export default router;
