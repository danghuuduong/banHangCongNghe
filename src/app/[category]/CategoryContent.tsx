"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Category, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { ArrowLeft, Sparkles, RotateCcw, Box, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryContentProps {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryContent({ category, initialProducts }: CategoryContentProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'used'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and sort products
  const getFilteredProducts = () => {
    let list = [...initialProducts];

    // Filter by tab
    if (activeFilter === 'new') {
      list = list.filter((p) => p.isNewProduct);
    } else if (activeFilter === 'used') {
      list = list.filter((p) => !p.isNewProduct);
    }

    // Sort: inStock first, then newest first
    list.sort((a, b) => {
      if (a.inStock && !b.inStock) return -1;
      if (!a.inStock && b.inStock) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  };

  const filteredProducts = getFilteredProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="bg-[#08080B] min-h-screen py-12">
      {/* Category Banner */}
      <div className="relative h-80 w-full overflow-hidden border-b border-card-border">
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080B] via-transparent to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080B] via-[#08080B]/50 to-transparent" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Breadcrumb / Back button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold uppercase tracking-wider transition-colors group"
            >
              <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
              Quay lại Trang Chủ
            </Link>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase"
            >
              <span className="text-gold">{category.name}</span>
            </motion.h1>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              Tuyển tập các dòng thiết bị {category.name} nguyên zin, chất lượng tuyển chọn từ cũ 99% đến mới 100% nguyên seal giá tốt nhất.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Navigation/Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-card-border/50 pb-6">
          <div className="flex items-center gap-2">
            <Box size={18} className="text-gold" />
            <span className="text-sm text-gray-400">
              Tổng số: <strong className="text-white">{filteredProducts.length}</strong> sản phẩm
            </span>
          </div>

          {/* Filter button list */}
          <div className="flex bg-[#121216] border border-card-border p-1 rounded-[10px]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-[10px] text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeFilter === 'all'
                ? 'bg-gold text-[#08080B]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setActiveFilter('new')}
              className={`px-5 py-2 rounded-[10px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${activeFilter === 'new'
                ? 'bg-gold text-[#08080B]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Sparkles size={12} />
              Mới 100%
            </button>
            <button
              onClick={() => setActiveFilter('used')}
              className={`px-5 py-2 rounded-[10px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${activeFilter === 'used'
                ? 'bg-gold text-[#08080B]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <RotateCcw size={12} />
              Likenew 99%
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-card-bg border border-card-border rounded-3xl">
            <p className="text-gray-400">Không tìm thấy sản phẩm nào trong mục này.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
