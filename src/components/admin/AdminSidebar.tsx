"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Scale,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries Queue", icon: Inbox },
  { href: "/admin/articles", label: "Legal Articles CMS", icon: FileText },
  { href: "/admin/settings", label: "Site & Compliance", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="w-64 bg-navy text-ivory flex flex-col min-h-screen border-r border-navy-light flex-shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-navy-light">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-light rounded border border-navy-900">
            <Scale className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="font-serif text-sm font-bold tracking-wide text-ivory">CHAMBER PORTAL</h2>
            <p className="text-[10px] text-gold uppercase tracking-wider">Administrative System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4 space-y-1.5" aria-label="Admin Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-medium transition-colors ${
                isActive
                  ? "bg-gold text-navy font-semibold shadow-sm"
                  : "text-ivory/80 hover:bg-navy-light hover:text-ivory"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-4 border-t border-navy-light space-y-2 text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-ivory/70 hover:text-gold rounded hover:bg-navy-light transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-300 hover:text-red-100 hover:bg-red-950/40 rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
