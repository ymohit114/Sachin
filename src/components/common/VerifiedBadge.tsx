import React from "react";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Clock } from "lucide-react";

interface VerifiedBadgeProps {
  isVerified: boolean;
  className?: string;
}

export function VerifiedBadge({ isVerified, className = "" }: VerifiedBadgeProps) {
  if (isVerified) {
    return (
      <Badge variant="verified" size="sm" className={`gap-1 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
        <span>Verified Detail</span>
      </Badge>
    );
  }

  return (
    <Badge variant="unverified" size="sm" className={`gap-1 ${className}`}>
      <Clock className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
      <span>Pending Verification</span>
    </Badge>
  );
}
