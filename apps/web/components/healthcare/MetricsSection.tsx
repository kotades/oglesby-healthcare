"use client";

import { Award, Clock, ShieldCheck, TrendingUp } from "lucide-react";

export function MetricsSection() {
  const metrics = [
    {
      icon: TrendingUp,
      value: "$52M+",
      label: "Revenue Recovered",
      description: "Optimized RCM and claim dispute recovery across client health systems.",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      icon: ShieldCheck,
      value: "99.9%",
      label: "HIPAA Audit Rating",
      description: "Audit-proof compliance frameworks and data isolation protocols.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Clock,
      value: "38%",
      label: "Workflow Time Saved",
      description: "Reduction in clinical administrative overhead and booking friction.",
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      icon: Award,
      value: "180+",
      label: "Practices Transformed",
      description: "Medical groups and specialty clinics upgraded nationwide.",
      color: "text-cyan-700",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <section className="w-full bg-white py-20 border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">
            Empirical Results & Growth Metrics
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Proven Performance Across Modern Health Systems
          </h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed">
            Our data-driven strategies deliver quantifiable improvements in financial velocity, operational
            security, and provider satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-slate-50/50 border border-slate-200/80 hover:border-cyan-300 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`size-6 ${item.color}`} />
                  </div>
                  <div className="text-4xl font-black text-slate-900 tracking-tight mb-2">{item.value}</div>
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                    {item.label}
                  </div>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
