"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  // Detect scroll to make header more solid
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

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

  const navLinks = [
    { label: 'Trang Chủ', action: () => router.push('/') },
    { label: 'Hàng Cũ', action: () => router.push('/?tab=cu') },
    { label: 'Hàng Mới', action: () => router.push('/?tab=moi') },
    { label: 'Liên Hệ', action: () => scrollToSection('footer') },
  ];

  return (
    <>
      <header
        // className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        //   ? ' border-b border-card-border py-4'
        //   : 'bg-transparent py-6'
        //   }`}

        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-card-border bg-background ${isScrolled
          ? 'py-1'
          : 'py-4'
          }`}

      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <img src="/Hero/LOGO.png" alt="Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Navigation links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.action}
                  className="text-gray-300 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center space-x-4">


              {/* Cart Icon */}
              <Link
                href="/cart"
                className="text-gray-300 hover:text-gold p-2 rounded-[10px] hover:bg-white/5 transition-colors relative cursor-pointer flex items-center"
                aria-label="Giỏ hàng"
              >
                <ShoppingBag size={20} />
                {totalCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gold text-[#08080B] font-bold text-xs w-5 h-5 rounded-[10px] flex items-center justify-center shadow-lg"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-gold p-2 rounded-[10px] hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-card-border px-4 py-6 shadow-2xl"
          >
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm cần tìm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card-bg text-foreground border border-card-border focus:border-gold px-5 py-4 pr-12 rounded-xl text-base outline-none transition-all placeholder:text-gray-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold p-1 cursor-pointer"
                >
                  <Search size={22} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-40 w-4/5 max-w-sm bg-card-bg border-l border-card-border p-6 shadow-2xl md:hidden flex flex-col pt-24"
            >
              <div className="flex flex-col space-y-6">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={link.action}
                    className="text-left text-lg font-medium text-gray-200 hover:text-gold transition-colors py-2 border-b border-card-border/50 flex items-center justify-between group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} className="text-gray-600 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
              <div className="mt-auto text-center text-xs text-gray-500">
                &copy; 2026 TechGold. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
