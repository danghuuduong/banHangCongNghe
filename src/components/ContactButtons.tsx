import React from "react";

export default function ContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none">
      {/* Facebook Button */}
      <a
        href="https://www.facebook.com/huuduong1998"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-transparent text-white shadow-[0_4px_12px_rgba(24,119,242,0.4)] transition-transform duration-300 hover:scale-110"
        aria-label="Liên hệ Facebook"
      >
        {/* Pulsating Waves */}
        <span className="absolute inset-0 rounded-full bg-[#1877F2]/50 animate-sonar-1" />
        <span className="absolute inset-0 rounded-full bg-[#1877F2]/50 animate-sonar-2" />

        {/* Main Icon Container (with shaking animation) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full animate-gentle-shake-fb bg-transparent">
          <img
            src="/Hero/iconFB.png"
            alt="Facebook"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Hover Tooltip */}
        <span className="absolute right-13 sm:right-14 bg-[#1877F2]/90 border border-[#1877F2]/20 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Facebook Cửa Hàng
        </span>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0986442833"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-transparent text-white shadow-[0_4px_12px_rgba(0,104,254,0.4)] transition-transform duration-300 hover:scale-110"
        aria-label="Nhắn tin Zalo"
      >
        {/* Pulsating Waves */}
        <span className="absolute inset-0 rounded-full bg-[#0068FE]/50 animate-sonar-1" />
        <span className="absolute inset-0 rounded-full bg-[#0068FE]/50 animate-sonar-2" />

        {/* Main Icon Container (with shaking animation) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full animate-gentle-shake-zalo bg-transparent">
          <img
            src="/Hero/logoZalo.png"
            alt="Zalo"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Hover Tooltip */}
        <span className="absolute right-13 sm:right-14 bg-[#0068FE]/90 border border-[#0068FE]/20 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Chat Zalo (0986.442.833)
        </span>
      </a>
    </div>
  );
}
