import { FileCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Business Associate Agreement (BAA) Governance | Oglesby Healthcare Consulting",
  description:
    "Standard Business Associate Agreement terms and compliance specifications under HIPAA/HITECH (45 CFR § 164.504).",
};

export default function BAAPage() {
  const baaProvisions = [
    {
      title: "1. Permitted Uses and Disclosures",
      text: "Business Associate may only use or disclose Protected Health Information (PHI) to perform healthcare consulting, operational audit, and revenue cycle functions for or on behalf of Covered Entity as specified in the underlying Services Agreement.",
    },
    {
      title: "2. Safeguards Against Improper Use",
      text: "Business Associate agrees to implement appropriate administrative, physical, and technical safeguards in full compliance with Subpart C of 45 CFR Part 164 to prevent any use or disclosure of PHI other than as provided for by this Agreement.",
    },
    {
      title: "3. Incident & Breach Notification Commitments",
      text: "Business Associate shall report to Covered Entity any unauthorized acquisition, access, use, or disclosure of unsecure PHI within twenty-four (24) hours of discovery, exceeding the federal statutory threshold.",
    },
    {
      title: "4. Subcontractors & Sub-processors",
      text: "In accordance with 45 CFR § 164.502(e)(1)(ii) and § 164.504(e)(1)(i), Business Associate ensures that any subcontractors that create, receive, maintain, or transmit PHI agree to the same restrictions and conditions that apply to Business Associate.",
    },
    {
      title: "5. Disposition of PHI at Termination",
      text: "Upon termination of the Services Agreement, Business Associate shall, if feasible, return or cryptographically destroy all PHI received from, or created on behalf of, Covered Entity in accordance with NIST SP 800-88 standards.",
    },
  ];

  return (
    <main className="w-full bg-slate-50 min-h-screen py-20 px-6">
      <div className="max-w-[1000px] mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 lg:p-16 shadow-sm space-y-10">
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest">
            <FileCheck className="size-4 text-emerald-600" />
            HIPAA Statutory Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Business Associate Agreement (BAA) Terms
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Standard Provisions Under 45 CFR § 164.502(e) and § 164.504(e)
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Statutory Notice to Healthcare Practices</h3>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            This document outlines the standard BAA governance terms incorporated into every advisory
            engagement conducted by Oglesby Healthcare Consulting LLC. We execute individualized,
            countersigned BAA packets for each partner medical practice prior to data onboarding.
          </p>
        </div>

        {/* Provisions */}
        <div className="space-y-6">
          {baaProvisions.map((item, idx) => (
            <div key={idx} className="space-y-2 pb-6 border-b border-slate-100 last:border-0">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Action Box */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Need a Countersigned BAA Packet?</h4>
            <p className="text-xs text-slate-500 font-light">
              We provide formal executed PDFs for your practice compliance binder within 2 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shrink-0">
            Request Signed BAA
          </Link>
        </div>
      </div>
    </main>
  );
}
