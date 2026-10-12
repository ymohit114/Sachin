import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminUserSession } from "@/types";

const COOKIE_NAME = "advocate_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET || "fallback-insecure-secret-for-development-only-min-32-chars";
  return new TextEncoder().encode(secret);
}

export async function createSession(user: { id: string; email: string; role: "admin" | "superadmin" }): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + SESSION_DURATION_SECONDS;

  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(issuedAt)
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });

  return token;
}

export async function getSession(): Promise<AdminUserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: (payload.role as "admin" | "superadmin") || "admin",
      issuedAt: payload.iat as number,
      expiresAt: payload.exp as number,
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
