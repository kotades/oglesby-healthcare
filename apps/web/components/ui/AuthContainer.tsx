import classNames from "classnames";
import Link from "next/link";
import { Activity, ShieldCheck, Phone, MapPin } from "lucide-react";
import Loader from "@components/Loader";

interface Props {
  footerText?: React.ReactNode | string;
  showLogo?: boolean;
  heading?: string;
  loading?: boolean;
}

export default function AuthContainer(props: React.PropsWithChildren<Props>) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-emerald-600/15 blur-[120px]" />

      {props.loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Oglesby Healthcare Header */}
        <Link href="/" className="mb-6 group flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-600/30 group-hover:scale-105 transition-transform">
              <Activity className="size-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                OGLESBY
              </span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Healthcare Consulting
              </span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            100% HIPAA Audit Ready
          </div>
        </Link>

        {props.heading && (
          <h2 className="text-center text-2xl font-semibold text-slate-100 mb-6">
            {props.heading}
          </h2>
        )}

        {/* Main Glass Card */}
        <div className="w-full rounded-3xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_50px_rgba(8,145,178,0.12)]">
          {props.children}
        </div>

        {props.footerText && (
          <div className="mt-6 text-center text-sm text-slate-400">
            {props.footerText}
          </div>
        )}

        {/* Footer Contact Details */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <a href="tel:+13182326195" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
            <Phone className="size-3.5 text-cyan-500" />
            +1 318 232 6195
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-emerald-500" />
            Shreveport, LA 71113
          </span>
        </div>
      </div>
    </div>
  );
}
