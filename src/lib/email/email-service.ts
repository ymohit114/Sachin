export interface EmailNotificationPayload {
  to?: string;
  subject: string;
  enquiryId: string;
  senderName: string;
  category: string;
}

export async function sendEnquiryNotification(
  payload: EmailNotificationPayload
): Promise<{ success: boolean; provider: string; message?: string }> {
  const provider = process.env.EMAIL_PROVIDER || "none";
  const recipient = payload.to || process.env.NOTIFICATION_EMAIL_TO;

  if (provider === "none" || !recipient) {
    // In dev / unconfigured mode: Log safely without sensitive case data
    console.info(
      `[EmailService:Simulated] New enquiry received (ID: ${payload.enquiryId}, Category: ${payload.category}, Sender: ${payload.senderName}). Notification skipped because EMAIL_PROVIDER is set to none or recipient is unconfigured.`
    );
    return {
      success: true,
      provider: "none",
      message: "Notification skipped: email provider not active",
    };
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[EmailService:Resend] RESEND_API_KEY missing; notification skipped.");
      return { success: false, provider: "resend", message: "Missing API key" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Advocate Chamber <notifications@advocatechamber.local>",
          to: recipient,
          subject: `[Chamber Notice] New Consultation Enquiry: ${payload.category}`,
          text: `A new consultation enquiry has been submitted on the website.\n\nEnquiry ID: ${payload.enquiryId}\nName: ${payload.senderName}\nCategory: ${payload.category}\n\nPlease log in to the protected admin dashboard to review: /admin/enquiries\n\n(Confidential case details are not transmitted over unencrypted email.)`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[EmailService:Resend Error]: ${errorText}`);
        return { success: false, provider: "resend", message: errorText };
      }

      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("[EmailService:Resend Error]", err);
      return { success: false, provider: "resend", message: String(err) };
    }
  }

  return { success: false, provider, message: "Unsupported provider" };
}
