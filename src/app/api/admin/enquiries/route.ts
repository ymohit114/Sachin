import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/auth/guard";
import { getAllEnquiries } from "@/lib/db/repositories/enquiries";

export async function GET() {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  try {
    const enquiries = await getAllEnquiries();
    return NextResponse.json({ enquiries });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to retrieve enquiries", details: (err as Error).message },
      { status: 500 }
    );
  }
}
