import React from "react";
import { Card } from "@/components/ui/Card";
import { Scale, AlertTriangle, ShieldCheck, FileCheck } from "lucide-react";
import { BCI_DISCLAIMER_TEXT } from "@/lib/constants/site-defaults";

export const metadata = {
  title: "Professional & Legal Disclaimer",
  description:
    "Statutory disclaimer under Rule 36 of the Bar Council of India Rules and Advocates Act, 1961 for Advocate Sachin.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Bar Council of India Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          Legal &amp; Professional Disclaimer
        </h1>
        <p className="text-xs text-text-secondary">
          Statutory Notice under Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules
        </p>
      </div>

      <div className="bg-white rounded-lg border border-border-subtle p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-text-secondary leading-relaxed shadow-subtle">
        {/* Full Disclaimer Clauses */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-navy font-serif font-bold text-lg border-b border-border-subtle pb-3">
            <Scale className="w-5 h-5 text-gold-dark" />
            <span>Statutory Declarations</span>
          </div>

          <div className="space-y-4 pt-2">
            {BCI_DISCLAIMER_TEXT.full.map((clause, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-ivory/50 rounded border border-border-subtle/60">
                <span className="font-mono font-bold text-navy text-xs mt-0.5">{idx + 1}.</span>
                <p className="leading-relaxed">{clause}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: No Advocate-Client Relationship */}
        <section className="space-y-3 pt-4 border-t border-border-subtle">
          <h2 className="font-serif text-base font-bold text-navy flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <span>Non-Establishment of Advocate-Client Relationship</span>
          </h2>
          <p>
            Neither the receipt of information contained on this website nor any electronic communication transmitted
            through the optional consultation form shall create an advocate-client relationship between Advocate Sachin
            and the user. An advocate-client relationship is formally established exclusively upon mutual written agreement,
            execution of a formal Vakalatnama, and explicit acceptance of professional engagement.
          </p>
        </section>

        {/* Section 3: Educational Nature of Content */}
        <section className="space-y-3 pt-4 border-t border-border-subtle">
          <h2 className="font-serif text-base font-bold text-navy flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-gold-dark" />
            <span>Academic &amp; Educational Purpose of Legal Articles</span>
          </h2>
          <p>
            Legal commentaries, notes on statutory amendments, and procedural guides published on this platform
            are provided solely for general educational discussion. They do not constitute a legal opinion, advice, or
            formal recommendation. The advocate shall not be liable for any consequences arising from action taken
            or not taken by any person relying on materials available on this website.
          </p>
        </section>

        {/* Section 4: Jurisdiction */}
        <section className="space-y-3 pt-4 border-t border-border-subtle">
          <h2 className="font-serif text-base font-bold text-navy flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-dark" />
            <span>Jurisdiction</span>
          </h2>
          <p>
            Any disputes arising in connection with the operation of this website shall be subject exclusively to
            the jurisdiction of the competent courts in Gurugram, Haryana, India.
          </p>
        </section>
      </div>

      <Card variant="ivory" className="text-xs text-text-secondary">
        <p className="font-semibold text-navy">Notice to Users:</p>
        <p className="mt-1 leading-relaxed">
          If you do not accept or agree with the provisions of this disclaimer, you are advised to discontinue browsing this website.
        </p>
      </Card>
    </div>
  );
}
