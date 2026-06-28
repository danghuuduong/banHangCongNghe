"use client";

import React from 'react';
import Link from 'next/link';
import { Laptop, Cpu, Headphones, Smartphone, Tablet, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Laptop: Laptop,
  Cpu: Cpu,
  Headphones: Headphones,
  Smartphone: Smartphone,
  Tablet: Tablet,
};

export default function CategoryCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="categories" className="py-12 bg-[#08080B] relative">
      {/* Background glowing sphere */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-[10px] blur-[220px] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-gold uppercase">
            Danh Mục Nổi Bật
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Tìm Nhanh  <span className="text-gold">Đồ Công Nghệ</span>
          </h3>

        </div>

        {/* 5 Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.iconName] || Tablet;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group"
              >
                <Link
                  href={`/${category.slug}`}
                  className="relative block h-72 rounded-2xl overflow-hidden border border-card-border hover:border-gold/50 transition-all duration-500 shadow-lg bg-card-bg"
                >
                  {/* Category Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.4] group-hover:brightness-[0.3]"
                    />
                  </div>

                  {/* Glassmorphic Card content */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-t from-black via-black/30 to-transparent">
                    {/* Glowing Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-[#08080B]/60 backdrop-blur border border-white/5 flex items-center justify-center text-gold group-hover:text-[#08080B] group-hover:bg-gold transition-all duration-500 shadow-inner group-hover:shadow-gold-glow">
                      <IconComponent size={24} className="transform group-hover:rotate-6 transition-transform" />
                    </div>

                    {/* Category Label */}
                    <div className="space-y-2">
                      <h4 className="text-white font-bold text-lg tracking-wide group-hover:text-gold transition-colors duration-300">
                        {category.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-xs text-gold/70 group-hover:text-gold font-medium transition-colors">
                        Khám phá ngay
                        <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Hover Border Glow overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-gold rounded-2xl pointer-events-none shadow-[inset_0_0_15px_rgba(212,175,55,0.2)]" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
