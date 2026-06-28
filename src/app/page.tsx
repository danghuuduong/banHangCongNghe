import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import ProductList from "@/components/ProductList";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "TechGold Store",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop",
    "@id": "https://techgold.vn/#store",
    "url": "https://techgold.vn",
    "telephone": "0987654321",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Đường Láng",
      "addressLocality": "Đống Đa",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:30",
      "closes": "21:30"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#08080B]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Slideshow */}
      <Hero />

      {/* 2. Categories Grid */}

      {/* 3. Products Showcase with Tabs & Filters */}
      <Suspense fallback={
        <div className="py-24 bg-[#08080B] text-center text-gray-400">
          Đang tải danh sách sản phẩm...
        </div>
      }>
        <ProductList />
      </Suspense>

      <CategoryCards />

    </div>
  );
}


