"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-background border-t border-card-border mt-auto">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-bold text-foreground text-lg shadow-md">
                Đồ
              </span>
              <span className="text-xl font-bold tracking-wider text-foreground">
                Công nghệ <span className="text-gold">Cũ</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hệ thống thu mua và bán lẻ đồ công nghệ cũ/mới chính hãng uy tín hàng đầu. Cam kết giá tốt, chế độ bảo hành rõ ràng, hậu mãi chu đáo.
            </p>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-gold" />
              <span className="text-xs text-gray-400">Giờ mở cửa: 08:30 - 22:30 (Hàng ngày)</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-[2px] after:bg-gold">
              Thông Tin Liên Hệ
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span>318 TÔ Hiệu, Phường Láng Thượng, Quận Liên Chiểu, Đà Nẵng</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a href="tel:0987654321" className="hover:text-gold transition-colors">
                  0986442833
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a href="mailto:contact@techgold.vn" className="hover:text-gold transition-colors">
                  hotboykt07@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-[2px] after:bg-gold">
              Kết Nối Với Chúng Tôi
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Thu mua giá cao đồ công nghệ ,hoặc làm trung gian bán dùm.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/huuduong1998"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-card-border hover:border-gold flex items-center justify-center transition-all duration-300 bg-transparent overflow-hidden p-2"
                aria-label="Facebook"
              >
                <img
                  src="/Hero/iconFB.png"
                  alt="Facebook"
                  className="w-full h-full object-contain rounded-md"
                />
              </a>
              <a
                href="https://zalo.me/0986442833"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-card-border hover:border-gold flex items-center justify-center transition-all duration-300 bg-transparent overflow-hidden p-2"
                aria-label="Zalo"
              >
                <img
                  src="/Hero/logoZalo.png"
                  alt="Zalo"
                  className="w-full h-full object-contain rounded-md"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer (Copyright) */}
      <div className="bg-card-bg py-6 border-t border-card-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {currentYear} TECHGOLD Store. Thiết kế bởi Antigravity. Bảo lưu mọi quyền.
          </p>
          <div className="flex gap-6 text-gray-500 text-xs">
            <span className="hover:text-gold cursor-pointer transition-colors">Điều khoản dịch vụ</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Chính sách bảo mật</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Bản đồ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
