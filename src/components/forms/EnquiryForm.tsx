"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { AlertCircle, CheckCircle, ShieldAlert, Lock } from "lucide-react";

interface EnquiryFormProps {
  isFormEnabled: boolean;
}

export function EnquiryForm({ isFormEnabled }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Civil Litigation",
    message: "",
    disclaimerConsent: false,
    website_url_hp: "", // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (!isFormEnabled) {
    return (
      <div className="bg-ivory border border-border-subtle rounded-lg p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-navy font-serif font-bold text-lg">
          <Lock className="w-5 h-5 text-gold-dark" />
          <span>Consultation Form Inactive</span>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Public online enquiry submission is presently deactivated pending professional review of data collection
          rules under Bar Council of India guidelines.
        </p>
        <p className="text-xs text-text-muted">
          To enquire regarding chamber consultations, please refer to the verified physical office address or official chamber email listed on this page.
        </p>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full Name must be at least 2 characters";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = "Valid telephone number (min 10 digits) is required";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email format";
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = "Please provide a brief message of at least 15 characters";
    }
    if (!formData.disclaimerConsent) {
      errs.disclaimerConsent = "You must acknowledge that submission does not create an advocate-client relationship";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || "Unable to process enquiry at this time. Please try again later.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError("Network error while submitting enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 sm:p-8 space-y-4 text-emerald-900" role="status">
        <div className="flex items-center gap-2 font-serif font-bold text-lg">
          <CheckCircle className="w-5 h-5 text-emerald-700" />
          <span>Enquiry Received</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed">
          Your general enquiry has been recorded for chamber review. Please note that submission does not establish
          an advocate-client relationship or guarantee engagement.
        </p>
        <p className="text-xs text-emerald-800">
          If urgent court filing deadlines apply to your matter, you must seek immediate formal representation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border-subtle rounded-lg p-6 sm:p-8 space-y-6 shadow-subtle">
      <div className="border-b border-border-subtle pb-4">
        <h2 className="font-serif text-xl font-bold text-navy">
          Consultation &amp; Schedule Enquiry
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Submit basic scheduling inquiries. Do not submit sensitive case documents or confidential particulars.
        </p>
      </div>

      {serverError && (
        <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-start gap-2" role="alert">
          <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot field (hidden from screen and CSS) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url_hp">Website URL</label>
        <input
          type="text"
          id="website_url_hp"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_url_hp}
          onChange={(e) => setFormData({ ...formData, website_url_hp: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="e.g. Ramesh Kumar"
        />

        <Input
          label="Telephone Number"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          placeholder="+91 98XXXXXXXX"
          helperText="For scheduling confirmation"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address (Optional)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          placeholder="your.email@example.com"
        />

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-navy mb-1.5">
            General Subject Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-border-subtle rounded text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
          >
            <option value="Civil Litigation">Civil Litigation</option>
            <option value="Commercial Disputes">Commercial Disputes</option>
            <option value="Real Estate & HARERA">Real Estate &amp; HARERA</option>
            <option value="Criminal Defense & Bail">Criminal Defense &amp; Bail</option>
            <option value="Arbitration & ADR">Arbitration &amp; ADR</option>
            <option value="Other Legal Matter">Other Legal Matter</option>
          </select>
        </div>
      </div>

      <Textarea
        label="Brief Summary of Scheduling Enquiry"
        required
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        placeholder="Briefly state the judicial forum and general nature of your enquiry. Do NOT paste confidential facts or account numbers."
        helperText="Max 1500 characters. No confidential files."
      />

      {/* Mandatory Statutory Disclaimer Checkbox */}
      <div className="space-y-2 border-t border-border-subtle pt-4">
        <div className="p-3 bg-ivory rounded border border-border-subtle flex items-start gap-2.5 text-xs text-text-secondary">
          <ShieldAlert className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>Important Legal Warning:</strong> Submission of this form does not establish an advocate-client relationship.
            Do not include confidential, time-sensitive, or privileged legal documents.
          </p>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-text-primary pt-2">
          <input
            type="checkbox"
            checked={formData.disclaimerConsent}
            onChange={(e) => setFormData({ ...formData, disclaimerConsent: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-border-subtle text-navy focus:ring-gold"
          />
          <span className="leading-relaxed">
            I understand and acknowledge that submitting this enquiry does not create an advocate-client relationship,
            and that I must not rely on this submission for urgent limitation deadlines. <span className="text-red-700">*</span>
          </span>
        </label>
        {errors.disclaimerConsent && (
          <p className="text-xs text-red-700 font-medium" role="alert">
            {errors.disclaimerConsent}
          </p>
        )}
      </div>

      <Button type="submit" variant="gold" size="lg" isLoading={isSubmitting} className="w-full">
        Submit Consultation Enquiry
      </Button>
    </form>
  );
}
