import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const urls: string[] = [];

  const isVercelBlobConfigured = !!process.env.BLOB_READ_WRITE_TOKEN;

  if (!isVercelBlobConfigured) {
    // Local fallback: Save to public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const ext = path.extname(value.name) || ".jpg";
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        urls.push(`/uploads/${filename}`);
      }
    }
  } else {
    // Vercel Blob Cloud Storage
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const ext = path.extname(value.name) || ".jpg";
        const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
        const blob = await put(filename, value, {
          access: "public",
        });
        urls.push(blob.url);
      }
    }
  }

  return NextResponse.json({ urls });
}
