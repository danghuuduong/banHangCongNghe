import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Đăng xuất thành công" });
  response.cookies.set("adminToken", "", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return response;
}
