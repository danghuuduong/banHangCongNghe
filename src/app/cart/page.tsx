"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';
import { ArrowLeft, Trash2, Plus, Minus, Send, Phone, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateOrderText = () => {
    let text = `🛍️ ĐƠN HÀNG MỚI TỪ TECHGOLD\n`;
    text += `------------------------------------\n`;
    text += `👤 Khách hàng: ${formData.name || 'Chưa cung cấp'}\n`;
    text += `📞 Số điện thoại: ${formData.phone || 'Chưa cung cấp'}\n`;
    text += `📍 Địa chỉ: ${formData.address || 'Chưa cung cấp'}\n`;
    if (formData.note) {
      text += `📝 Ghi chú: ${formData.note}\n`;
    }
    text += `------------------------------------\n`;
    text += `📦 CHI TIẾT SẢN PHẨM:\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name}\n`;
      text += `   - Số lượng: ${item.quantity}\n`;
      text += `   - Tình trạng: ${item.product.condition}\n`;
      text += `   - Đơn giá: ${formatPrice(item.product.price)}\n`;
    });

    text += `------------------------------------\n`;
    text += `💰 TỔNG TIỀN: ${formatPrice(totalPrice)}\n`;
    text += `------------------------------------\n`;
    text += `* Đơn hàng được tạo từ Website TechGold.`;
    return text;
  };

  const handleCheckout = (platform: 'zalo' | 'messenger') => {
    // Validate simple info
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Vui lòng điền đầy đủ thông tin: Họ tên, Số điện thoại và Địa chỉ để chúng tôi giao hàng!');
      return;
    }

    const orderText = generateOrderText();

    // Copy to clipboard
    navigator.clipboard.writeText(orderText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });

    // Default contact details
    const zaloNumber = '0987654321'; // Zalo store phone number
    const facebookPage = 'techgold.vn'; // FB Page or profile slug

    if (platform === 'zalo') {
      alert('Hệ thống đã tự động sao chép (Copy) thông tin đơn hàng vào Clipboard. Bạn sẽ được chuyển hướng tới Zalo để dán và gửi cho cửa hàng!');
      window.open(`https://zalo.me/${zaloNumber}`, '_blank');
    } else {
      alert('Hệ thống đã tự động sao chép (Copy) thông tin đơn hàng vào Clipboard. Bạn sẽ được chuyển hướng tới Messenger để dán và gửi cho cửa hàng!');
      window.open(`https://m.me/${facebookPage}`, '_blank');
    }
  };

  return (
    <div className="bg-[#08080B] min-h-screen py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold uppercase tracking-wider transition-colors group"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
            Tiếp tục mua sắm
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black mt-4 uppercase">
            Giỏ hàng của <span className="text-gold">bạn</span>
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Products List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg border border-card-border rounded-3xl p-6 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-card-border last:border-0 last:pb-0"
                  >
                    {/* Img + Title */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#0C0C0F] flex-shrink-0 border border-card-border">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base leading-snug hover:text-gold transition-colors">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-gray-400 block mt-1">Tình trạng: {item.product.condition}</span>
                        <span className="text-gold font-bold text-sm block mt-1">{formatPrice(item.product.price)}</span>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t border-card-border sm:border-0 pt-4 sm:pt-0">
                      <div className="flex items-center bg-[#08080B] border border-card-border rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-gold transition-colors cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-bold text-sm w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-gold transition-colors cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-500 hover:text-red-500 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        aria-label="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Checkout Info & Actions */}
            <div className="space-y-6">
              {/* Checkout Form */}
              <div className="bg-[#121216] border border-card-border rounded-3xl p-6 space-y-6">
                <h3 className="text-lg font-bold text-white tracking-wide border-b border-card-border/50 pb-3">
                  Thông Tin Giao Hàng
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">
                      Họ tên khách hàng *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nhập họ tên của bạn..."
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#08080B] text-white border border-card-border focus:border-gold px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Nhập số điện thoại liên hệ..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#08080B] text-white border border-card-border focus:border-gold px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">
                      Địa chỉ nhận hàng *
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Nhập địa chỉ nhà, số đường, phường, quận..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-[#08080B] text-white border border-card-border focus:border-gold px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">
                      Ghi chú thêm (nếu có)
                    </label>
                    <textarea
                      name="note"
                      rows={2}
                      placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                      value={formData.note}
                      onChange={handleInputChange}
                      className="w-full bg-[#08080B] text-white border border-card-border focus:border-gold px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>
                </div>

                {/* Subtotal & total */}
                <div className="border-t border-card-border/50 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Tổng số lượng:</span>
                    <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold text-sm">TỔNG THANH TOÁN:</span>
                    <span className="text-gold font-extrabold text-xl tracking-wide">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Submit actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleCheckout('zalo')}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold to-gold-hover hover:from-gold-hover hover:to-gold text-[#08080B] font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                  >
                    <Send size={16} />
                    Đặt Hàng qua Zalo
                  </button>
                  <button
                    onClick={() => handleCheckout('messenger')}
                    className="w-full px-6 py-4 bg-[#121216] border border-card-border hover:border-gold/50 text-white hover:text-gold font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                  >
                    <Phone size={16} />
                    Đặt Hàng qua Messenger
                  </button>

                  {/* Copied alert bar */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-green-950/50 border border-green-500/30 text-green-400 p-2.5 rounded-lg text-xs flex items-center justify-center gap-2"
                      >
                        <ClipboardCheck size={14} />
                        Đã sao chép nội dung đơn hàng vào Clipboard!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-24 bg-card-bg border border-card-border rounded-3xl max-w-2xl mx-auto space-y-6">
            <p className="text-gray-400 text-base">Giỏ hàng của bạn đang trống.</p>
            <Link
              href="/"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-gold to-gold-hover text-[#08080B] font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-gold/10 transition-all cursor-pointer"
            >
              Quay lại Trang Chủ để mua sắm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
