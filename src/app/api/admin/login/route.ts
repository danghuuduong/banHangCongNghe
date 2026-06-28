import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body ?? {};

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "0167446751";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const maxAge = 24 * 60 * 60; // 24 giờ
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");

      const response = NextResponse.json(
        { message: "Đăng nhập thành công" },
        { status: 200 }
      );
      response.cookies.set("adminToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: maxAge,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { message: "Tên tài khoản hoặc mật khẩu không đúng" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
