import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/db/repositories/settings";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { Card } from "@/components/ui/Card";
import { Scale, GraduationCap, Building, MapPin, Mail, ShieldAlert, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Advocate Profile & Qualifications",
  description:
    "Factual professional profile, Bar Council enrolment verification (P/3245/2016), and academic credentials of Advocate Vipin Khatana, practising before District Court Gurugram and Sub-Divisional Court Sohna.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const profile = settings.profile;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Page Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            Professional Profile
          </span>
          <VerifiedBadge isVerified={profile.isFullNameVerified} />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          Advocate Profile &amp; Verified Credentials
        </h1>
        <p className="text-sm text-text-secondary max-w-3xl leading-relaxed">
          In strict accordance with the Advocates Act, 1961, and Rule 36 of the Bar Council of India Rules,
          the following factual records represent the verified academic qualifications, professional enrolments (Enrolment No. P/3245/2016),
          and permitted associations of Advocate Vipin Khatana.
        </p>
      </div>

      {/* Main Grid: Portrait and Factual Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Portrait & Verification Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-lg border border-border-subtle bg-white p-4 shadow-subtle space-y-4">
            <div className="relative rounded overflow-hidden border border-border-subtle bg-navy">
              <Image
                src="/images/vipin-kumar.jpg"
                alt="Formal portrait of Advocate Vipin Khatana"
                width={768}
                height={1024}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="space-y-2 border-t border-border-subtle pt-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-navy">{profile.fullName}</span>
                <VerifiedBadge isVerified={profile.isFullNameVerified} />
              </div>
              <p className="text-xs text-text-secondary">{profile.designation}</p>
              <p className="text-xs text-text-muted">Primary Jurisdiction: District Court Gurugram &bull; Sub-Divisional Court Sohna</p>
            </div>
          </div>

          {/* Verification Protocol Notice */}
          <Card variant="ivory" className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-navy font-bold">
              <ShieldAlert className="w-4 h-4 text-gold-dark" />
              <span>Verification Transparency Protocol</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Every detail on this platform is verified directly against statutory State Bar Council roll certificates
              prior to formal publication. Fields marked as &quot;Pending Verification&quot; reflect provisional placeholders
              awaiting document re-certification.
            </p>
          </Card>
        </div>

        {/* Right Column: Detailed Credentials */}
        <div className="lg:col-span-8 space-y-8">
          {/* Statutory Bar Council Details */}
          <section className="bg-white rounded-lg border border-border-subtle p-6 sm:p-8 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-navy" />
                <h2 className="font-serif text-xl font-bold text-navy">
                  Bar Council Enrolment
                </h2>
              </div>
              <VerifiedBadge isVerified={profile.isEnrolmentVerified} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-text-muted uppercase tracking-wider font-medium">Enrolment Number</span>
                <p className="font-mono text-sm font-semibold text-navy">{profile.enrolmentNumber}</p>
              </div>

              <div className="space-y-1">
                <span className="text-text-muted uppercase tracking-wider font-medium">State Bar Council</span>
                <p className="text-sm font-medium text-navy">{profile.stateBarCouncil}</p>
              </div>

              <div className="space-y-1">
                <span className="text-text-muted uppercase tracking-wider font-medium">Date of Enrolment</span>
                <p className="text-sm font-medium text-navy">{profile.enrolmentDate}</p>
              </div>

              <div className="space-y-1">
                <span className="text-text-muted uppercase tracking-wider font-medium">Statutory Authority</span>
                <p className="text-sm font-medium text-navy">Bar Council of India</p>
              </div>
            </div>
          </section>

          {/* Academic & Professional Qualifications */}
          <section className="bg-white rounded-lg border border-border-subtle p-6 sm:p-8 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-navy" />
                <h2 className="font-serif text-xl font-bold text-navy">
                  Academic &amp; Professional Education
                </h2>
              </div>
              <VerifiedBadge isVerified={profile.qualifications[0]?.isVerified ?? false} />
            </div>

            <div className="space-y-4">
              {profile.qualifications.map((qual, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-ivory/50 rounded border border-border-subtle/70 gap-2"
                >
                  <div>
                    <h3 className="font-serif text-sm font-bold text-navy">{qual.degree}</h3>
                    <p className="text-xs text-text-secondary">{qual.institution}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-text-muted font-mono">{qual.year}</span>
                    <VerifiedBadge isVerified={qual.isVerified} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Permitted Bar Association Memberships */}
          <section className="bg-white rounded-lg border border-border-subtle p-6 sm:p-8 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-navy" />
                <h2 className="font-serif text-xl font-bold text-navy">
                  Permitted Bar Associations
                </h2>
              </div>
              <VerifiedBadge isVerified={profile.barAssociations[0]?.isVerified ?? false} />
            </div>

            <ul className="space-y-3">
              {profile.barAssociations.map((ba, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-3 bg-ivory/30 rounded border border-border-subtle/50 text-xs"
                >
                  <span className="font-medium text-navy">{ba.name}</span>
                  <VerifiedBadge isVerified={ba.isVerified} />
                </li>
              ))}
            </ul>
          </section>

          {/* Official Chamber & Contact Details */}
          <section className="bg-navy text-ivory rounded-lg p-6 sm:p-8 space-y-6 border border-border-dark shadow-card">
            <div className="border-b border-navy-light pb-4">
              <h2 className="font-serif text-xl font-bold text-ivory">
                Chamber Office &amp; Verification Channels
              </h2>
              <p className="text-xs text-ivory/70 mt-1">
                Official physical premises for legal service filings and document service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-gold">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">Court Chamber</span>
                </div>
                <p className="text-ivory/90 leading-relaxed">
                  {profile.chamberAddress?.courtComplex}
                  <br />
                  {profile.chamberAddress?.chamberNumber}
                  <br />
                  {profile.chamberAddress?.city}, Haryana
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-gold">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider">Communications</span>
                </div>
                <p className="text-ivory/90 leading-relaxed">
                  Official Email: {profile.contact.email}
                  <br />
                  Office Hours: {profile.contact.hours}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-navy-light/60 flex justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-navy font-semibold text-xs rounded transition-colors"
              >
                <span>View Contact Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
