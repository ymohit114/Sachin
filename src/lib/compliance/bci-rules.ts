/**
 * Bar Council of India (BCI) Rule 36 Compliance Utility
 * Enforces strict verification and monitors forbidden promotional copy.
 */

const PROHIBITED_MARKETING_TERMS = [
  "best advocate",
  "top advocate",
  "leading advocate",
  "best lawyer",
  "top lawyer",
  "leading lawyer",
  "guaranteed",
  "100% win",
  "no win no fee",
  "highest success",
  "specialist in winning",
  "cheap legal",
  "discounted legal",
  "free consultation offer",
  "book now and get",
  "hurry",
  "exclusive offer",
];

export function auditTextForCompliance(text: string): {
  isCompliant: boolean;
  violations: string[];
} {
  const lower = text.toLowerCase();
  const violations: string[] = [];

  for (const term of PROHIBITED_MARKETING_TERMS) {
    if (lower.includes(term)) {
      violations.push(`Prohibited promotional phrase detected: "${term}"`);
    }
  }

  return {
    isCompliant: violations.length === 0,
    violations,
  };
}

export function formatWhatsAppUrl(phone: string, prefill: string): string {
  // Strip all non-digit characters
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(prefill);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
