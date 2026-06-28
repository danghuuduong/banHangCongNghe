export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: 'laptop' | 'pc' | 'headphone' | 'phone' | 'other' | 'monitor' | 'keyboard' | 'mouse';
  description: string;
  price: number;
  originalPrice: number | null;
  condition: string;
  warrantyMonths: number;
  inStock: boolean;
  images: string[];
  isNewProduct: boolean;
  createdAt: string;
  soluongdaban?: number;
  saodanhgia?: number;
  soluongConTrongKho?: number;
}

export interface Category {
  id: 'laptop' | 'pc' | 'headphone' | 'phone' | 'other' | 'monitor' | 'keyboard' | 'mouse';
  name: string;
  slug: string;
  iconName: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'laptop',
    name: 'Laptop Cao Cấp',
    slug: 'laptop',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pc',
    name: 'Máy Tính PC - Gaming',
    slug: 'pc',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'headphone',
    name: 'Tai Nghe & Âm Thanh',
    slug: 'headphone',
    iconName: 'Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'phone',
    name: 'Điện Thoại Di Động',
    slug: 'phone',
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'other',
    name: 'Thiết Bị Khác',
    slug: 'other',
    iconName: 'Tablet',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop'
  }
];


export const PRODUCTS: Product[] = [];

