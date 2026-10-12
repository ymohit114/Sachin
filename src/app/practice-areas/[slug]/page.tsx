import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEFAULT_PRACTICE_AREAS } from "@/lib/constants/site-defaults";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Scale, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = DEFAULT_PRACTICE_AREAS.find((a) => a.slug === slug);
  if (!area) return { title: "Practice Area Not Found" };

  return {
    title: `${area.title} — Practice Overview`,
    description: area.description,
  };
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = DEFAULT_PRACTICE_AREAS.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/practice-areas"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Practice Areas</span>
        </Link>
      </div>

      {/* Main Header */}
      <div className="border-b border-border-subtle pb-6 space-y-3">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          {area.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          {area.title}
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {area.description}
        </p>
      </div>

      {/* Procedural Overview */}
      <section className="bg-white rounded-lg border border-border-subtle p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="flex items-center gap-2.5 border-b border-border-subtle pb-4">
          <Scale className="w-5 h-5 text-navy" />
          <h2 className="font-serif text-xl font-bold text-navy">
            Procedural Stages &amp; Representation Scope
          </h2>
        </div>

        <ul className="space-y-4">
          {area.proceduralOverview.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-primary">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Statutory & Regulatory Framework */}
      <section className="bg-white rounded-lg border border-border-subtle p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="flex items-center gap-2.5 border-b border-border-subtle pb-4">
          <BookOpen className="w-5 h-5 text-navy" />
          <h2 className="font-serif text-xl font-bold text-navy">
            Governing Statutory Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {area.statutoryFramework.map((statute, idx) => (
            <div
              key={idx}
              className="p-3 bg-ivory rounded border border-border-subtle text-xs font-medium text-navy flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-gold-dark"></span>
              <span>{statute}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Restraint Notice */}
      <Card variant="ivory" className="space-y-3 text-xs text-text-secondary">
        <div className="flex items-center gap-2 font-bold text-navy">
          <AlertCircle className="w-4 h-4 text-gold-dark" />
          <span>Professional Restraint &amp; Outcome Neutrality Notice</span>
        </div>
        <p className="leading-relaxed">
          The judicial process is governed by facts, statutory provisions, and judicial discretion.
          Under Bar Council of India standards, no advocate may predict, guarantee, or warrant specific legal outcomes.
          Information on this page is purely descriptive of procedural phases and does not constitute a solicitation of work.
        </p>
      </Card>
    </div>
  );
}
