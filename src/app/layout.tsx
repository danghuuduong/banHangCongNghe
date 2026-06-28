import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactButtons from "@/components/ContactButtons";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechGold - Thu Mua & Bán Đồ Công Nghệ Chính Hãng Giá Cao",
  description: "Cửa hàng TechGold chuyên thu mua, trao đổi và bán các thiết bị công nghệ Laptop, PC, Điện thoại di động, Tai nghe cũ/mới chính hãng với giá tốt nhất thị trường, bảo hành lâu dài.",
  keywords: "thu mua laptop cu, ban laptop cu, thu mua dien thoai, pc gaming gia re, tai nghe airpods, techgold",
  openGraph: {
    title: "TechGold - Thu Mua & Bán Đồ Công Nghệ Chính Hãng Giá Cao",
    description: "Cửa hàng TechGold chuyên thu mua, trao đổi và bán các thiết bị công nghệ Laptop, PC, Điện thoại di động, Tai nghe cũ/mới chính hãng với giá tốt nhất thị trường, bảo hành lâu dài.",
    url: "https://techgold.vn",
    siteName: "TechGold",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-grow pt-[100px]">{children}</main>
          <Footer />
          <ContactButtons />
        </CartProvider>
      </body>
    </html>
  );
}

