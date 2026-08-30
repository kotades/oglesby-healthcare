"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import OglesbyHeader from "@/components/healthcare/OglesbyHeader";
import OglesbyFooter from "@/components/healthcare/OglesbyFooter";

export default function LoginPage() {
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("invalid-credential") || msg.includes("wrong-password") || msg.includes("user-not-found")) {
        setError("Incorrect email or password. Please try again.");
      } else if (msg.includes("too-many-requests")) {
        setError("Too many attempts. Please wait or reset your password.");
      } else {
        setError("Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (!msg.includes("popup-closed-by-user")) {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Enter your email address above, then click 'Forgot password'.");
      return;
    }
    try {
      await resetPassword(email);
      setResetSent(true);
      setError("");
    } catch {
      setError("Could not send reset email. Check the email address.");
    }
  }

  const trustPoints = [
    { icon: ShieldCheck, label: "HIPAA-Compliant Infrastructure" },
    { icon: Lock, label: "End-to-End Encrypted Sessions" },
    { icon: CheckCircle2, label: "Zero-Trust Data Isolation" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <OglesbyHeader />

      <main className="flex-1 flex">
        {/* ── Left Panel: Brand + Trust ─────────────────────────────────── */}
        <div className="hidden lg:flex lg:w-[52%] xl:w-[58%] relative flex-col justify-between overflow-hidden bg-white border-r border-slate-200">
          {/* Subtle gradient orb */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-300/8 to-slate-100/20 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-center flex-1 px-14 xl:px-20 py-16">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Secure Client Portal
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
              Your Healthcare
              <br />
              <span className="text-cyan-700">Practice, Elevated.</span>
            </h1>
            <div className="w-14 h-1 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full mb-6" />
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-md mb-12">
              Access your personalized dashboard — manage consultations, track
              compliance milestones, and connect with your dedicated advisory team.
            </p>

            {/* Trust points */}
            <div className="space-y-4 mb-12">
              {trustPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-cyan-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">{label}</span>
                </div>
              ))}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {[
                { value: "500+", label: "Practices Served" },
                { value: "98%", label: "Client Retention" },
                { value: "24h", label: "Response SLA" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center"
                >
                  <p className="text-xl font-extrabold text-cyan-700">{stat.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom brand stripe */}
          <div className="relative z-10 border-t border-slate-100 px-14 xl:px-20 py-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500 shadow-sm">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800">Oglesby</span>
              <span className="text-sm font-bold text-cyan-600">.</span>
              <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">
                Healthcare Consulting LLC
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Panel: Form ──────────────────────────────────────────── */}
        <div className="w-full lg:w-[48%] xl:w-[42%] flex items-center justify-center px-6 sm:px-12 py-12">
          <div className="w-full max-w-sm">

            {/* Mobile brand (hidden on lg+) */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-800">
                Oglesby<span className="text-cyan-600">.</span>
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
            <p className="text-sm text-slate-500 mb-8">Sign in to your client portal</p>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mb-5"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-slate-300 border-t-cyan-600 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 font-medium">or with email</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-lg leading-none mt-0.5">!</span>
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}
              {resetSent && (
                <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-emerald-700 text-xs">Password reset sent — check your inbox.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md shadow-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Sign In to Portal</span><ArrowRight className="size-4" /></>
                }
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-5 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-cyan-600 hover:text-cyan-700 hover:underline font-medium"
              >
                Forgot password?
              </button>
              <Link href="/auth/register" className="text-slate-500 hover:text-cyan-600 font-medium transition-colors">
                Create account →
              </Link>
            </div>

            {/* HIPAA note */}
            <div className="mt-8 flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-50 border border-cyan-100">
              <ShieldCheck className="size-4 text-cyan-600 shrink-0" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Protected by HIPAA-compliant infrastructure.{" "}
                <Link href="/privacy" className="text-cyan-600 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <OglesbyFooter />
    </div>
  );
}
