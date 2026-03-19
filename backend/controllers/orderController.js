import Order from "../models/Order.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "No order items" });
    }
    
    // In a real app we would recalculate prices on the backend rather than trusting client

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Check if order belongs to user or if user is admin/vendor
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role === "user") {
      return res.status(403).json({ success: false, message: "Not authorized to view this order" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentStatus = "Paid";
    // Usually you'd store Stripe/PayPal payment result here

    const updatedOrder = await order.save();
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin/Vendor
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Only allow cancellation if order belongs to the user or user is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
    }

    // Only allow cancellation for Pending orders
    if (order.paymentStatus !== "Pending") {
      return res.status(400).json({ success: false, message: `Cannot cancel an order with status: ${order.paymentStatus}` });
    }

    order.paymentStatus = "Cancelled";
    // If you have an `isCancelled` flag or `status` you'd update it here too.
    
    const updatedOrder = await order.save();
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders for logged in vendor
// @route   GET /api/orders/vendor/myorders
// @access  Private/Vendor
export const getMyVendorOrders = async (req, res) => {
  try {
    // We only want orders where at least one orderItem belongs to the vendor
    // Actually we need to filter the exact items, but for now we'll just check if orderItems has a product that belongs to this vendor
    // The easiest way without complex aggregation is to fetch all products for the vendor, and then find orders that contain those products.
    // However, we don't store vendor ID on the order. We store Product ID on the orderItem.
    
    // Find all products that belong to this vendor
    const vendorProducts = await import("../models/Product.js").then(m => m.default.find({ vendor: req.user._id }).select("_id"));
    const vendorProductIds = vendorProducts.map(p => p._id);

    // Find orders where at least one orderItem has a product in vendorProductIds
    const orders = await Order.find({ "orderItems.product": { $in: vendorProductIds } }).populate("user", "name email").sort({ createdAt: -1 });

    // Technically a vendor should only see their own items from the order, not the whole order. But this is okay for a simple version.
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email").sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an order (only Cancelled orders can be deleted by user)
// @route   DELETE /api/orders/:id
// @access  Private
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Only allow the user who placed the order or admin to delete
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this order" });
    }

    // Only allow deleting Cancelled orders from the user side
    if (req.user.role !== "admin" && order.paymentStatus !== "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Only cancelled orders can be deleted. Cancel the order first.",
      });
    }

    await Order.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};