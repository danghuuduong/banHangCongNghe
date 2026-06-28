"use client";
import { useState, useRef } from "react";
import { X, Upload, Plus } from "lucide-react";
import { Product, CATEGORIES } from "@/data/products";

type ProductFormData = Omit<Product, "id" | "inStock"> & { id?: string };

interface Props {
  initial?: Partial<Product>;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const CONDITIONS = ["Mới 100% - Nguyên Seal", "Mới 99%", "Đã qua sử dụng - Đẹp 99%", "Đã qua sử dụng - 98%", "Đã qua sử dụng - Đẹp 95%", "Đã qua sử dụng - 90%"];

export default function ProductForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    categoryId: initial?.categoryId ?? CATEGORIES[0].id,
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    originalPrice: initial?.originalPrice ?? 0,
    condition: initial?.condition ?? CONDITIONS[0],
    warrantyMonths: initial?.warrantyMonths ?? 6,
    images: initial?.images ?? [] as string[],
    isNewProduct: initial?.isNewProduct ?? true,
    createdAt: initial?.createdAt ?? new Date().toISOString().slice(0, 16),
    soluongdaban: initial?.soluongdaban ?? 15,
    soluongConTrongKho: initial?.soluongConTrongKho ?? 1,
    saodanhgia: initial?.saodanhgia ?? 4.7,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initial?.images ?? []);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach(f => fd.append("file", f));
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.urls) {
      setForm(f => ({ ...f, images: [...f.images, ...data.urls] }));
      setImagePreviews(p => [...p, ...data.urls]);
    }
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
    setImagePreviews(p => p.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), warrantyMonths: Number(form.warrantyMonths), soluongdaban: Number(form.soluongdaban), soluongConTrongKho: Number(form.soluongConTrongKho), saodanhgia: Number(form.saodanhgia) });
    setSaving(false);
  };

  const inp = "w-full px-3 py-2 bg-[#121216] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors";
  const lbl = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Tên sản phẩm <span className="text-red-400">*</span></label>
          <input required type="text" value={form.name} onChange={e => set("name", e.target.value)} className={inp} placeholder="Nhập tên sản phẩm" />
        </div>
        <div>
          <label className={lbl}>Slug (tùy chọn)</label>
          <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} className={inp} placeholder="ten-san-pham" />
        </div>
      </div>

      {/* Category & Condition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Danh mục</label>
          <select value={form.categoryId} onChange={e => set("categoryId", e.target.value)} className={inp}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Tình trạng</label>
          <select value={form.condition} onChange={e => set("condition", e.target.value)} className={inp}>
            {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Giá bán (VNĐ) <span className="text-red-400">*</span></label>
          <input required type="number" min={0} value={form.price} onChange={e => set("price", e.target.value)} className={inp} />
        </div>
        <div>
          <label className={lbl}>Giá gốc (VNĐ)</label>
          <input type="number" min={0} value={form.originalPrice} onChange={e => set("originalPrice", e.target.value)} className={inp} />
        </div>
      </div>

      {/* Warranty & Loại */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={lbl}>Bảo hành (tháng)</label>
          <input type="number" min={0} value={form.warrantyMonths} onChange={e => set("warrantyMonths", e.target.value)} className={inp} />
        </div>
        <div>
          <label className={lbl}>Loại sản phẩm</label>
          <select value={form.isNewProduct ? "new" : "old"} onChange={e => set("isNewProduct", e.target.value === "new")} className={inp}>
            <option value="new">Hàng Mới</option>
            <option value="old">Hàng Cũ</option>
          </select>
        </div>
        <div>
          <label className={lbl}>Sao đánh giá (mặc định 4.7)</label>
          <input type="number" step="0.1" min={1} max={5} value={form.saodanhgia} onChange={e => set("saodanhgia", e.target.value)} className={inp} />
        </div>
      </div>

      {/* Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Số lượng còn trong kho</label>
          <input type="number" min={0} value={form.soluongConTrongKho} onChange={e => set("soluongConTrongKho", e.target.value)} className={inp} />
        </div>
        <div>
          <label className={lbl}>Số lượng đã bán (mặc định 15)</label>
          <input type="number" min={0} value={form.soluongdaban} onChange={e => set("soluongdaban", e.target.value)} className={inp} />
        </div>
      </div>

      {/* Date */}
      <div>
        <label className={lbl}>Ngày tạo</label>
        <input type="datetime-local" value={form.createdAt?.toString().slice(0, 16)} onChange={e => set("createdAt", e.target.value)} className={inp} />
      </div>

      {/* Description */}
      <div>
        <label className={lbl}>Mô tả (tùy chọn)</label>
        <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} className={inp + " resize-none"} placeholder="Mô tả sản phẩm..." />
      </div>

      {/* Images */}
      <div>
        <label className={lbl}>Hình ảnh</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {imagePreviews.map((src, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => fileRef.current?.click()} className="w-20 h-20 rounded-lg border-2 border-dashed border-white/20 hover:border-gold flex flex-col items-center justify-center text-gray-500 hover:text-gold transition-colors">
            {uploading ? <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" /> : <><Upload size={16} /><span className="text-xs mt-1">Tải lên</span></>}
          </button>
        </div>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/5 transition-colors text-sm">
          Hủy
        </button>
        <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-gold hover:bg-[#C4A030] text-black font-bold rounded-lg transition-colors text-sm disabled:opacity-50">
          {saving ? "Đang lưu..." : (initial?.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm")}
        </button>
      </div>
    </form>
  );
}
