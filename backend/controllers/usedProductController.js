import UsedProduct from "../models/UsedProduct.js";

// @desc  Get all available used products
// @route GET /api/used-products
// @access Public
export const getUsedProducts = async (req, res) => {
  try {
    const products = await UsedProduct.find({ status: "available" })
      .populate({
        path: "seller",
        match: { isDeactivated: false, isApproved: true },
        select: "name email phone"
      })
      .sort({ createdAt: -1 });
    
    // Filter out products where seller doesn't match criteria
    const visibleProducts = products.filter(p => p.seller);
    res.json({ success: true, count: visibleProducts.length, data: visibleProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get used products listed by the logged-in user
// @route GET /api/used-products/mine
// @access Private
export const getMyUsedProducts = async (req, res) => {
  try {
    const products = await UsedProduct.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single used product
// @route GET /api/used-products/:id
// @access Public
export const getUsedProductById = async (req, res) => {
  try {
    const product = await UsedProduct.findById(req.params.id).populate({
      path: "seller",
      match: { isDeactivated: false, isApproved: true },
      select: "name email phone"
    });
    if (!product || !product.seller) {
      return res.status(404).json({ success: false, message: "Product not found or seller not active" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create a used product listing
// @route POST /api/used-products
// @access Private
export const createUsedProduct = async (req, res) => {
  try {
    const { title, description, price, category, condition, images, location, contactPhone } = req.body;
    const product = await UsedProduct.create({
      seller: req.user._id,
      title, description, price, category, condition,
      images: images || [],
      location: location || "",
      contactPhone: contactPhone || "",
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete a used product listing
// @route DELETE /api/used-products/:id
// @access Private
export const deleteUsedProduct = async (req, res) => {
  try {
    const product = await UsedProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.seller.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not authorized" });
    await UsedProduct.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "Listing removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Mark a used product as sold
// @route PUT /api/used-products/:id/sold
// @access Private
export const markAsSold = async (req, res) => {
  try {
    const product = await UsedProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.seller.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not authorized" });
    product.status = "sold";
    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update image on an existing used product listing
// @route PUT /api/used-products/:id/image
// @access Private
export const updateUsedProductImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const product = await UsedProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.seller.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not authorized" });
    product.images = imageUrl ? [imageUrl] : product.images;
    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};