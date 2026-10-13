import React from "react";
import { getSiteSettings } from "@/lib/db/repositories/settings";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { MapPin, Mail, Clock, Phone, Building, Scale, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Office & Contact Details",
  description:
    "Verified chamber office and contact information for Advocate Vipin Kumar in Gurugram and Sohna, Haryana.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const profile = settings.profile;
  const isEnquiryEnabled = settings.featureFlags.enablePublicEnquiries;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Chamber Communications
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          Office &amp; Contact Details
        </h1>
        <p className="text-sm text-text-secondary max-w-3xl leading-relaxed">
          The following details represent verified administrative channels for Advocate Vipin Kumar.
          Consultations in chamber are strictly conducted by prior appointment during non-court hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Chamber Details */}
          <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2 text-navy font-serif font-bold text-base">
                <Scale className="w-5 h-5 text-gold-dark" />
                <span>Court Complex Chamber</span>
              </div>
              <VerifiedBadge isVerified={profile.chamberAddress?.isVerified ?? false} />
            </div>

            <div className="text-xs text-text-secondary space-y-1 leading-relaxed">
              <p className="font-semibold text-navy">{profile.chamberAddress?.courtComplex}</p>
              <p>{profile.chamberAddress?.chamberNumber}</p>
              <p>{profile.chamberAddress?.city}, Haryana</p>
            </div>
          </div>

          {/* Office Address */}
          <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2 text-navy font-serif font-bold text-base">
                <Building className="w-5 h-5 text-gold-dark" />
                <span>Office Location</span>
              </div>
              <VerifiedBadge isVerified={profile.officeAddress.isVerified} />
            </div>

            <div className="text-xs text-text-secondary space-y-1 leading-relaxed">
              <p className="font-semibold text-navy">{profile.officeAddress.line1}</p>
              {profile.officeAddress.line2 && <p>{profile.officeAddress.line2}</p>}
              <p>
                {profile.officeAddress.city}, {profile.officeAddress.state} {profile.officeAddress.pincode}
              </p>
            </div>
          </div>

          {/* Telecommunication & Hours */}
          <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2 text-navy font-serif font-bold text-base">
                <Clock className="w-5 h-5 text-gold-dark" />
                <span>Hours &amp; Administrative Channels</span>
              </div>
              <VerifiedBadge isVerified={profile.contact.isPhoneVerified} />
            </div>

            <div className="space-y-3 text-xs text-text-secondary">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-navy block">Consultation Schedule</span>
                  <span>{profile.contact.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-navy block">Official Email</span>
                  <span className="font-mono">{profile.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-navy block">Chamber Telephone</span>
                  <span className="font-mono">{profile.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent Deadlines Caution */}
          <div className="p-4 bg-ivory rounded border border-border-subtle text-xs text-text-secondary space-y-1.5">
            <div className="flex items-center gap-2 text-navy font-bold">
              <AlertCircle className="w-4 h-4 text-gold-dark" />
              <span>Court Deadlines &amp; Limitation Period</span>
            </div>
            <p className="leading-relaxed">
              Legal matters involving court appearance dates, statutory limitation periods, or urgent bail hearings
              require immediate physical filing. Electronic communications must not be relied upon for critical dates.
            </p>
          </div>
        </div>

        {/* Right Column: Consultation Form (gated by compliance flag) */}
        <div className="lg:col-span-7">
          <EnquiryForm isFormEnabled={isEnquiryEnabled} />
        </div>
      </div>
    </div>
  );
}
