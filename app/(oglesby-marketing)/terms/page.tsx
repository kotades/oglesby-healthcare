import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from "@/lib/constants";
import { AlertCircle, CheckCircle2, FileText, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Engagement & Service | Oglesby Healthcare Consulting",
  description:
    "Master Terms of Engagement and Professional Advisory Service Agreement for medical practices and health systems.",
};

export default function TermsPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen py-20 px-6">
      <div className="max-w-[1000px] mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 lg:p-16 shadow-sm space-y-10">
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-widest">
            <Scale className="size-4 text-cyan-600" />
            Master Terms of Engagement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Advisory Services Agreement
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 1, 2026 &bull; Professional Advisory Services Governance
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">1. Scope of Healthcare Consulting Services</h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Oglesby Healthcare Consulting LLC provides healthcare practice management advisory, clinical
            workflow diagnostics, revenue cycle management (RCM) optimization, HIPAA audit defense
            preparation, and health informatics integration consulting. Advisory recommendations are delivered
            for operational optimization and do not substitute for formal legal representation or clinical
            medical treatment of patients.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            2. Business Associate Agreement (BAA) Requirement
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Prior to the disclosure of any Protected Health Information (PHI) by the Client Practice to
            Oglesby Healthcare, both parties must enter into a formal Business Associate Agreement (BAA)
            complying with 45 CFR § 164.504(e). In the event of any conflict between these Terms and the
            executed BAA with respect to PHI confidentiality, the BAA shall govern.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            3. Intellectual Property & Advisory Work Product
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            All proprietary analytical models, EHR auto-documentation templates, scrubber algorithms, and
            compliance frameworks developed by Oglesby Healthcare remain the exclusive intellectual property
            of Oglesby Healthcare. Clients receive a perpetual, non-exclusive, non-transferable license to
            utilize customized work products within their licensed clinical facilities.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            4. Professional Warranties & Limitation of Liability
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Oglesby Healthcare warrants that all advisory services shall be executed with the professional
            care, skill, and diligence customary among senior healthcare industry consultants. Total liability
            under any claim arising from an engagement shall be limited to the total consulting fees paid by
            the client practice in the twelve (12) months preceding the claim.
          </p>
        </section>

        {/* Contact Info */}
        <div className="pt-8 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Legal Inquiries & Contract Administration</h3>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            {COMPANY_NAME} &bull; General Counsel Office
            <br />
            {COMPANY_ADDRESS} &bull; Phone: {COMPANY_PHONE}
            <br />
            Email:{" "}
            <a
              href="mailto:legal@oglesbyhealthcare.com"
              className="text-cyan-700 font-semibold hover:underline">
              legal@oglesbyhealthcare.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
