import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validation/auth.schema";
import { findAdminByEmail } from "@/lib/db/repositories/users";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit/limiter";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const maxRate = parseInt(process.env.RATE_LIMIT_LOGIN_MAX || "5", 10);
    const rateCheck = checkRateLimit(`login_${ip}`, maxRate, 15 * 60 * 1000);

    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password format." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check in DB
    let user = await findAdminByEmail(normalizedEmail);

    // 2. Dev mode fallback check against initial admin env if user not yet seeded in db
    if (!user) {
      const initialEmail = (process.env.INITIAL_ADMIN_EMAIL || "admin@advocatechamber.local").toLowerCase().trim();
      const initialPass = process.env.INITIAL_ADMIN_PASSWORD || "AdvocateAdmin2026!Secure";

      if (normalizedEmail === initialEmail && password === initialPass) {
        // Create session
        await createSession({
          id: "admin-initial",
          email: initialEmail,
          role: "superadmin",
        });

        return NextResponse.json({
          success: true,
          message: "Authentication successful.",
        });
      }

      // Neutral failure message (do not disclose account non-existence)
      return NextResponse.json(
        { error: "Invalid credentials provided." },
        { status: 401 }
      );
    }

    // Verify password hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials provided." },
        { status: 401 }
      );
    }

    // Set secure cookie
    await createSession({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
    });
  } catch (err) {
    console.error("[Login Error]", (err as Error).message);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
