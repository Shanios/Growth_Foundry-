import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "gf_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminSession = {
  sub: string;
  username: string;
};

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  }
  return new TextEncoder().encode(value);
}

export async function createAdminToken(session: AdminSession) {
  return new SignJWT({ username: session.username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secret());
}

export async function verifyAdminToken(token?: string | null) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub || typeof payload.username !== "string") return null;
    const id = Number(payload.sub);

if (!Number.isInteger(id) || id <= 0) {
  return null;
}

return {
  id,
  username: payload.username,
};
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
