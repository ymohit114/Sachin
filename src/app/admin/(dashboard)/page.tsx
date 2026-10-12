import React from "react";
import Link from "next/link";
import { getAllEnquiries } from "@/lib/db/repositories/enquiries";
import { getAllArticlesForAdmin } from "@/lib/db/repositories/articles";
import { getSiteSettings } from "@/lib/db/repositories/settings";
import { isPersistentStorageActive } from "@/lib/db/mongodb";
import { Card } from "@/components/ui/Card";
import {
  Inbox,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Database,
  CheckCircle,
  Clock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const enquiries = await getAllEnquiries();
  const articles = await getAllArticlesForAdmin();
  const settings = await getSiteSettings();
  const isMongoActive = isPersistentStorageActive();

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const draftArticlesCount = articles.filter((a) => a.status === "draft").length;
  const publishedArticlesCount = articles.filter((a) => a.status === "published").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Chamber Management Dashboard
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time management for consultation enquiries, legal publications, and Bar Council compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/articles/new"
            className="px-3.5 py-2 bg-navy hover:bg-navy-light text-ivory text-xs font-semibold rounded transition-colors"
          >
            Draft New Article
          </Link>
          <Link
            href="/admin/settings"
            className="px-3.5 py-2 bg-gold hover:bg-gold-light text-navy text-xs font-semibold rounded transition-colors"
          >
            Review Site Verification
          </Link>
        </div>
      </div>

      {/* Database Warning if in Memory Dev Mode */}
      {!isMongoActive && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-sm">Development In-Memory Mode Active</p>
            <p className="leading-relaxed">
              The application is operating with an in-memory repository store because a connection to MongoDB could not be established.
              Any modifications made in this session are preserved in memory during development. To enable persistent database storage,
              configure a valid <code>MONGODB_URI</code> in <code>.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <Card variant="default" className="space-y-2">
          <div className="flex items-center justify-between text-text-secondary text-xs">
            <span>New Enquiries</span>
            <Inbox className="w-4 h-4 text-navy" />
          </div>
          <div className="text-2xl font-bold text-navy font-serif">{newEnquiriesCount}</div>
          <p className="text-[11px] text-text-muted">Total recorded: {enquiries.length}</p>
        </Card>

        {/* Metric 2 */}
        <Card variant="default" className="space-y-2">
          <div className="flex items-center justify-between text-text-secondary text-xs">
            <span>Published Articles</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-navy font-serif">{publishedArticlesCount}</div>
          <p className="text-[11px] text-text-muted">Publicly accessible</p>
        </Card>

        {/* Metric 3 */}
        <Card variant="default" className="space-y-2">
          <div className="flex items-center justify-between text-text-secondary text-xs">
            <span>Pending Drafts</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-bold text-navy font-serif">{draftArticlesCount}</div>
          <p className="text-[11px] text-text-muted">Under advocate review</p>
        </Card>

        {/* Metric 4 */}
        <Card variant="default" className="space-y-2">
          <div className="flex items-center justify-between text-text-secondary text-xs">
            <span>Enquiry Form State</span>
            <ShieldCheck className="w-4 h-4 text-gold-dark" />
          </div>
          <div className="text-sm font-bold text-navy font-serif mt-1">
            {settings.featureFlags.enablePublicEnquiries ? (
              <span className="text-emerald-700">Public Submissions Active</span>
            ) : (
              <span className="text-amber-800">Gated (Inactive)</span>
            )}
          </div>
          <p className="text-[11px] text-text-muted">BCI Rule 36 compliance control</p>
        </Card>
      </div>

      {/* Main Grid: Compliance Checklist & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: BCI Compliance Verification Gate */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-4 shadow-subtle">
            <div className="border-b border-border-subtle pb-3">
              <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-dark" />
                <span>Bar Council Rule 36 Compliance Gate</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Statutory audit checklist for advocate website publication.
              </p>
            </div>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start justify-between gap-2 p-2.5 bg-stone-50 rounded border border-border-subtle">
                <span className="font-medium text-navy">Advocate Full Name &amp; Designation:</span>
                <span className={settings.profile.isFullNameVerified ? "text-emerald-700 font-semibold" : "text-amber-800 font-semibold"}>
                  {settings.profile.isFullNameVerified ? "Verified" : "Placeholder"}
                </span>
              </li>

              <li className="flex items-start justify-between gap-2 p-2.5 bg-stone-50 rounded border border-border-subtle">
                <span className="font-medium text-navy">Bar Council Enrolment Number:</span>
                <span className={settings.profile.isEnrolmentVerified ? "text-emerald-700 font-semibold" : "text-amber-800 font-semibold"}>
                  {settings.profile.isEnrolmentVerified ? "Verified" : "Placeholder"}
                </span>
              </li>

              <li className="flex items-start justify-between gap-2 p-2.5 bg-stone-50 rounded border border-border-subtle">
                <span className="font-medium text-navy">Office Address &amp; Chamber:</span>
                <span className={settings.profile.officeAddress.isVerified ? "text-emerald-700 font-semibold" : "text-amber-800 font-semibold"}>
                  {settings.profile.officeAddress.isVerified ? "Verified" : "Placeholder"}
                </span>
              </li>

              <li className="flex items-start justify-between gap-2 p-2.5 bg-stone-50 rounded border border-border-subtle">
                <span className="font-medium text-navy">Public Consultation Form:</span>
                <span className={settings.featureFlags.enablePublicEnquiries ? "text-emerald-700 font-semibold" : "text-amber-800 font-semibold"}>
                  {settings.featureFlags.enablePublicEnquiries ? "Enabled" : "Disabled (Safe Default)"}
                </span>
              </li>

              <li className="flex items-start justify-between gap-2 p-2.5 bg-stone-50 rounded border border-border-subtle">
                <span className="font-medium text-navy">WhatsApp Click-to-Chat:</span>
                <span className={settings.featureFlags.enableWhatsAppChat ? "text-emerald-700 font-semibold" : "text-amber-800 font-semibold"}>
                  {settings.featureFlags.enableWhatsAppChat ? "Enabled" : "Disabled (Safe Default)"}
                </span>
              </li>
            </ul>

            <div className="pt-2 flex justify-end">
              <Link
                href="/admin/settings"
                className="text-xs font-semibold text-navy hover:text-gold-dark inline-flex items-center gap-1"
              >
                <span>Edit Verification Toggles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Enquiries Queue */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-navy" />
                  <span>Recent Enquiries Queue</span>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Latest submissions requiring scheduling review.
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-navy hover:text-gold-dark inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-8 text-xs text-text-muted">
                No consultation enquiries currently logged.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3 bg-stone-50 rounded border border-border-subtle space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">{enq.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ivory text-navy border border-border-subtle">
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-text-secondary truncate">{enq.message}</p>
                    <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                      <span>Category: {enq.category}</span>
                      <span>{new Date(enq.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
