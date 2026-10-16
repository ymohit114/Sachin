import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/db/repositories/settings";
import { DEFAULT_PRACTICE_AREAS } from "@/lib/constants/site-defaults";
import { getPublishedArticles } from "@/lib/db/repositories/articles";
import { VerifiedBadge } from "@/components/common/VerifiedBadge";
import { Card } from "@/components/ui/Card";
import { ArrowRight, BookOpen, Scale, FileText, MapPin, Building, GraduationCap } from "lucide-react";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const profile = settings.profile;
  const articles = await getPublishedArticles();
  const recentArticles = articles.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section / Introduction */}
      <section className="bg-navy text-ivory py-16 sm:py-24 border-b border-border-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Factual Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-1 bg-navy-light text-gold text-xs font-semibold uppercase tracking-wider rounded border border-navy-light">
                  Distt Court Gurugram &bull; Sub-Divisional Court Sohna
                </span>
                <VerifiedBadge isVerified={profile.isFullNameVerified} />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory leading-tight">
                Chamber of Advocate Vipin Khatana
              </h1>

              <p className="text-base sm:text-lg text-ivory/80 leading-relaxed font-normal max-w-2xl">
                Independent legal practice offering professional representation in civil litigation, property disputes,
                revenue matters, and criminal defense before the District &amp; Sessions Courts in Gurugram, the
                Sub-Divisional Courts in Sohna, Haryana, and judicial forums across the Delhi NCR region.
              </p>

              {/* Verified Enrolment Strip */}
              <div className="p-4 bg-navy-900/80 rounded border border-navy-light space-y-2 text-xs text-ivory/90">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-text-muted">Bar Council Enrolment Status:</span>
                  <VerifiedBadge isVerified={profile.isEnrolmentVerified} />
                </div>
                <p className="font-mono text-gold-light">
                  {profile.enrolmentNumber}
                </p>
                <p className="text-[11px] text-text-muted">
                  {profile.stateBarCouncil}
                </p>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/practice-areas"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm rounded shadow-sm transition-colors"
                >
                  <span>View Practice Areas</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-navy-light text-ivory border border-border-dark text-sm font-medium rounded transition-colors"
                >
                  <span>Professional Credentials</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Advocate Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-lg overflow-hidden border-2 border-border-dark bg-navy-900 shadow-2xl">
                <Image
                  src="/images/vipin-kumar.jpg"
                  alt="Formal portrait of Advocate Vipin Khatana"
                  width={768}
                  height={1024}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="p-4 bg-navy-900 border-t border-navy-light text-center">
                  <p className="text-xs font-serif font-bold text-ivory tracking-wide">
                    {profile.fullName}
                  </p>
                  <p className="text-[11px] text-gold font-medium mt-0.5">
                    {profile.designation} &bull; Bar Council of India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Information & Credentials Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-subtle pb-4 mb-8">
          <h2 className="font-serif text-2xl font-bold text-navy flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-gold-dark" />
            <span>Professional Information &amp; Qualifications</span>
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Factual record of academic degrees, statutory enrolment, and permitted Bar Association affiliations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Statutory Enrolment */}
          <Card variant="ivory" className="space-y-3">
            <div className="flex items-center justify-between">
              <Scale className="w-5 h-5 text-navy" />
              <VerifiedBadge isVerified={profile.isEnrolmentVerified} />
            </div>
            <h3 className="font-serif text-base font-bold text-navy">Statutory Enrolment</h3>
            <p className="text-xs text-text-secondary">Enrolment Number:</p>
            <p className="font-mono text-sm font-semibold text-navy">{profile.enrolmentNumber}</p>
            <p className="text-xs text-text-muted">{profile.stateBarCouncil}</p>
          </Card>

          {/* Card 2: Academic Qualifications */}
          <Card variant="ivory" className="space-y-3">
            <div className="flex items-center justify-between">
              <GraduationCap className="w-5 h-5 text-navy" />
              <VerifiedBadge isVerified={profile.qualifications[0]?.isVerified ?? false} />
            </div>
            <h3 className="font-serif text-base font-bold text-navy">Academic Degrees</h3>
            <ul className="space-y-2 text-xs text-text-secondary">
              {profile.qualifications.map((q, idx) => (
                <li key={idx} className="border-b border-border-subtle/60 pb-1 last:border-none">
                  <span className="font-semibold text-navy block">{q.degree}</span>
                  <span className="text-text-muted">{q.institution} ({q.year})</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Card 3: Permitted Bar Associations */}
          <Card variant="ivory" className="space-y-3">
            <div className="flex items-center justify-between">
              <Building className="w-5 h-5 text-navy" />
              <VerifiedBadge isVerified={profile.barAssociations[0]?.isVerified ?? false} />
            </div>
            <h3 className="font-serif text-base font-bold text-navy">Bar Associations</h3>
            <ul className="space-y-2 text-xs text-text-secondary">
              {profile.barAssociations.map((ba, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0"></span>
                  <span>{ba.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="bg-white py-16 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
                Litigation &amp; Advisory
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-1">
                Areas of Legal Practice
              </h2>
            </div>
            <Link
              href="/practice-areas"
              className="text-xs font-semibold text-navy hover:text-gold-dark flex items-center gap-1.5"
            >
              <span>Explore all practice overviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_PRACTICE_AREAS.map((area) => (
              <Card key={area.slug} variant="default" className="flex flex-col justify-between space-y-4 hover:border-navy transition-colors">
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider">
                    {area.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-navy">
                    {area.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle">
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold-dark"
                  >
                    <span>Procedural Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Forum-Specific Practice Matters (Sohna & Gurugram Real Matters) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-subtle pb-4 mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-dark font-semibold">
            <Building className="w-4 h-4 text-gold-dark" />
            <span>Regular Court Practice &amp; Forums</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-1">
            Judicial Forums &amp; Representative Matters
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Factual breakdown of statutory forums and litigation categories handled by Advocate Vipin Khatana across Sohna and Gurugram courts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Sub-Divisional Courts, Sohna */}
          <Card variant="ivory" className="space-y-4">
            <div className="border-b border-border-subtle pb-3">
              <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider block">
                Chamber No. 22 Ground Floor
              </span>
              <h3 className="font-serif text-lg font-bold text-navy mt-0.5">
                Sub-Divisional Courts, Sohna
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Civil &amp; Criminal Courts, Tehsil Sohna
              </p>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Agricultural land partition suits (Taqseem) under Punjab Land Revenue Act</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Sanctioned and disputed mutation (Inteqal) appeals before Revenue Officers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Title declaration, boundary demarcation (Nishandehi), and injunction suits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Magisterial criminal trials and regular bail applications</span>
              </li>
            </ul>
          </Card>

          {/* Card 2: District & Sessions Courts, Gurugram */}
          <Card variant="ivory" className="space-y-4">
            <div className="border-b border-border-subtle pb-3">
              <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider block">
                Seat in Hall No. 8
              </span>
              <h3 className="font-serif text-lg font-bold text-navy mt-0.5">
                District Courts, Gurugram
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Sessions Court, Commercial Court &amp; Civil Courts
              </p>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Anticipatory bail (Sec 482 BNSS / 438 CrPC) and Sessions bail petitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Commercial suits and Section 138 Negotiable Instruments Act complaints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Motor Accident Claims Tribunal (MACT) compensation petitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Execution petitions under Order XXI CPC and civil first appeals</span>
              </li>
            </ul>
          </Card>

          {/* Card 3: Regulatory & Revenue Tribunals */}
          <Card variant="ivory" className="space-y-4">
            <div className="border-b border-border-subtle pb-3">
              <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider block">
                Designated Tribunals
              </span>
              <h3 className="font-serif text-lg font-bold text-navy mt-0.5">
                HARERA &amp; Revenue Forums
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Haryana RERA &amp; SDM / Collector Courts
              </p>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>HARERA Gurugram complaints for delayed possession and statutory interest</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Section 40 RERA recovery certificate execution before District Collector</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Revenue appeals before Sub-Divisional Magistrate (SDM) Sohna</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                <span>Revision petitions before Divisional Commissioner &amp; Financial Commissioner</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Legal Information / Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
              Legal Education &amp; Commentary
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-1">
              Reviewed Legal Articles
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              General informational articles on recent legal amendments and judicial precedents. Not legal advice.
            </p>
          </div>
          <Link
            href="/legal-articles"
            className="text-xs font-semibold text-navy hover:text-gold-dark flex items-center gap-1.5"
          >
            <span>Browse all articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentArticles.map((art) => (
            <Card key={art.id} variant="default" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{art.readingTimeMinutes} min read</span>
                  <span>&bull;</span>
                  <span>{new Date(art.publishedAt || art.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-navy hover:text-gold-dark transition-colors">
                  <Link href={`/legal-articles/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
                <span className="text-text-muted">Author: {art.author}</span>
                <Link
                  href={`/legal-articles/${art.slug}`}
                  className="font-semibold text-navy hover:text-gold-dark inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Verified Contact & Chamber Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy text-ivory rounded-lg p-8 sm:p-12 border border-border-dark space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              Chamber Schedule &amp; Consultations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
              Chamber Office &amp; Appearance Details
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 max-w-2xl leading-relaxed">
              In accordance with professional etiquette, meetings and consultations are strictly by prior appointment.
              Personal visits without scheduled time cannot be entertained during active court hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-navy-light/60 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">Chamber Address</span>
              </div>
              <p className="text-ivory/90 leading-relaxed">
                {profile.chamberAddress?.courtComplex}
                <br />
                {profile.chamberAddress?.chamberNumber}
                <br />
                {profile.chamberAddress?.city}, Haryana
              </p>
              <VerifiedBadge isVerified={profile.chamberAddress?.isVerified ?? false} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold">
                <Building className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">Office Location</span>
              </div>
              <p className="text-ivory/90 leading-relaxed">
                {profile.officeAddress.line1}
                <br />
                {profile.officeAddress.line2}
                <br />
                {profile.officeAddress.city}, {profile.officeAddress.state} {profile.officeAddress.pincode}
              </p>
              <VerifiedBadge isVerified={profile.officeAddress.isVerified} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold">
                <FileText className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">Hours &amp; Inquiries</span>
              </div>
              <p className="text-ivory/90 leading-relaxed">
                {profile.contact.hours}
                <br />
                Official Email: {profile.contact.email}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-4 py-2 bg-gold hover:bg-gold-light text-navy font-semibold text-xs rounded transition-colors"
                >
                  Contact &amp; Enquiry Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
