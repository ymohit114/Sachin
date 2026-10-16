"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Lock,
  Save,
  Building,
  Scale,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data.settings);
        }
      } catch {
        setErrorMessage("Failed to load settings.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const payload = {
        fullName: settings.profile.fullName,
        isFullNameVerified: settings.profile.isFullNameVerified,
        designation: settings.profile.designation,
        isDesignationVerified: settings.profile.isDesignationVerified,
        enrolmentNumber: settings.profile.enrolmentNumber,
        isEnrolmentVerified: settings.profile.isEnrolmentVerified,
        enrolmentDate: settings.profile.enrolmentDate || "",
        stateBarCouncil: settings.profile.stateBarCouncil,
        isBarCouncilVerified: settings.profile.isBarCouncilVerified,
        officeLine1: settings.profile.officeAddress.line1,
        officeCity: settings.profile.officeAddress.city,
        officeState: settings.profile.officeAddress.state,
        officePincode: settings.profile.officeAddress.pincode,
        isOfficeVerified: settings.profile.officeAddress.isVerified,
        phone: settings.profile.contact.phone,
        isPhoneVerified: settings.profile.contact.isPhoneVerified,
        email: settings.profile.contact.email,
        isEmailVerified: settings.profile.contact.isEmailVerified,
        enablePublicEnquiries: settings.featureFlags.enablePublicEnquiries,
        enableWhatsAppChat: settings.featureFlags.enableWhatsAppChat,
        whatsAppPhoneNumber: settings.featureFlags.whatsAppPhoneNumber || "",
        whatsAppPrefilledText: settings.featureFlags.whatsAppPrefilledText || "",
      };

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to update settings.");
        return;
      }

      setSuccessMessage("Site settings and compliance toggles updated successfully.");
      setSettings(data.settings);
    } catch {
      setErrorMessage("Network error while updating settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return <div className="text-center py-16 text-xs text-text-muted">Loading configuration...</div>;
  }

  const p = settings.profile;
  const f = settings.featureFlags;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Chamber Settings &amp; Compliance Toggles
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage factual profile verification status and professional conduct feature gates.
          </p>
        </div>

        <Button onClick={handleSave} variant="gold" size="md" isLoading={isSaving}>
          <Save className="w-4 h-4 mr-1.5" />
          <span>Save All Settings</span>
        </Button>
      </div>

      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Professional Conduct Feature Flags */}
        <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-6 shadow-subtle">
          <div className="border-b border-border-subtle pb-3">
            <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold-dark" />
              <span>Feature Flags (Bar Council Compliance Gates)</span>
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Keep features disabled until expressly verified and approved by the advocate.
            </p>
          </div>

          <div className="space-y-4">
            {/* Consultation Enquiry Form Flag */}
            <div className="flex items-start justify-between p-4 bg-ivory/50 rounded border border-border-subtle gap-4">
              <div className="space-y-1">
                <span className="font-serif text-sm font-bold text-navy">
                  Public Consultation Enquiry Form
                </span>
                <p className="text-xs text-text-secondary">
                  When enabled, visitors can submit general consultation requests via <code>/contact</code>.
                  When disabled, the form is replaced with a compliant inactive notice.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={f.enablePublicEnquiries}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      featureFlags: { ...f, enablePublicEnquiries: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy"></div>
              </label>
            </div>

            {/* WhatsApp Click-to-Chat Flag */}
            <div className="p-4 bg-ivory/50 rounded border border-border-subtle space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-serif text-sm font-bold text-navy">
                    WhatsApp Click-to-Chat Component
                  </span>
                  <p className="text-xs text-text-secondary">
                    When enabled, renders a discreet floating button linking to the verified WhatsApp number.
                    Strictly requires international format without punctuation.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={f.enableWhatsAppChat}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        featureFlags: { ...f, enableWhatsAppChat: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy"></div>
                </label>
              </div>

              {f.enableWhatsAppChat && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border-subtle">
                  <Input
                    label="Verified WhatsApp Number (e.g., 919810000000)"
                    value={f.whatsAppPhoneNumber || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        featureFlags: { ...f, whatsAppPhoneNumber: e.target.value },
                      })
                    }
                    placeholder="9198XXXXXXXX"
                    helperText="Country code + number (no spaces or '+' symbol)"
                  />

                  <Input
                    label="Neutral Pre-filled Message"
                    value={f.whatsAppPrefilledText || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        featureFlags: { ...f, whatsAppPrefilledText: e.target.value },
                      })
                    }
                    placeholder="Hello Advocate Vipin Khatana, I am enquiring about your chamber schedule."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Advocate Identity & Verification */}
        <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-6 shadow-subtle">
          <div className="border-b border-border-subtle pb-3">
            <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
              <Scale className="w-5 h-5 text-gold-dark" />
              <span>Advocate Identity &amp; Statutory Enrolment</span>
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Toggle the verification status once physical certificates are reviewed.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  label="Advocate Registered Full Name"
                  value={p.fullName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...p, fullName: e.target.value },
                    })
                  }
                />
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.isFullNameVerified}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...p, isFullNameVerified: e.target.checked },
                      })
                    }
                    className="rounded border-border-subtle"
                  />
                  <span>Mark Name as Verified</span>
                </label>
              </div>

              <div className="space-y-2">
                <Input
                  label="Bar Council Enrolment Number"
                  value={p.enrolmentNumber}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...p, enrolmentNumber: e.target.value },
                    })
                  }
                />
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.isEnrolmentVerified}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...p, isEnrolmentVerified: e.target.checked },
                      })
                    }
                    className="rounded border-border-subtle"
                  />
                  <span>Mark Enrolment Number as Verified</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  label="State Bar Council Name"
                  value={p.stateBarCouncil}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...p, stateBarCouncil: e.target.value },
                    })
                  }
                />
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.isBarCouncilVerified}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...p, isBarCouncilVerified: e.target.checked },
                      })
                    }
                    className="rounded border-border-subtle"
                  />
                  <span>Mark State Bar Council as Verified</span>
                </label>
              </div>

              <Input
                label="Date of Enrolment (Optional)"
                value={p.enrolmentDate || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    profile: { ...p, enrolmentDate: e.target.value },
                  })
                }
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Physical Address & Telecommunication */}
        <div className="bg-white rounded-lg border border-border-subtle p-6 space-y-6 shadow-subtle">
          <div className="border-b border-border-subtle pb-3">
            <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
              <Building className="w-5 h-5 text-gold-dark" />
              <span>Chamber Office &amp; Contact Details</span>
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Verified physical address for legal notice and document delivery in Gurugram / Delhi NCR.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Office Address Line"
                value={p.officeAddress.line1}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    profile: {
                      ...p,
                      officeAddress: { ...p.officeAddress, line1: e.target.value },
                    },
                  })
                }
              />

              <Input
                label="City"
                value={p.officeAddress.city}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    profile: {
                      ...p,
                      officeAddress: { ...p.officeAddress, city: e.target.value },
                    },
                  })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="State"
                value={p.officeAddress.state}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    profile: {
                      ...p,
                      officeAddress: { ...p.officeAddress, state: e.target.value },
                    },
                  })
                }
              />

              <Input
                label="Postal Pincode"
                value={p.officeAddress.pincode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    profile: {
                      ...p,
                      officeAddress: { ...p.officeAddress, pincode: e.target.value },
                    },
                  })
                }
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-navy cursor-pointer">
              <input
                type="checkbox"
                checked={p.officeAddress.isVerified}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    profile: {
                      ...p,
                      officeAddress: { ...p.officeAddress, isVerified: e.target.checked },
                    },
                  })
                }
                className="rounded border-border-subtle"
              />
              <span>Mark Office Location as Verified</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div className="space-y-2">
                <Input
                  label="Official Email"
                  type="email"
                  value={p.contact.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: {
                        ...p,
                        contact: { ...p.contact, email: e.target.value },
                      },
                    })
                  }
                />
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.contact.isEmailVerified}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: {
                          ...p,
                          contact: { ...p.contact, isEmailVerified: e.target.checked },
                        },
                      })
                    }
                    className="rounded border-border-subtle"
                  />
                  <span>Mark Email as Verified</span>
                </label>
              </div>

              <div className="space-y-2">
                <Input
                  label="Chamber Telephone"
                  value={p.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: {
                        ...p,
                        contact: { ...p.contact, phone: e.target.value },
                      },
                    })
                  }
                />
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.contact.isPhoneVerified}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: {
                          ...p,
                          contact: { ...p.contact, isPhoneVerified: e.target.checked },
                        },
                      })
                    }
                    className="rounded border-border-subtle"
                  />
                  <span>Mark Telephone as Verified</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="gold" size="lg" isLoading={isSaving}>
            <Save className="w-4 h-4 mr-1.5" />
            <span>Save All Configuration Settings</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
