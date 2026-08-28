"use client";

import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from "@calcom/lib/constants";
import { Activity, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function OglesbyFooter() {
  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500 shadow-sm">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                  Oglesby<span className="text-cyan-600">.</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
              Empowering healthcare organizations with clinical workflow optimization, HIPAA compliance
              auditing, telehealth integration, and revenue cycle excellence.
            </p>

            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                100% HIPAA Ready
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-xs font-light text-slate-500 hover:text-cyan-600 transition-colors">
                  Core Services
                </Link>
              </li>
              <li>
                <Link
                  href="/consultants"
                  className="text-xs font-light text-slate-500 hover:text-cyan-600 transition-colors">
                  Our Consultants
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-xs font-light text-slate-500 hover:text-cyan-600 transition-colors">
                  Compliance Specs
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors">
                  Access Client Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Direct Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs font-light text-slate-500">
                <Phone className="size-4 text-cyan-600 mt-0.5 shrink-0" />
                <a
                  href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
                  className="hover:text-cyan-600 transition-colors">
                  {COMPANY_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs font-light text-slate-500">
                <Mail className="size-4 text-cyan-600 mt-0.5 shrink-0" />
                <a href="mailto:consulting@oglesby.health" className="hover:text-cyan-600 transition-colors">
                  consulting@oglesby.health
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs font-light text-slate-500">
                <MapPin className="size-4 text-cyan-600 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {COMPANY_ADDRESS.split(",")[0]}
                  <br />
                  {COMPANY_ADDRESS.split(",").slice(1).join(",").trim()}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-light text-slate-400">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-[10px] font-light text-slate-400 hover:text-slate-600 transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] font-light text-slate-400 hover:text-slate-600 transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/bba"
              className="text-[10px] font-light text-slate-400 hover:text-slate-600 transition-colors">
              Business Associate Agreement (BAA)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default OglesbyFooter;
