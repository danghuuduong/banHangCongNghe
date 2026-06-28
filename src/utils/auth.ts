import { NextApiResponse, NextApiRequest } from 'next';

/**
 * Set an HTTP‑only admin authentication cookie.
 * The token is a simple static string; in a real app you would use a signed JWT.
 */
export function setAdminCookie(res: NextApiResponse) {
  const maxAge = 24 * 60 * 60; // 24h in seconds
  const token = 'admin-authenticated';
  const encoded = encodeURIComponent(token);
  // HttpOnly, SameSite=Strict, Secure (if HTTPS)
  const cookie = `adminToken=${encoded}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict; Secure`;
  res.setHeader('Set-Cookie', cookie);
}

/** Clear admin authentication cookie (logout). */
export function clearAdminCookie(res: NextApiResponse) {
  const cookie = `adminToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure`;
  res.setHeader('Set-Cookie', cookie);
}

/** Retrieve admin token from request cookies. */
export function getAdminToken(req: NextApiRequest): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/adminToken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
