"use client";
import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Star, Package } from "lucide-react";
import { Product } from "@/data/products";

interface Props {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function AdminProductCard({ product, onEdit, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fmt = (v: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

  return (
    <div className="bg-[#0C0C0F] border border-white/8 rounded-2xl overflow-hidden group hover:border-gold/40 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#121216] overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <Package size={40} />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${product.isNewProduct ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}>
            {product.isNewProduct ? "Mới" : "Cũ"}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${product.inStock ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
            {product.inStock ? "Còn hàng" : "Hết hàng"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{product.condition}</p>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-2">{product.name}</h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-gold font-bold text-base">{fmt(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-xs line-through">{fmt(product.originalPrice)}</span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[#121216] rounded-lg px-2 py-1.5 text-center">
            <p className="text-[10px] text-gray-500 mb-0.5">Còn trong kho</p>
            <p className={`text-sm font-bold ${(product.soluongConTrongKho ?? 0) > 0 ? "text-green-400" : "text-red-400"}`}>
              {product.soluongConTrongKho ?? 0}
            </p>
          </div>
          <div className="bg-[#121216] rounded-lg px-2 py-1.5 text-center">
            <p className="text-[10px] text-gray-500 mb-0.5">Đã bán</p>
            <p className="text-sm font-bold text-white">{product.soluongdaban ?? 0}</p>
          </div>
        </div>

        {/* Rating & warranty */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-gold fill-gold" />
            {product.saodanhgia ?? "—"}
          </span>
          <span>BH {product.warrantyMonths} tháng</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 hover:border-gold/50 rounded-lg text-xs font-medium transition-colors"
          >
            <Pencil size={12} />
            Sửa
          </button>
          {confirmDelete ? (
            <div className="flex gap-1 flex-1">
              <button
                onClick={() => onDelete(product.id)}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-2 py-2 bg-white/5 text-gray-400 rounded-lg text-xs transition-colors"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/50 rounded-lg text-xs font-medium transition-colors"
            >
              <Trash2 size={12} />
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
