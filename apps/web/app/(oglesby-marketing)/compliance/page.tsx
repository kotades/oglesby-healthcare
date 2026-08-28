import { CheckCircle2, FileText, Key, Lock, Server, ShieldCheck } from "lucide-react";

export default function CompliancePage() {
  const securityFeatures = [
    {
      title: "Strict Data Isolation (kota-reuse)",
      description:
        "All client data, user profiles, and audit documents operate under mandatory namespacing (`oglesby_healthcare/` root prefix) guaranteeing zero cross-tenant contamination.",
      icon: Server,
    },
    {
      title: "HIPAA & HITECH Compliance",
      description:
        "Complete alignment with federal Administrative, Physical, and Technical Safeguards for Protected Health Information (PHI).",
      icon: ShieldCheck,
    },
    {
      title: "Business Associate Agreements (BAA)",
      description:
        "Standard executed BAAs across all sub-processors, cloud hosting infrastructure, and third-party API providers.",
      icon: FileText,
    },
    {
      title: "End-to-End Encryption Standards",
      description:
        "AES-256 encryption at rest for all database records and storage buckets, with mandatory TLS 1.3 encryption in transit.",
      icon: Key,
    },
  ];

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              HIPAA & Security Governance
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Security Architecture & Compliance Guarantee
          </h1>
          <p className="text-slate-500 font-light text-sm max-w-2xl mx-auto">
            Oglesby Healthcare Consulting enforces institutional-grade data security and privacy controls
            across all operational integrations.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Verification Summary */}
        <div className="mt-16 bg-white rounded-xl border border-slate-200 p-8 lg:p-12 shadow-sm space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
            Compliance Protocols & Safeguards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 font-light">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Automated Audit Logging</span>
              </div>
              <p>
                Every access event, data query, and system interaction is logged with immutable timestamps.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Role-Based Access Control (RBAC)</span>
              </div>
              <p>
                Strict principle of least privilege governs all internal consultant access to practice
                metadata.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
