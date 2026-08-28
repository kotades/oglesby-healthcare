import { ArrowRight, Award, Building2, CheckCircle2, Compass, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const pillars = [
    {
      title: "Data-Driven Precision",
      description:
        "We don't guess. Every operational recommendation is backed by real-time practice metrics and financial benchmarking.",
      icon: Target,
    },
    {
      title: "Uncompromising Compliance",
      description:
        "HIPAA and regulatory security are integrated into every workflow, safeguarding patient trust and practice immunity.",
      icon: ShieldCheck,
    },
    {
      title: "Provider-Centric Design",
      description:
        "Our solutions reduce administrative burnout so physicians and clinical teams can focus on patient outcomes.",
      icon: Compass,
    },
  ];

  const methodology = [
    { step: "01", name: "Diagnose", desc: "60-minute comprehensive operational and financial audit." },
    { step: "02", name: "Architect", desc: "Custom workflow, compliance, and RCM roadmap design." },
    { step: "03", name: "Implement", desc: "Seamless deployment with zero disruption to active care." },
    { step: "04", name: "Scale", desc: "Quarterly review, optimization, and practice growth." },
  ];

  return (
    <main className="w-full bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
            <Building2 className="size-4 text-cyan-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
              About Oglesby Healthcare Consulting LLC
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Architecting the Future of Healthcare Delivery
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Founded by clinical leaders and health system strategists, Oglesby Healthcare Consulting bridges
            the gap between clinical excellence and commercial efficiency.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodology Timeline */}
      <section className="bg-white border-y border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
              Our Proven Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              The 4-Phase Transformation Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {methodology.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 relative space-y-3">
                <span className="text-3xl font-black text-cyan-600/30">{m.step}</span>
                <h4 className="text-lg font-bold text-slate-900">{m.name}</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
