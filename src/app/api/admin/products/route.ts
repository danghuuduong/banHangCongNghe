import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// GET all products
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ message: "Lỗi server", error: error.message }, { status: 500 });
  }
}

// POST - create new product
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await req.json();

    const newProduct = await Product.create({
      ...body,
      id: crypto.randomUUID(),
      createdAt: body.createdAt || new Date().toISOString(),
      inStock: (body.soluongConTrongKho ?? 0) > 0,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (e: any) {
    console.error("POST Product Error:", e);
    return NextResponse.json({ message: "Lỗi server", error: e.message }, { status: 500 });
  }
}


