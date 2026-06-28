"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Search, ChevronDown, X,
  Monitor, Laptop, Headphones, Cpu, Mouse, Keyboard, Package, LayoutGrid
} from 'lucide-react';

// Danh mục bộ lọc theo yêu cầu
export const FILTER_CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: LayoutGrid },
  { id: 'monitor', name: 'Màn hình', icon: Monitor },
  { id: 'laptop', name: 'Laptop', icon: Laptop },
  { id: 'headphone', name: 'Tai nghe', icon: Headphones },
  { id: 'keyboard', name: 'Bàn phím', icon: Keyboard },
  { id: 'pc', name: 'PC', icon: Cpu },
  { id: 'mouse', name: 'Chuột', icon: Mouse },
  { id: 'other', name: 'Phụ kiện khác', icon: Package },
] as const;

export type FilterCategoryId = typeof FILTER_CATEGORIES[number]['id'];
export type StockFilter = 'all' | 'inStock' | 'outOfStock';
export type PriceSort = 'none' | 'lowToHigh' | 'highToLow';

interface ProductFilterBarProps {
  // Search
  searchQuery: string;
  onSearchChange: (value: string) => void;
  // Category
  activeCategory: FilterCategoryId;
  onCategoryChange: (id: FilterCategoryId) => void;
  categoryCounts: Record<string, number>;
  // Stock
  stockFilter: StockFilter;
  onStockFilterChange: (value: StockFilter) => void;
  // Price sort
  priceSort: PriceSort;
  onPriceSortChange: (value: PriceSort) => void;
  // Result count
  resultCount: number;
}

// --- Dropdown component ---
function FilterDropdown({
  label,
  icon,
  options,
  value,
  onChange,
  dotColor,
}: {
  label: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
  dotColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${value !== 'all' && value !== 'none'
          ? 'bg-gold/10 border-gold/30 text-gold'
          : 'bg-[#16161a] border-card-border text-gray-300 hover:border-gray-500 hover:text-white'
          }`}
      >
        {dotColor && (
          <span className="w-2 h-2 rounded-[10px]" style={{ background: dotColor }} />
        )}
        {icon}
        <span className="whitespace-nowrap">{selectedLabel}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#16161a] border border-card-border rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${value === opt.value
                ? 'bg-gold/15 text-gold font-semibold'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Main component ---
export default function ProductFilterBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categoryCounts,
  stockFilter,
  onStockFilterChange,
  priceSort,
  onPriceSortChange,
  resultCount,
}: ProductFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Active filter tags
  const activeTags: { label: string; onClear: () => void }[] = [];
  if (stockFilter !== 'all') {
    activeTags.push({
      label: stockFilter === 'inStock' ? 'Còn hàng2' : 'Hết hàng',
      onClear: () => onStockFilterChange('all'),
    });
  }
  if (priceSort !== 'none') {
    activeTags.push({
      label: priceSort === 'lowToHigh' ? 'Giá: Thấp → Cao' : 'Giá: Cao → Thấp',
      onClear: () => onPriceSortChange('none'),
    });
  }

  const hasActiveFilters = activeTags.length > 0 || searchQuery.length > 0;

  const clearAllFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onStockFilterChange('all');
    onPriceSortChange('none');
  };

  return (
    <div className="space-y-4 mb-10">
      {/* ═══ Row 1: Search + Category pills ═══ */}
      <div className="bg-[#0e0e12] border border-card-border rounded-2xl p-4 space-y-4">
        {/* Search bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu, mô tả..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#16161a] border border-card-border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => {/* search already live */ }}
            className="px-6 py-3 bg-gold hover:bg-gold-hover text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Category pills - horizontal scrollable */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {FILTER_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const count = cat.id === 'all'
                ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
                : (categoryCounts[cat.id] ?? 0);
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer border ${isActive
                    ? 'bg-gold text-white border-gold shadow-md shadow-gold/15'
                    : 'bg-[#16161a] text-gray-400 border-card-border hover:border-gray-500 hover:text-white'
                    }`}
                >
                  <Icon size={15} />
                  <span>{cat.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Row 2: Dropdown filters + result count ═══ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <FilterDropdown
            label="Tình trạng"
            dotColor={stockFilter === 'inStock' ? '#22c55e' : stockFilter === 'outOfStock' ? '#ef4444' : '#6b7280'}
            options={[
              { value: 'all', label: 'Tất cả tình trạng' },
              { value: 'inStock', label: 'Còn hàng' },
              { value: 'outOfStock', label: 'Hết hàng' },
            ]}
            value={stockFilter}
            onChange={(v) => onStockFilterChange(v as StockFilter)}
          />

          <FilterDropdown
            label="Giá"
            options={[
              { value: 'none', label: 'Tiền' },
              { value: 'lowToHigh', label: 'Giá: Thấp → Cao' },
              { value: 'highToLow', label: 'Giá: Cao → Thấp' },
            ]}
            value={priceSort}
            onChange={(v) => onPriceSortChange(v as PriceSort)}
          />

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer font-medium"
            >
              <X size={14} />
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Result count */}
        <span className="text-sm text-gray-400">
          <strong className="text-white">{resultCount}</strong> sản phẩm
        </span>
      </div>

      {/* ═══ Active filter tags ═══ */}
      {activeTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium">Đang lọc:</span>
          {activeTags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 text-gold text-xs font-medium rounded-lg"
            >
              {tag.label}
              <button
                onClick={tag.onClear}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
