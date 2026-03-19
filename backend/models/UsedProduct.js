import mongoose from "mongoose";

const usedProductSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Smartphones", "Laptops", "Tablets", "Accessories", "Wearables", "Other"],
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["Like New", "Good", "Fair", "Poor"],
    },
    images: [{ type: String }],
    location: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  { timestamps: true }
);

const UsedProduct = mongoose.model("UsedProduct", usedProductSchema);
export default UsedProduct;