"use client";

import { debounce } from "lodash";
import Link from "next/link";
import type { SyntheticEvent } from "react";
import React from "react";
import { ShieldCheck, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { OglesbyHeader } from "@components/healthcare/OglesbyHeader";
import { OglesbyFooter } from "@components/healthcare/OglesbyFooter";

export type PageProps = {
  csrfToken?: string;
};

export default function ForgotPassword(props: PageProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<{ message: string } | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (!res.ok) {
        setError({ message: json.message || "Unable to send password reset link." });
      } else {
        setSuccess(true);
      }
    } catch (reason) {
      setError({ message: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Global Navigation Header */}
      <OglesbyHeader />

      <main className="flex-1 relative flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-emerald-600/15 blur-[120px]" />

        <div className="relative z-10 w-full max-w-md my-auto">
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_50px_rgba(8,145,178,0.12)]">
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                Oglesby Security Center
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {success ? "Reset Link Sent" : "Reset Patient / Client Password"}
              </h1>
              <p className="text-xs text-slate-400">
                {success
                  ? `Instructions have been sent to ${email}`
                  : "Enter your registered email address to receive a secure password reset link."}
              </p>
            </div>

            {success ? (
              <div className="space-y-6 text-center">
                <CheckCircle2 className="size-12 text-emerald-400 mx-auto" />
                <p className="text-xs text-slate-300">
                  Please check your inbox for instructions to reset your Oglesby Healthcare account password.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 to-emerald-600">
                  <ArrowLeft className="size-4" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {error.message}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                    <Mail className="size-3.5 text-cyan-400" />
                    <span>Client / Patient Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/30 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 shadow-md shadow-cyan-600/20 disabled:opacity-50">
                  {loading ? "Sending Reset Link..." : "Send Password Reset Link"}
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/auth/login"
                    className="text-xs text-cyan-400 hover:underline inline-flex items-center space-x-1">
                    <ArrowLeft className="size-3" />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Global Navigation Footer */}
      <OglesbyFooter />
    </div>
  );
}
