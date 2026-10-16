import React from "react";
import Link from "next/link";
import { DEFAULT_PRACTICE_AREAS } from "@/lib/constants/site-defaults";
import { Card } from "@/components/ui/Card";
import { ArrowRight, BookOpen, Scale, FileText } from "lucide-react";

export const metadata = {
  title: "Areas of Legal Practice",
  description:
    "Factual overview of legal practice areas handled by Advocate Vipin Khatana before District Court Gurugram and Sub-Divisional Court Sohna.",
};

export default function PracticeAreasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Subject Matter Overview
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          Areas of Legal Practice
        </h1>
        <p className="text-sm text-text-secondary max-w-3xl leading-relaxed">
          The following entries outline the legal subjects and statutory frameworks handled before the
          District &amp; Sessions Courts in Gurugram, the Sub-Divisional Courts in Sohna, and relevant appellate tribunals.
          In compliance with Bar Council of India standards, descriptions are purely factual and do not constitute
          claims of superiority, guaranteed outcomes, or specialised ranking.
        </p>
      </div>

      {/* Grid of Practice Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEFAULT_PRACTICE_AREAS.map((area) => (
          <Card
            key={area.slug}
            variant="default"
            className="flex flex-col justify-between space-y-6 hover:border-navy transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider">
                  {area.category}
                </span>
                <Scale className="w-4 h-4 text-navy" />
              </div>

              <h2 className="font-serif text-xl font-bold text-navy">
                <Link href={`/practice-areas/${area.slug}`} className="hover:text-gold-dark transition-colors">
                  {area.title}
                </Link>
              </h2>

              <p className="text-xs text-text-secondary leading-relaxed">
                {area.description}
              </p>

              {/* Statutory Framework summary */}
              <div className="space-y-1.5 pt-2 border-t border-border-subtle/70">
                <span className="text-[11px] font-semibold text-navy uppercase tracking-wider block">
                  Applicable Statutes:
                </span>
                <ul className="text-[11px] text-text-muted space-y-1">
                  {area.statutoryFramework.slice(0, 3).map((statute, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-gold-dark">&bull;</span>
                      <span>{statute}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle">
              <Link
                href={`/practice-areas/${area.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold-dark"
              >
                <span>Read Procedural Summary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Statutory Disclaimer Notice */}
      <div className="p-6 bg-ivory rounded-lg border border-border-subtle text-xs text-text-secondary space-y-2">
        <h3 className="font-serif font-bold text-navy flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-gold-dark" />
          <span>Statutory Compliance Notice</span>
        </h3>
        <p className="leading-relaxed">
          The subject areas listed above do not imply exclusive specialisation under Bar Council rules.
          Every legal matter depends strictly upon individual facts, evidentiary documentation, and current judicial interpretations.
          Prior consultation is required to assess jurisdictional competence.
        </p>
      </div>
    </div>
  );
}
