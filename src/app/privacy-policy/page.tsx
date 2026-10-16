import React from "react";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Lock, Clock, Database, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Data Handling",
  description:
    "Data privacy policy, retention controls, and handling standards for the independent chamber website of Advocate Vipin Khatana.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Data Governance Template
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          Privacy Policy &amp; Data Handling Practices
        </h1>
        <p className="text-xs text-text-secondary">
          Effective Date: March 2026 &bull; Version: 2026-v1 &bull; Status: Under Formal Compliance Review
        </p>
      </div>

      <div className="bg-white rounded-lg border border-border-subtle p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-text-secondary leading-relaxed shadow-subtle">
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-dark" />
            <span>1. General Statement of Privacy</span>
          </h2>
          <p>
            This website is maintained by the Chamber of Advocate Vipin Khatana in Gurugram and Sohna, Haryana.
            We are committed to operating in accordance with principles of data minimisation and confidentiality.
            This policy outlines how personal details collected through optional communication channels are processed, stored, and retained.
          </p>
        </section>

        {/* Section 2: Data Collected */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
            <Database className="w-5 h-5 text-gold-dark" />
            <span>2. Categories of Information Collected</span>
          </h2>
          <p>
            We strictly limit data collection to the minimum required to address scheduling queries:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Identification Details:</strong> Name and telephone number provided by you on the enquiry form.</li>
            <li><strong>Communication Details:</strong> Email address (optional) and general matter category.</li>
            <li><strong>Technical Telemetry:</strong> Minimal server access logs (IP address, browser user-agent) retained temporarily for security, rate-limiting, and abuse prevention.</li>
          </ul>
          <p className="p-3 bg-ivory rounded border border-border-subtle font-medium text-navy text-xs">
            We do NOT collect Aadhaar numbers, PAN cards, banking credentials, biometric data, or sensitive financial information on this website.
          </p>
        </section>

        {/* Section 3: Purpose */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold-dark" />
            <span>3. Purpose of Processing</span>
          </h2>
          <p>
            Information provided voluntarily is processed exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responding to requests regarding chamber consultation availability.</li>
            <li>Detecting and mitigating denial-of-service, automated spam, or abuse attempts.</li>
            <li>Verifying compliance with Bar Council of India standards.</li>
          </ul>
          <p>
            We do not sell, rent, license, or commercialise personal information to any third-party marketing agency.
          </p>
        </section>

        {/* Section 4: Retention */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-dark" />
            <span>4. Data Retention &amp; Automated Deletion Policy</span>
          </h2>
          <p>
            Enquiry data is retained only for as long as necessary to address the initial scheduling inquiry.
            By default, enquiry submissions are marked with an automated retention expiration of <strong>90 days</strong>,
            after which they are purged from the database system or archived in accordance with administrative retention guidelines.
          </p>
        </section>

        {/* Section 5: Third-party Trackers */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-gold-dark" />
            <span>5. Trackers and Third-Party Analytics</span>
          </h2>
          <p>
            This website does not deploy invasive third-party behavioural ad pixels, social tracking widgets,
            or cross-site profiling cookies. We do not use advertising networks to retarget visitors.
          </p>
        </section>

        {/* Section 6: Indian Legal Framework */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-navy">
            6. Statutory Rights &amp; Grievance Redressal
          </h2>
          <p>
            In alignment with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable Information
            Technology Rules, users who have submitted enquiries may request deletion, review, or correction of their
            stored contact information by contacting the chamber administrator at:
          </p>
          <p className="font-mono text-xs bg-ivory p-3 rounded border border-border-subtle text-navy">
            Email: advvipinkhatana11@gmail.com (Subject: Data Privacy Redressal)
          </p>
        </section>
      </div>

      {/* Review Notice */}
      <Card variant="ivory" className="text-xs text-text-secondary space-y-2">
        <p className="font-semibold text-navy">Policy Status Notice:</p>
        <p>
          This privacy policy document serves as a compliant template and remains subject to final review and statutory alignment
          by Advocate Vipin Khatana prior to public deployment.
        </p>
      </Card>
    </div>
  );
}
