import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { AdminUserSession } from "@/types";

export async function requireAdminSession(): Promise<AdminUserSession> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function assertAdminApi(): Promise<{ authorized: true; session: AdminUserSession } | { authorized: false; response: NextResponse }> {
  const session = await getSession();
  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized access. Authentication required." },
        { status: 401 }
      ),
    };
  }
  return { authorized: true, session };
}
