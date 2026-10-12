"use client";

import React, { useState, useEffect } from "react";
import { EnquirySubmission } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Inbox,
  Clock,
  Trash2,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  ShieldAlert,
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch {
      setActionError("Failed to load enquiries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquirySubmission["status"]) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch {
      setActionError("Failed to update enquiry status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this enquiry record per the retention policy?")) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      setActionError("Failed to purge enquiry record.");
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Consultation Enquiries Management
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Review incoming consultation enquiries and manage retention lifecycle.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {["all", "new", "in_review", "resolved", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded uppercase tracking-wider transition-colors ${
                filter === st
                  ? "bg-navy text-ivory"
                  : "bg-white text-text-secondary border border-border-subtle hover:bg-stone-50"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {actionError && (
        <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Retention Policy Banner */}
      <div className="p-4 bg-ivory rounded border border-border-subtle text-xs text-text-secondary flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Privacy Retention Notice:</strong> In compliance with data minimisation obligations,
          enquiry submissions carry a default retention period of 90 days. Records can be permanently purged below
          once scheduling consultations are concluded.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-xs text-text-muted">Loading enquiries...</div>
      ) : filteredEnquiries.length === 0 ? (
        <Card variant="ivory" className="text-center py-12 space-y-2">
          <Inbox className="w-8 h-8 text-text-muted mx-auto" />
          <h2 className="font-serif text-base font-bold text-navy">No Enquiries Found</h2>
          <p className="text-xs text-text-secondary">
            {filter === "all"
              ? "No consultation inquiries are currently logged in the system."
              : `No inquiries matching status "${filter}".`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-border-subtle rounded-lg p-5 sm:p-6 space-y-4 shadow-subtle"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-navy">{enq.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ivory text-navy border border-border-subtle">
                    {enq.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Received: {new Date(enq.createdAt).toLocaleString("en-IN")}</span>
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-navy" />
                  <span className="font-mono font-medium text-navy">{enq.phone}</span>
                </div>
                {enq.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-navy" />
                    <span className="font-mono">{enq.email}</span>
                  </div>
                )}
                <div className="px-2 py-0.5 bg-ivory rounded border border-border-subtle text-[11px] font-medium text-navy">
                  Category: {enq.category}
                </div>
              </div>

              {/* Message */}
              <div className="p-3.5 bg-stone-50 rounded border border-border-subtle text-xs text-text-primary leading-relaxed whitespace-pre-wrap">
                {enq.message}
              </div>

              {/* Retention Date & Action Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border-subtle text-xs">
                <span className="text-[11px] text-text-muted">
                  Scheduled Retention Purge: {new Date(enq.retentionExpiresAt).toLocaleDateString("en-IN")}
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      handleStatusChange(enq.id, e.target.value as EnquirySubmission["status"])
                    }
                    className="px-2.5 py-1 text-xs border border-border-subtle rounded bg-white text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  >
                    <option value="new">Mark New</option>
                    <option value="in_review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>

                  <Button
                    onClick={() => handleDelete(enq.id)}
                    variant="danger"
                    size="sm"
                    className="px-2 py-1"
                    title="Purge record permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
