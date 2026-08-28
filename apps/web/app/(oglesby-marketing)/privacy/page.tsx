import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from "@calcom/lib/constants";
import { CheckCircle2, FileText, Lock, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "HIPAA Notice of Privacy Practices | Oglesby Healthcare Consulting",
  description:
    "Comprehensive HIPAA Notice of Privacy Practices, data protection protocols, and PHI confidentiality standards.",
};

export default function PrivacyPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen py-20 px-6">
      <div className="max-w-[1000px] mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 lg:p-16 shadow-sm space-y-10">
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="size-4 text-emerald-600" />
            HIPAA Notice of Privacy Practices (NPP)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy & Health Information Governance
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 1, 2026 &bull; Compliant with 45 CFR Part 160 and Part 164 (HIPAA/HITECH)
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="size-5 text-cyan-600" />
            1. Our Commitment to Patient Privacy & PHI Protection
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Oglesby Healthcare Consulting LLC (&ldquo;Oglesby Healthcare,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates as a specialized Healthcare Business Associate
            and advisory consultancy. We are bound by federal law under the Health Insurance Portability and
            Accountability Act of 1996 (&ldquo;HIPAA&rdquo;), the Health Information Technology for Economic
            and Clinical Health Act (&ldquo;HITECH&rdquo;), and the Omnibus Rule of 2013 to maintain the
            strict privacy and security of all Protected Health Information (&ldquo;PHI&rdquo;) entrusted to
            us by Covered Entities.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="size-5 text-cyan-600" />
            2. Permitted Uses & Disclosures of Health Data
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            We only collect, access, and process PHI strictly necessary to fulfill our contractual healthcare
            operational advisory services under an executed Business Associate Agreement (BAA). Permitted uses
            include:
          </p>
          <ul className="space-y-2 text-xs text-slate-600 font-light pl-4 list-disc">
            <li>
              <strong>Clinical Workflow & Operations Diagnostics:</strong> Reviewing scheduling queues, triage
              logs, and provider exam room turnover metrics.
            </li>
            <li>
              <strong>Revenue Cycle Auditing:</strong> Reviewing de-identified or authorized billing claim
              submissions, denial reason codes, and payment remittances.
            </li>
            <li>
              <strong>Compliance & OCR Audit Defense:</strong> Evaluating EHR security configurations,
              role-based access logs, and Business Associate chain of custody.
            </li>
            <li>
              <strong>Required by Law:</strong> Disclosures mandated by federal court orders, HHS OCR
              investigations, or statutory state reporting.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="size-5 text-cyan-600" />
            3. Technical, Physical & Administrative Safeguards
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            To satisfy 45 CFR § 164.312, all digital infrastructure deployed by Oglesby Healthcare adheres to
            strict Zero-Trust isolation standards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800">Strict Namespace Isolation</h4>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                All client database records operate under isolated prefixes (
                <code className="text-cyan-700">oglesby_healthcare/</code>) preventing multi-tenant data
                contamination.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800">AES-256 & TLS 1.3 Encryption</h4>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                FIPS 140-2 validated cryptographic standards applied to all data in transit and at rest with
                automated key rotation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-cyan-600" />
            4. Client & Patient Privacy Rights
          </h2>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Covered entities partnering with Oglesby Healthcare maintain the right to inspect all audit logs,
            request accounting of disclosures, mandate immediate cryptographic destruction of consultative
            files upon engagement termination, and inspect our third-party SOC 2 Type II audit attestations.
          </p>
        </section>

        {/* Contact Info */}
        <div className="pt-8 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Privacy Officer Contact Information</h3>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            For privacy inquiries, BAA requests, or security audit coordination:
            <br />
            <strong>Chief Privacy Officer</strong> &bull; {COMPANY_NAME}
            <br />
            {COMPANY_ADDRESS} &bull; Phone: {COMPANY_PHONE}
            <br />
            Email:{" "}
            <a
              href="mailto:privacy@oglesbyhealthcare.com"
              className="text-cyan-700 font-semibold hover:underline">
              privacy@oglesbyhealthcare.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
