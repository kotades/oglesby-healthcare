"use client";

import { ShieldCheck, Calendar, ArrowRight, CheckCircle2, ActivitySquare, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

export function OglesbyHero() {
  return (
    <section className="relative w-full bg-slate-50 border-b border-slate-200 overflow-hidden">
      {/* Background Orbs (Lightened for Stitch aesthetic) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-400/10 to-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Column: Content */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 xl:p-24 relative z-10 border-r border-slate-200">
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Neo-Corporate Efficiency Engine
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Elevating Clinical<br />
            <span className="text-cyan-700">Operations.</span>
          </h1>

          <div className="w-16 h-1 bg-cyan-600 mb-6" />

          <p className="text-lg text-slate-600 font-light leading-relaxed max-w-xl mb-10">
            Empowering medical practices and health systems to optimize workflows, enforce HIPAA compliance, and maximize revenue cycle performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#booker"
              className="group flex h-12 items-center justify-center gap-2 rounded bg-slate-900 px-8 text-xs font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <Calendar className="size-4" />
              Schedule Audit
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#services"
              className="flex h-12 items-center justify-center gap-2 rounded border border-cyan-600 bg-transparent px-8 text-xs font-bold uppercase tracking-[0.1em] text-cyan-700 transition-all hover:bg-cyan-50 focus:ring-2 focus:ring-cyan-600"
            >
              View Services
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <Shield className="size-5 text-cyan-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">100% HIPAA Ready</span>
              <span className="text-[11px] text-slate-500 font-light">Audit-proof frameworks</span>
            </div>
            <div className="flex flex-col gap-2">
              <ActivitySquare className="size-5 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Workflow Optimized</span>
              <span className="text-[11px] text-slate-500 font-light">Reduce clinical friction</span>
            </div>
            <div className="flex flex-col gap-2">
              <TrendingUp className="size-5 text-teal-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Revenue Growth</span>
              <span className="text-[11px] text-slate-500 font-light">Cycle performance metrics</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual / Portal Access */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 lg:p-16 relative">
          {/* Glass Panel imitating the Client Portal */}
          <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-lg p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Live Booking Engine</h3>
                <p className="text-[11px] text-slate-500 mt-1">Real-time availability sync</p>
              </div>
              <div className="px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700 tracking-wider">
                ONLINE
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-1">Featured Audit</p>
                <h4 className="text-lg font-bold text-slate-900">60-Min Operations Review</h4>
                <p className="text-xs text-slate-500 mt-2 font-light">
                  Comprehensive evaluation of operational workflows and telehealth infrastructure.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-600">Next Available Slot</span>
                  <span className="font-bold text-emerald-600">Today, 2:30 PM CST</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-cyan-500 to-emerald-400" />
                </div>
              </div>

              <Link
                href="/auth/login"
                className="flex w-full h-10 items-center justify-center gap-2 rounded bg-slate-900 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-slate-800"
              >
                Access Client Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
