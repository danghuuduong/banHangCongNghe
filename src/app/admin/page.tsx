"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, LogOut, Search, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Product, CATEGORIES } from "@/data/products";
import ProductForm from "@/components/Admin/ProductForm";
import AdminProductCard from "@/components/Admin/AdminProductCard";

type Modal = { type: "add" } | { type: "edit"; product: Product } | null;

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "delete" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "delete" = "success") => {
    setToast(null);
    setTimeout(() => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3500);
    }, 10);
  };

  // Auth check
  useEffect(() => {
    fetch("/api/admin/me").then(res => {
      if (!res.ok) router.replace("/admin/login");
      else setChecking(false);
    });
  }, [router]);

  // Load products
  const loadProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const data = await res.json();
      // Merge with static products if JSON file is empty
      setProducts(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checking) loadProducts();
  }, [checking, loadProducts]);

  // Add product
  const handleAdd = async (data: any) => {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts(p => [newProduct, ...p]);
      setModal(null);
      showToast("Thêm sản phẩm thành công!");
    } else {
      showToast("Lỗi thêm sản phẩm", "error");
    }
  };

  // Edit product
  const handleEdit = async (data: any) => {
    if (modal?.type !== "edit") return;
    const res = await fetch(`/api/admin/products/${modal.product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts(p => p.map(x => x.id === updated.id ? updated : x));
      setModal(null);
      showToast("Cập nhật sản phẩm thành công!");
    } else {
      showToast("Lỗi cập nhật sản phẩm", "error");
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(p => p.filter(x => x.id !== id));
      showToast("Đã xóa sản phẩm!", "delete");
    } else {
      showToast("Lỗi xóa sản phẩm", "error");
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  // Filtered products
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  const inStock = products.filter(p => p.inStock).length;
  const outStock = products.filter(p => !p.inStock).length;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08080B]">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080B] text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#08080B]/95 backdrop-blur border-b border-white/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              TECH<span className="text-gold">GOLD</span>
              <span className="text-base font-normal text-gray-400 ml-2">Admin</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">Quản lý sản phẩm</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal({ type: "add" })}
              className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-[#C4A030] text-black font-bold rounded-xl text-sm transition-colors"
            >
              <Plus size={16} />
              Thêm sản phẩm
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-red-400 rounded-xl text-sm transition-colors"
            >
              <LogOut size={15} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Tổng sản phẩm", value: products.length, color: "text-white" },
            { label: "Còn hàng", value: inStock, color: "text-green-400" },
            { label: "Hết hàng", value: outStock, color: "text-red-400" },
          ].map(s => (
            <div key={s.label} className="bg-[#0C0C0F] border border-white/8 rounded-2xl p-5">
              <p className="text-gray-400 text-xs mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#0C0C0F] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="px-4 py-2.5 bg-[#0C0C0F] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-gold transition-colors"
          >
            <option value="all">Tất cả danh mục</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">Không có sản phẩm nào</p>
            <button onClick={() => setModal({ type: "add" })} className="text-gold text-sm hover:underline">
              + Thêm sản phẩm mới
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(p => (
              <AdminProductCard
                key={p.id}
                product={p}
                onEdit={product => setModal({ type: "edit", product })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal - Add/Edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative w-full max-w-2xl bg-[#0C0C0F] border border-white/10 rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <h2 className="text-lg font-bold text-white">
                {modal.type === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
              </h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors">
                <X size={16} />
              </button>
            </div>
            {/* Modal Body */}
            <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">
              <ProductForm
                initial={modal.type === "edit" ? modal.product : undefined}
                onSave={modal.type === "add" ? handleAdd : handleEdit}
                onCancel={() => setModal(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast - top right */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .toast-enter { animation: slideDown 0.3s cubic-bezier(.22,1,.36,1) forwards; }
      `}</style>
      {toast && (
        <div
          key={toast.msg + toast.type}
          className={`toast-enter fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold shadow-2xl border ${
            toast.type === "success"
              ? "bg-[#0f2d1a] border-green-500/40 text-green-400"
              : toast.type === "delete"
              ? "bg-[#2d1a0f] border-orange-500/40 text-orange-400"
              : "bg-[#2d0f0f] border-red-500/40 text-red-400"
          }`}
        >
          {toast.type === "success" && <CheckCircle size={18} className="shrink-0" />}
          {toast.type === "delete"  && <Trash2      size={18} className="shrink-0" />}
          {toast.type === "error"   && <XCircle     size={18} className="shrink-0" />}
          <span>{toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
