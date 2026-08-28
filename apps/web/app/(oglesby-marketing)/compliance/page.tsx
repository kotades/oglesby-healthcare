import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle2,
  Database,
  Download,
  Eye,
  FileCheck,
  FileText,
  Key,
  Layers,
  Lock,
  Network,
  Scale,
  Server,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export default function CompliancePage() {
  const safeguards = [
    {
      category: "Administrative Safeguards",
      cfr: "45 CFR § 164.308",
      icon: Scale,
      items: [
        {
          name: "Security Management Process",
          desc: "Ongoing risk analysis and risk management procedures to identify vulnerabilities before exploitation.",
        },
        {
          name: "Assigned Security & Privacy Responsibility",
          desc: "Designated Chief Privacy Officer (CPO) and Chief Information Security Officer (CISO) governance.",
        },
        {
          name: "Workforce Security & Training",
          desc: "Mandatory bi-annual HIPAA/HITECH training, access authorization clearing, and termination procedures.",
        },
        {
          name: "Contingency & Disaster Recovery",
          desc: "Tested emergency mode operation plans, data backup protocols, and automated disaster recovery failover.",
        },
      ],
    },
    {
      category: "Physical Safeguards",
      cfr: "45 CFR § 164.310",
      icon: Server,
      items: [
        {
          name: "Facility Access Controls",
          desc: "Multi-factor biometric access controls and 24/7 video surveillance across all Tier-IV data centers.",
        },
        {
          name: "Workstation Security Policies",
          desc: "Auto-locking privacy screens, restricted endpoint access, and enforced clean-desk policies.",
        },
        {
          name: "Device & Media Controls",
          desc: "Strict cryptographic sanitization (NIST SP 800-88) for all media disposal and re-use protocols.",
        },
      ],
    },
    {
      category: "Technical Safeguards",
      cfr: "45 CFR § 164.312",
      icon: Lock,
      items: [
        {
          name: "Strict Data Isolation (kota-reuse)",
          desc: "All practice data, metadata, and consultation files operate under mandatory namespacing (`oglesby_healthcare/` root prefix) guaranteeing zero cross-tenant contamination.",
        },
        {
          name: "End-to-End Encryption",
          desc: "FIPS 140-2 validated AES-256 encryption for data at rest and mandatory TLS 1.3 with Perfect Forward Secrecy for data in transit.",
        },
        {
          name: "Role-Based Access Control (RBAC)",
          desc: "Granular least-privilege permissions enforced via cryptographic token validation and IAM policies.",
        },
        {
          name: "Immutable Audit Logging",
          desc: "Every data query, modification, and login event generates an immutable, tamper-evident audit record with millisecond timestamps.",
        },
      ],
    },
  ];

  const baaProtocols = [
    {
      title: "Direct BAA Execution",
      desc: "Oglesby Healthcare Consulting LLC executes comprehensive Business Associate Agreements directly with all client practices prior to reviewing any PHI.",
    },
    {
      title: "Sub-Processor Flow-Down",
      desc: "All underlying cloud infrastructure (Google Cloud, Firebase, AWS HealthLake) is governed by binding enterprise BAAs with strict HIPAA indemnification.",
    },
    {
      title: "Breach Notification SLA",
      desc: "Contractual commitment to investigate and report any potential security incidents within 24 hours, exceeding federal 60-day statutory windows.",
    },
    {
      title: "Right to Audit & Termination",
      desc: "Clients maintain full rights to request third-party security audit summaries and execute complete cryptographic data destruction upon contract conclusion.",
    },
  ];

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              HIPAA & Security Governance Architecture
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Institutional-Grade Compliance & <br className="hidden sm:inline" />
            <span className="text-emerald-700">Zero-Trust Data Governance</span>
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Oglesby Healthcare Consulting enforces institutional data security, zero-trust isolated pipelines,
            and comprehensive HIPAA Title II safeguard frameworks to protect patient data and immunize
            practices against federal OCR penalties.
          </p>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
            Technical Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Zero-Trust Data Isolation Standards
          </h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed">
            How we protect Protected Health Information (PHI) across client engagements and cloud
            integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-400">
              <Database className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Strict Multi-Tenant Namespacing</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Every database query and storage artifact is prefixed under{" "}
              <code className="bg-slate-100 text-cyan-800 px-1.5 py-0.5 rounded font-mono text-[11px]">
                oglesby_healthcare/
              </code>
              , preventing cross-tenant leakage.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400">
              <Key className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">FIPS 140-2 AES-256 Encryption</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              All stored clinical notes, audit logs, and practice records are encrypted at rest with hardware
              security module (HSM) managed keys and TLS 1.3 in transit.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400">
              <Eye className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tamper-Proof Audit Logging</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Every consultant session, document download, and configuration change is recorded in an
              immutable, time-synchronized log stream available for client review.
            </p>
          </div>
        </div>
      </section>

      {/* Safeguards Grid */}
      <section className="bg-white border-y border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              HIPAA Title II Security Rule
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Federal Safeguards Implementation Matrix
            </h2>
            <p className="text-slate-500 font-light text-xs sm:text-sm">
              Comprehensive alignment with HHS Office for Civil Rights (OCR) statutory requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safeguards.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{group.category}</h3>
                          <span className="text-[10px] font-mono text-slate-400">{group.cfr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      {group.items.map((item, iIdx) => (
                        <div key={iIdx} className="space-y-1">
                          <div className="flex items-start gap-2 text-xs font-bold text-slate-800">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item.name}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-light leading-relaxed pl-5.5">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BAA Governance Section */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-14 shadow-lg space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold uppercase tracking-widest">
              <FileCheck className="size-3.5" />
              Contractual Governance
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Business Associate Agreement (BAA) Protocols
            </h2>
            <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
              Under 45 CFR § 164.502(e) and § 164.504(e), we maintain legally binding Business Associate
              Agreements that guarantee full indemnification, data confidentiality, and regulatory alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800">
            {baaProtocols.map((protocol, idx) => (
              <div key={idx} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-2">
                <h4 className="text-sm font-bold text-emerald-400">{protocol.title}</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{protocol.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-light">
              Need a customized BAA for your multi-facility network?
            </span>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors">
              Request BAA Package
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
