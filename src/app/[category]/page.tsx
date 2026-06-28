import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES, Product } from '@/data/products';
import CategoryContent from './CategoryContent';
import dbConnect from '@/lib/db';
import ProductModel from '@/models/Product';

async function getProducts(): Promise<Product[]> {
  try {
    await dbConnect();
    const products = await ProductModel.find({}).lean();
    return JSON.parse(JSON.stringify(products)) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

interface Props {
  params: Promise<{ category: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.category);

  if (!category) {
    return {
      title: 'Không Tìm Thấy Danh Mục | TechGold',
    };
  }

  return {
    title: `${category.name} Chính Hãng - Giá Tốt Nhất | TechGold`,
    description: `Danh sách các thiết bị ${category.name} cũ và mới chính hãng tại TechGold. Cam kết chất lượng chuẩn đầu ra, chính sách bảo hành rõ ràng, 1 đổi 1.`,
    openGraph: {
      title: `${category.name} Chính Hãng - Giá Tốt Nhất | TechGold`,
      description: `Danh sách các thiết bị ${category.name} cũ và mới chính hãng tại TechGold. Cam kết chất lượng chuẩn đầu ra, chính sách bảo hành rõ ràng, 1 đổi 1.`,
    },
  };
}

// Pre-render static paths for performance
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.category);

  if (!category) {
    notFound();
  }

  const allProducts = await getProducts();
  const categoryProducts = allProducts.filter(
    (product) => product.categoryId === category.id
  );

  return (
    <CategoryContent
      category={category}
      initialProducts={categoryProducts}
    />
  );
}
