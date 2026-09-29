import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    category: { type: String, default: "General" },
    images: [
      {
        url: String,
        publicId: String,
        alt: String,
      },
    ],
    internalPrice: { type: Number, default: null },
    showPublicPrice: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    inventoryNote: { type: String, default: "" },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
