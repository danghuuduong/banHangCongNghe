import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  price: number;
  originalPrice: number | null;
  condition: string;
  warrantyMonths: number;
  inStock: boolean;
  images: string[];
  isNewProduct: boolean;
  createdAt: string;
  soluongdaban?: number;
  saodanhgia?: number;
  soluongConTrongKho?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    categoryId: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: null },
    condition: { type: String, default: "" },
    warrantyMonths: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    isNewProduct: { type: Boolean, default: false },
    createdAt: { type: String, default: () => new Date().toISOString() },
    soluongdaban: { type: Number, default: 0 },
    saodanhgia: { type: Number, default: 5 },
    soluongConTrongKho: { type: Number, default: 0 },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
