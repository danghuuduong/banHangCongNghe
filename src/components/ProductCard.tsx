"use client";

import React from 'react';
import { Product } from '@/data/products';
import { ShieldCheck, ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Format price helper
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="bg-card-bg border border-card-border hover:border-gold/30 rounded-2xl p-4 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden group shadow-lg"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Stock & Condition badges */}
      {/* <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <span className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-[10px] border ${product.inStock
          ? 'bg-gold-glow text-gold border-gold/30'
          : 'bg-white/5 text-gray-500 border-white/5'
          }`}>
          {product.inStock ? 'Còn Hàng' : 'Hết Hàng'}
        </span>
        <span className="text-[10px] text-gray-400 font-medium px-2 py-0.5 bg-white/5 rounded-md">
          {product.condition}
        </span>
      </div> */}

      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-[#0C0C0F]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info details */}
      <div className="flex-1 flex flex-col justify-between space-y-3 relative z-10">
        <div>
          {/* Warranty */}
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1.5">
            <ShieldCheck size={14} className="text-gold" />
            <span>
              Bảo hành {product.warrantyMonths} tháng</span>
          </div>


          {/* Title */}
          <h4 className="text-white font-bold text-sm line-clamp-2 leading-relaxed group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h4>
        </div>

        {/* Pricing */}
        <div className="pt-2 flex justify-between align-center">
          {product.originalPrice && (
            <span className="text-[14px] text-gray-500 line-through  mb-0.5">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-gold font-extrabold text-[14px] tracking-wide ">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Rating and sales */}
        <div className="flex items-center gap-2 text-gold text-sm mt-1">
          <Star size={16} fill="#FFD700" className="text-[#FFD700]" />
          <span>{product.saodanhgia}</span>
          <span className="ml-2 text-gray-400">{product.soluongdaban}+ đã bán</span>
        </div>


      </div>
    </motion.div>
  );
}
