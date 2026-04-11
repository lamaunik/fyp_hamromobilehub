import Product from "../models/Product.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate({
      path: "vendor",
      match: { isApproved: true, isDeactivated: false },
      select: "name email storeName profilePicture"
    });
    // Filter out products where vendor doesn't match criteria (match fails = vendor is null)
    const visibleProducts = products.filter(p => p.vendor);
    res.json({ success: true, count: visibleProducts.length, data: visibleProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch products for logged-in vendor
// @route   GET /api/products/vendor/myproducts
// @access  Private/Vendor
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "vendor",
      match: { isApproved: true, isDeactivated: false },
      select: "name email storeName profilePicture"
    });
    if (!product || !product.vendor) {
      return res.status(404).json({ success: false, message: "Product not found or vendor not active" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Vendor or Admin
export const createProduct = async (req, res) => {
  try {
    const { name, brand, description, price, discountPrice, category, stock, images } = req.body;

    const product = new Product({
      name,
      brand,
      description,
      price,
      discountPrice,
      category,
      stock,
      images: images || [],
      vendor: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Vendor or Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, brand, description, price, discountPrice, category, stock, images } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check ownership if vendor
    if (req.user.role === "vendor" && product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this product" });
    }

    product.name = name || product.name;
    product.brand = brand !== undefined ? brand : product.brand;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.images = images || product.images;

    const updatedProduct = await product.save();
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Vendor or Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check ownership if vendor
    if (req.user.role === "vendor" && product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this product" });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};