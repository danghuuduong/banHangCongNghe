import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PRODUCTS } from "@/data/products";

const DATA_FILE = path.join(process.cwd(), "src", "data", "products-data.json");

function readProducts() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null;
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeProducts(products: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// GET all products - fallback to static PRODUCTS if JSON not created yet
export async function GET(req: NextRequest) {
  const products = readProducts();
  if (products === null) {
    // First time: seed from static data and save
    writeProducts(PRODUCTS);
    return NextResponse.json(PRODUCTS);
  }
  return NextResponse.json(products);
}


// POST - create new product
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const products = readProducts() ?? [];
    const newProduct = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: body.createdAt || new Date().toISOString(),
      inStock: (body.soluongConTrongKho ?? 0) > 0,
    };
    products.unshift(newProduct);
    writeProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
