import React from "react";
import { MessageSquare } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/compliance/bci-rules";

interface WhatsAppButtonProps {
  isEnabled: boolean;
  phoneNumber?: string;
  prefilledText?: string;
}

export function WhatsAppButton({ isEnabled, phoneNumber, prefilledText }: WhatsAppButtonProps) {
  if (!isEnabled || !phoneNumber || phoneNumber.trim() === "") {
    return null;
  }

  const defaultPrefill =
    prefilledText ||
    "Hello Advocate Vipin Kumar, I am reaching out to enquire about your chamber schedule in Gurugram / Sohna.";
  const url = formatWhatsAppUrl(phoneNumber, defaultPrefill);

  return (
    <aside aria-label="Quick Communication">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 bg-[#1B362A] text-[#E8F3EE] hover:bg-[#234536] border border-[#2F5B47] rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#2F5B47] focus:ring-offset-2 text-sm font-medium"
        aria-label="Enquire regarding chamber schedule on WhatsApp (opens in new window)"
      >
        <MessageSquare className="w-4 h-4 text-[#8AD1B0]" aria-hidden="true" />
        <span className="hidden sm:inline">Office Schedule Enquiry</span>
      </a>
    </aside>
  );
}
