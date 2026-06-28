"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import ProductFilterBar, {
  FILTER_CATEGORIES,
  FilterCategoryId,
  StockFilter,
  PriceSort,
} from './ProductFilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function ProductList() {
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const searchParamUrl = searchParams?.get('search');

  // ══════ Tab state: 'moi' (New) or 'cu' (Used) ══════
  const [activeTab, setActiveTab] = useState<'moi' | 'cu'>('cu');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ══════ Products from API ══════
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(data => { setAllProducts(Array.isArray(data) ? data : []); })
      .catch(() => setAllProducts([]))
      .finally(() => setLoadingProducts(false));
  }, []);

  // ══════ Filter states ══════
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategoryId>('all');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [priceSort, setPriceSort] = useState<PriceSort>('none');

  // Sync tab state with query params
  useEffect(() => {
    if (tabParam === 'cu') setActiveTab('cu');
    else if (tabParam === 'moi') setActiveTab('moi');
  }, [tabParam]);

  // Sync URL search param → local search query
  useEffect(() => {
    if (searchParamUrl) setSearchQuery(searchParamUrl);
  }, [searchParamUrl]);

  // ══════ Compute category counts (based on tab only) ══════
  const categoryCounts = useMemo(() => {
    const tabFiltered = allProducts.filter((p) =>
      activeTab === 'moi' ? p.isNewProduct === true : p.isNewProduct === false
    );
    const counts: Record<string, number> = {};
    FILTER_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') return;
      counts[cat.id] = tabFiltered.filter((p) => p.categoryId === cat.id).length;
    });
    return counts;
  }, [activeTab, allProducts]);

  // ══════ Filter + sort products ══════
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // 1. Tab filter (new / used)
    if (activeTab === 'moi') {
      list = list.filter((p) => p.isNewProduct === true);
    } else {
      list = list.filter((p) => p.isNewProduct === false);
    }

    // 2. Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // 3. Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.categoryId === activeCategory);
    }

    // 4. Stock filter
    if (stockFilter === 'inStock') {
      list = list.filter((p) => p.inStock);
    } else if (stockFilter === 'outOfStock') {
      list = list.filter((p) => !p.inStock);
    }

    // 5. Sort
    if (priceSort === 'lowToHigh') {
      list.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'highToLow') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // Default sort: in-stock first, then newest
      list.sort((a, b) => {
        if (a.inStock && !b.inStock) return -1;
        if (!a.inStock && b.inStock) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    return list;
  }, [activeTab, searchQuery, activeCategory, stockFilter, priceSort, allProducts]);

  return (
    <section id="products" className="py-20 bg-background  relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══ Tabs: Hàng Cũ / Hàng Mới ═══ */}
        <div className="flex flex-col md:items-center justify-between gap-6 mb-8">
          <div className="flex bg-[#121216] border border-card-border p-1.5 rounded-[10px] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('cu')}
              className={`px-6 md:py-4.5 py-2.5 rounded-[10px] text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer ${activeTab === 'cu'
                ? 'bg-gold text-white shadow-md shadow-gold/15'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <RotateCcw size={16} />
              Hàng Cũ - Qua sử dụng (99%)
            </button>
            <button
              onClick={() => setActiveTab('moi')}
              className={`px-6 md:py-4.5 py-2.5 rounded-[10px] text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer ${activeTab === 'moi'
                ? 'bg-gold text-white shadow-md shadow-gold/15'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Sparkles size={16} />
              HÀNG MỚI - CHƯA SỬ DỤNG (100%)
            </button>
          </div>
        </div>

        {/* ═══ Section title ═══ */}
        <div className="flex justify-center">
          <div className="space-y-2 mb-8">
            <div className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              {activeTab === 'moi' ? (
                <div className="flex items-center gap-3">
                  Sản Phẩm <span className="text-green-500">HÀNG MỚI </span>100%
                  <Sparkles size={28} color="#02ec0eff" />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  Sản Phẩm <span className="text-gold">HÀNG CŨ </span>99% Like New
                  <RotateCcw size={28} color="#0a7ae3" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ Filter Bar ═══ */}
        <ProductFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categoryCounts={categoryCounts}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
          priceSort={priceSort}
          onPriceSortChange={setPriceSort}
          resultCount={filteredProducts.length}
        />

        {/* ═══ Product Grid ═══ */}
        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card-bg border border-card-border animate-pulse h-72" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-card-bg border border-card-border rounded-3xl">
            <p className="text-gray-400 text-base">Không tìm thấy sản phẩm nào phù hợp.</p>
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
    </section>
  );
}
