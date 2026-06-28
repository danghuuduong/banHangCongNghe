import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "products-data.json");

function readProducts() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeProducts(products: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// PUT - update product
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const products = readProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });

  products[idx] = {
    ...products[idx],
    ...body,
    id,
    inStock: (body.soluongConTrongKho ?? products[idx].soluongConTrongKho ?? 0) > 0,
  };
  writeProducts(products);
  return NextResponse.json(products[idx]);
}

// DELETE - remove product
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const products = readProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  writeProducts(filtered);
  return NextResponse.json({ message: "Đã xóa sản phẩm" });
}
