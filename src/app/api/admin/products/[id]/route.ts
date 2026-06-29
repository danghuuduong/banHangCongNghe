import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { del } from "@vercel/blob";
import fs from "fs";
import path from "path";
import Product from "@/models/Product";

// PUT - update product
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    
    await dbConnect();
    const existing = await Product.findOne({ id });
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const oldImages = existing.images as string[] || [];

    const updatedFields = {
      ...body,
      inStock: Number(body.soluongConTrongKho ?? existing.soluongConTrongKho ?? 0) > 0,
    };

    const updatedProduct = await Product.findOneAndUpdate({ id }, updatedFields, { new: true });
     // Delete images that were removed
 const newImages = updatedProduct.images as string[] || [];
 const imagesToDelete = oldImages.filter((url) => !newImages.includes(url));
 for (const imgUrl of imagesToDelete) {
   try {
     if (process.env.BLOB_READ_WRITE_TOKEN) {
        const key = new URL(String(imgUrl)).pathname.replace(/^\//, "");
       await del(key);
     } else {
       const localPath = path.join(process.cwd(), "public", imgUrl);
       if (fs.existsSync(localPath)) {
         fs.unlinkSync(localPath);
       }
     }
   } catch (e) {
     console.error("Failed to delete removed image:", imgUrl, e);
   }
 }

 return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("PUT Product Error:", error);
    return NextResponse.json({ message: "Lỗi server", error: error.message }, { status: 500 });
  }
}

// DELETE - remove product
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    await dbConnect();
    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });

 // Delete associated images
 const images = deleted.images as string[] || [];
 for (const imgUrl of images) {
   try {
     if (process.env.BLOB_READ_WRITE_TOKEN) {
        const key = new URL(String(imgUrl)).pathname.replace(/^\//, "");
       await del(key);
     } else {
       const localPath = path.join(process.cwd(), "public", imgUrl);
       if (fs.existsSync(localPath)) {
         fs.unlinkSync(localPath);
       }
     }
   } catch (e) {
     console.error("Failed to delete image:", imgUrl, e);
   }
 }

 return NextResponse.json({ message: "Đã xóa sản phẩm" });


  } catch (error: any) {
    console.error("DELETE Product Error:", error);
    return NextResponse.json({ message: "Lỗi server", error: error.message }, { status: 500 });
  }
}

