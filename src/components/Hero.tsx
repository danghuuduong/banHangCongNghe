"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// No slide data needed; using a single hero video.

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  // removed unused slide index state
  // removed unused direction state

  // Simple static title for hero
  const TITLE = "ĐỒ CÔNG NGHỆ CŨ";
  useEffect(() => {
    setIsMounted(true);
  }, []);


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-[622px] w-full overflow-hidden ">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <motion.div
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img src="/Hero/ChatGPT Image 13_06_40 28 thg 6, 2026.png" alt="Hero" className="w-full h-full object-cover object-[center_-278px]" />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-background/30 backdrop-brightness-[1.8]" />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8 ml-80 text-left">
        <div className="max-w-4xl space-y-6 md:space-y-8 text-foreground">
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2  border border-gold/30 px-4 py-1.5 rounded-[10px] text-gold 
            text-xs font-semibold uppercase tracking-wider"
          >
            <span className="w-2 h-2 bg-gold rounded-[10px] animate-ping" />
            Giao hàng- bảo hành - Chính hãng
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 130 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-5xl font-extrabold tracking-tight text-white uppercase"
          >
            <span className="block">MUA BÁN</span>
            <span className="block mt-5">ĐỒ <span className="text-gold">CÔNG NGHỆ</span> </span>
          </motion.h1>


          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-lg text-gray-300 font-light tracking-wide max-w-2xl mx-auto"
          >
            CHUYÊN - THU MUA - BÁN - TRAO ĐỔI ĐỒ CŨ
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('products')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold to-gold-hover hover:from-gold-hover hover:to-gold text-white 
              font-bold text-sm uppercase tracking-wider rounded-[10px] shadow-lg hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              MUA NGAY
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent backdrop-blur-md border border-white/20 
              hover:border-gold hover:bg-white/10 text-white hover:text-gold font-bold 
              text-sm uppercase tracking-wider rounded-[10px] transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Liên hệ ngay
            </button>
          </motion.div>
        </div>
      </div>



    </section >
  );
}
