import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/auth/guard";
import { getSiteSettings, updateSiteSettings } from "@/lib/db/repositories/settings";
import { SettingsSchema } from "@/lib/validation/settings.schema";

export async function GET() {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load settings", details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  try {
    const body = await req.json();
    const parsed = SettingsSchema.safeParse(body);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const current = await getSiteSettings();

    const updated = await updateSiteSettings({
      profile: {
        ...current.profile,
        fullName: data.fullName,
        isFullNameVerified: data.isFullNameVerified,
        designation: data.designation,
        isDesignationVerified: data.isDesignationVerified,
        enrolmentNumber: data.enrolmentNumber,
        isEnrolmentVerified: data.isEnrolmentVerified,
        enrolmentDate: data.enrolmentDate || current.profile.enrolmentDate,
        stateBarCouncil: data.stateBarCouncil,
        isBarCouncilVerified: data.isBarCouncilVerified,
        officeAddress: {
          ...current.profile.officeAddress,
          line1: data.officeLine1,
          city: data.officeCity,
          state: data.officeState,
          pincode: data.officePincode,
          isVerified: data.isOfficeVerified,
        },
        contact: {
          ...current.profile.contact,
          phone: data.phone,
          isPhoneVerified: data.isPhoneVerified,
          email: data.email,
          isEmailVerified: data.isEmailVerified,
        },
      },
      featureFlags: {
        enablePublicEnquiries: data.enablePublicEnquiries,
        enableWhatsAppChat: data.enableWhatsAppChat,
        whatsAppPhoneNumber: data.whatsAppPhoneNumber,
        whatsAppPrefilledText: data.whatsAppPrefilledText,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update settings", details: (err as Error).message },
      { status: 500 }
    );
  }
}
