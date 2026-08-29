"use client";

import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from "@/lib/constants";
import { Activity, ArrowRight, FileCheck, Lock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function OglesbyFooter() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-tr from-cyan-500 to-emerald-400 shadow-md">
                <Activity className="h-5 w-5 text-slate-950 font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  Oglesby<span className="text-cyan-400">.</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Healthcare Consulting LLC
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Premier clinical operations, HIPAA compliance governance, telehealth infrastructure, and revenue
              cycle management advisory for modern medical practices and health systems nationwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-emerald-400">
                <ShieldCheck className="size-3.5" />
                <span>100% HIPAA Ready</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-cyan-400">
                <Lock className="size-3.5" />
                <span>Zero-Trust Data Isolation</span>
              </div>
            </div>
          </div>

          {/* Solutions Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">Advisory Solutions</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link href="/services#clinical-ops" className="hover:text-cyan-400 transition-colors">
                  Clinical Workflow Optimization
                </Link>
              </li>
              <li>
                <Link href="/services#hipaa-compliance" className="hover:text-cyan-400 transition-colors">
                  HIPAA & OCR Audit Readiness
                </Link>
              </li>
              <li>
                <Link href="/services#revenue-cycle" className="hover:text-cyan-400 transition-colors">
                  Revenue Cycle Management (RCM)
                </Link>
              </li>
              <li>
                <Link
                  href="/services#telehealth-integration"
                  className="hover:text-cyan-400 transition-colors">
                  Telehealth & EHR Integration
                </Link>
              </li>
              <li>
                <Link href="/services#executive-advisory" className="hover:text-cyan-400 transition-colors">
                  Executive Practice Leadership
                </Link>
              </li>
              <li>
                <Link href="/services#payer-contracting" className="hover:text-cyan-400 transition-colors">
                  Payer Fee Schedule Negotiation
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Resources Col */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">Knowledge & Access</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link href="/consultants" className="hover:text-cyan-400 transition-colors">
                  Senior Advisors
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-cyan-400 transition-colors">
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-cyan-400 transition-colors">
                  Research & Playbooks
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Emergency Audit Dispatch
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Client Portal Login &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">Direct Advisory</h4>
            <ul className="space-y-3.5 text-xs text-slate-400 font-light">
              <li className="flex items-start gap-3">
                <Phone className="size-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Executive Line</span>
                  <a
                    href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
                    className="text-white hover:text-cyan-400 transition-colors font-medium">
                    {COMPANY_PHONE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="size-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Advisory Desk</span>
                  <a
                    href="mailto:advisory@oglesbyhealthcare.com"
                    className="text-white hover:text-cyan-400 transition-colors font-medium">
                    advisory@oglesbyhealthcare.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Corporate Office
                  </span>
                  <span className="text-slate-300 leading-relaxed block">{COMPANY_ADDRESS}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Subfooter */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved. Specialized Healthcare
            Operational Advisory.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              HIPAA Privacy Practices
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/bba" className="hover:text-slate-300 transition-colors">
              Business Associate Agreement (BAA)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default OglesbyFooter;
