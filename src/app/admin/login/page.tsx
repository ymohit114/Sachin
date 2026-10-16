"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Scale, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Please verify credentials.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error while connecting to authentication service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl border border-border-subtle p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mx-auto border border-border-subtle text-navy">
            <Scale className="w-6 h-6 text-gold-dark" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-navy">
            Chamber Administration
          </h1>
          <p className="text-xs text-text-secondary">
            Restricted access portal for Advocate Vipin Khatana and authorised chamber personnel.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-start gap-2" role="alert">
            <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Chamber Administrator Email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@advocatechamber.local"
          />

          <Input
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
          />

          <Button type="submit" variant="gold" size="md" isLoading={isLoading} className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            <span>Sign In to Dashboard</span>
          </Button>
        </form>

        <div className="border-t border-border-subtle pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
