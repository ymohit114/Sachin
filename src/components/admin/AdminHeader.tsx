import React from "react";
import { getSession } from "@/lib/auth/session";
import { isPersistentStorageActive } from "@/lib/db/mongodb";
import { ShieldCheck, Database, HardDrive } from "lucide-react";

export async function AdminHeader() {
  const session = await getSession();
  const isMongoActive = isPersistentStorageActive();

  return (
    <header className="h-16 bg-white border-b border-border-subtle px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Gurugram Chamber Admin
        </span>
        <div className="h-4 w-px bg-border-subtle"></div>
        {/* Storage Health Indicator */}
        <div className="flex items-center gap-1.5 text-xs">
          {isMongoActive ? (
            <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>MongoDB Active</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300" title="Running in development fallback mode">
              <HardDrive className="w-3 h-3 text-amber-600" />
              <span>Dev Memory Mode</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-gold-dark" />
          <span className="font-medium text-navy">{session?.email || "Administrator"}</span>
          <span className="px-1.5 py-0.5 bg-ivory text-navy border border-border-subtle rounded text-[10px] uppercase font-bold">
            {session?.role || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
