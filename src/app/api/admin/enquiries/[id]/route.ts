import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/auth/guard";
import { updateEnquiryStatus, deleteEnquiry } from "@/lib/db/repositories/enquiries";
import { z } from "zod";

interface Context {
  params: Promise<{ id: string }>;
}

const StatusUpdateSchema = z.object({
  status: z.enum(["new", "in_review", "resolved", "archived"]),
});

export async function PATCH(req: NextRequest, { params }: Context) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  try {
    const body = await req.json();
    const parsed = StatusUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const success = await updateEnquiryStatus(id, parsed.data.status);
    if (!success) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Status updated successfully." });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update enquiry", details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const success = await deleteEnquiry(id);
  if (!success) {
    return NextResponse.json({ error: "Enquiry not found or already deleted" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Enquiry record purged per retention policy." });
}
