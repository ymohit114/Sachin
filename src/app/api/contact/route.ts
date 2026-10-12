import { NextRequest, NextResponse } from "next/server";
import { EnquirySchema } from "@/lib/validation/enquiry.schema";
import { createEnquiry } from "@/lib/db/repositories/enquiries";
import { getSiteSettings } from "@/lib/db/repositories/settings";
import { checkRateLimit } from "@/lib/rate-limit/limiter";
import { sendEnquiryNotification } from "@/lib/email/email-service";

export async function POST(req: NextRequest) {
  try {
    // 1. Check feature flag
    const settings = await getSiteSettings();
    const isEnquiryEnabled =
      settings.featureFlags.enablePublicEnquiries ||
      process.env.ENABLE_PUBLIC_ENQUIRIES === "true";

    if (!isEnquiryEnabled) {
      return NextResponse.json(
        { error: "Public online enquiry submissions are currently inactive per compliance guidelines." },
        { status: 403 }
      );
    }

    // 2. Rate limiting check (based on IP or forwarded header)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const maxRate = parseInt(process.env.RATE_LIMIT_ENQUIRY_MAX || "3", 10);
    const rateCheck = checkRateLimit(`enquiry_${ip}`, maxRate, 15 * 60 * 1000);

    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { error: "Submission rate limit exceeded. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    // 3. Payload size check
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 50 * 1024) {
      // > 50 KB
      return NextResponse.json(
        { error: "Request payload exceeds permissible limit." },
        { status: 413 }
      );
    }

    const body = await req.json();

    // 4. Honeypot check
    if (body.website_url_hp && body.website_url_hp.trim() !== "") {
      return NextResponse.json({ error: "Spam submission rejected." }, { status: 400 });
    }

    // 5. Schema validation
    const parsed = EnquirySchema.safeParse(body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Validation failed" },
        { status: 400 }
      );
    }

    const validated = parsed.data;

    // 6. Secure Database Write
    const record = await createEnquiry({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      category: validated.category,
      message: validated.message,
      privacyNoticeVersion: settings.privacyPolicyVersion,
    });

    // 7. Optional Non-Confidential Email Notification
    await sendEnquiryNotification({
      subject: `New Consultation Enquiry: ${record.category}`,
      enquiryId: record.id,
      senderName: record.name,
      category: record.category,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry recorded for chamber scheduling review.",
        enquiryId: record.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[API Contact Error]", (err as Error).message);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again later." },
      { status: 500 }
    );
  }
}
