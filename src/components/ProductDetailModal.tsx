"use client";

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { X, ShoppingCart, CreditCard, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    router.push('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-5xl bg-[#0C0C0F] border border-card-border rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-[10px] bg-black/40 hover:bg-gold hover:text-[#08080B] text-gray-300 flex items-center justify-center transition-all duration-300 border border-white/5 cursor-pointer"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        {/* Left Side: Product Images */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-[#070709] border-b md:border-b-0 md:border-r border-card-border">
          <div className="space-y-4">
            <span className="text-[10px] text-gold font-bold tracking-widest uppercase block">
              Hình ảnh chi tiết
            </span>

            {/* Big Image Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-card-border bg-[#0C0C0F] shadow-lg flex items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>

            {/* Thumbnails row */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-black flex-shrink-0 ${activeImage === img ? 'border-gold shadow-lg shadow-gold/10' : 'border-card-border hover:border-gold/30'
                    }`}
                >
                  <img src={img} alt={`${product.name} detail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] bg-gold-glow text-gold font-bold tracking-wider px-2.5 py-1 rounded-md uppercase border border-gold/20">
                  {product.condition}
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <ShieldCheck size={14} className="text-gold" />
                  Bảo hành {product.warrantyMonths} tháng
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                {product.name}
              </h3>
            </div>

            {/* Price section */}
            <div className="p-4 bg-[#121216] border border-card-border rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block mb-1">Giá bán hiện tại</span>
                <span className="text-gold font-black text-2xl tracking-wide">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.originalPrice && (
                <div className="text-right">
                  <span className="text-xs text-gray-500 block mb-1">Giá gốc</span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">
                Mô tả chi tiết
              </span>
              <p className="text-gray-300 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.inStock && (
            <div className="flex items-center justify-between py-3 border-t border-card-border/50">
              <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Số lượng</span>
              <div className="flex items-center bg-[#121216] border border-card-border rounded-xl p-1">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold transition-colors font-bold text-lg rounded-lg cursor-pointer select-none"
                >
                  -
                </button>
                <span className="px-4 text-white font-bold min-w-[2.5rem] text-center select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold transition-colors font-bold text-lg rounded-lg cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-card-border/50">
            {product.inStock ? (
              <>
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-[#121216] border border-card-border hover:border-gold/50 text-white hover:text-gold font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  Thêm vào giỏ
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full px-6 py-4 bg-gradient-to-r from-gold to-gold-hover hover:from-gold-hover hover:to-gold text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-gold/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard size={18} />
                  Mua ngay
                </button>
              </>
            ) : (
              <button
                disabled
                className="w-full sm:col-span-2 px-6 py-4 bg-white/5 border border-white/5 text-gray-500 font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Hết Hàng tạm thời
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: "40vh" }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0.95, 1, 1],
              y: ["40vh", "40vh", "0vh"]
            }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{
              duration: 2.8,
              times: [0, 0.3, 1],
              ease: "easeInOut"
            }}
            className="fixed top-6 z-[60] flex items-center gap-3 bg-[#0C0C0F]/95 border border-gold/30 px-6 py-4 rounded-2xl shadow-xl shadow-gold/5 backdrop-blur-md min-w-[280px]"
            style={{ left: "50%", x: "-50%" }}
          >
            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
              <Check size={14} strokeWidth={3} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Đã thêm vào giỏ hàng!</p>
              <p className="text-xs text-gray-400">Số lượng: {quantity} {product.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
