import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  cancelOrder,
  deleteOrder,
  getMyOrders,
  getOrders,
  getMyVendorOrders,
  initiateKhaltiPayment,
  verifyKhaltiPayment,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/vendor/myorders")
  .get(protect, restrictTo("vendor"), getMyVendorOrders);

router.post("/khalti/initiate", protect, initiateKhaltiPayment);
router.post("/khalti/verify", protect, verifyKhaltiPayment);

router.route("/")
  .post(protect, addOrderItems)
  .get(protect, restrictTo("admin"), getOrders);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id")
  .get(protect, getOrderById)
  .delete(protect, deleteOrder);

router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, restrictTo("admin", "vendor"), updateOrderToDelivered);
router.route("/:id/cancel").put(protect, cancelOrder);

export default router;