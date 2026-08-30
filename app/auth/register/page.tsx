"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, CheckCircle2, FileCheck, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import OglesbyHeader from "@/components/healthcare/OglesbyHeader";
import OglesbyFooter from "@/components/healthcare/OglesbyFooter";

export default function RegisterPage() {
  const { register, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await register(email, password, name);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("email-already-in-use")) {
        setError("An account with this email already exists. Sign in instead.");
      } else if (msg.includes("weak-password")) {
        setError("Password is too weak — use at least 8 characters.");
      } else {
        setError("Registration failed. Please try again.");
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

  const benefits = [
    { icon: ShieldCheck, title: "HIPAA-Compliant Portal", desc: "Your health data protected by enterprise-grade security" },
    { icon: FileCheck, title: "Compliance Tracking", desc: "Real-time audit readiness monitoring & milestone tracking" },
    { icon: Users, title: "Dedicated Advisory Team", desc: "Direct access to your assigned healthcare consultants" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <OglesbyHeader />

      <main className="flex-1 flex">
        {/* ── Left Panel: Brand + Benefits ──────────────────────────────── */}
        <div className="hidden lg:flex lg:w-[52%] xl:w-[58%] relative flex-col justify-between overflow-hidden bg-white border-r border-slate-200">
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-300/8 to-transparent rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-center flex-1 px-14 xl:px-20 py-16">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Join the Oglesby Network
              </span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
              Start Your
              <br />
              <span className="text-cyan-700">Healthcare Journey.</span>
            </h1>
            <div className="w-14 h-1 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full mb-6" />
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-md mb-12">
              Create your account and get instant access to your personalised
              client portal — your hub for consultations, compliance, and growth.
            </p>

            {/* Benefit cards */}
            <div className="space-y-5 mb-12">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-cyan-100 hover:bg-cyan-50/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{title}</p>
                    <p className="text-xs text-slate-500 font-light mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#0e7490", "#0891b2", "#22d3ee", "#6ee7b7"].map((color) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                  >
                    +
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Join <span className="font-bold text-slate-700">500+ practices</span> already on the platform
              </p>
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

            {/* Mobile brand */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-800">
                Oglesby<span className="text-cyan-600">.</span>
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">Create account</h2>
            <p className="text-sm text-slate-500 mb-8">Join Oglesby Healthcare Consulting</p>

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
                <label htmlFor="name" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
                />
              </div>

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 chars"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirm" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Confirm
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-lg leading-none mt-0.5">!</span>
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md shadow-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Create My Account</span><ArrowRight className="size-4" /></>
                }
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline">
                Sign in →
              </Link>
            </p>

            {/* Legal */}
            <div className="mt-6 flex items-start gap-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="text-cyan-600 hover:underline">Terms</Link>
                {" "}&amp;{" "}
                <Link href="/privacy" className="text-cyan-600 hover:underline">Privacy Policy</Link>.
                HIPAA-compliant infrastructure.
              </p>
            </div>
          </div>
        </div>
      </main>

      <OglesbyFooter />
    </div>
  );
}
