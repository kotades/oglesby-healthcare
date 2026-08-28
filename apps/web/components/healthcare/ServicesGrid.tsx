"use client";

import { Activity, ShieldCheck, Video, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "clinical-ops",
    title: "Clinical Operations",
    category: "Workflow & Efficiency",
    description: "Streamline patient scheduling, reduce wait times, and eliminate bottlenecking in clinical workflows.",
    icon: Activity,
    badge: "Operations",
    accent: "text-cyan-600 bg-cyan-50 border-cyan-100",
  },
  {
    id: "hipaa-compliance",
    title: "HIPAA & Auditing",
    category: "Regulatory Security",
    description: "Full HIPAA risk assessments, patient data protocol enforcement, and audit defense preparations.",
    icon: ShieldCheck,
    badge: "Compliance",
    accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    id: "telehealth-integration",
    title: "Virtual Infrastructure",
    category: "Digital Healthcare",
    description: "Integration of HIPAA-compliant video conferencing, online booking widgets, and automated notifications.",
    icon: Video,
    badge: "Telehealth",
    accent: "text-teal-600 bg-teal-50 border-teal-100",
  },
  {
    id: "revenue-cycle",
    title: "Revenue Cycle",
    category: "Practice Scaling",
    description: "Optimize medical billing accuracy, reduce claim denials, and accelerate patient reimbursement cycles.",
    icon: TrendingUp,
    badge: "Revenue",
    accent: "text-slate-700 bg-slate-100 border-slate-200",
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="relative w-full bg-white py-24 border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Core Competencies
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Comprehensive clinical consulting for <span className="text-cyan-700">modern healthcare.</span>
            </h2>
          </div>
          
          <Link
            href="/services"
            className="group flex h-10 items-center justify-center gap-2 rounded border border-cyan-600 bg-transparent px-6 text-[10px] font-bold uppercase tracking-[0.1em] text-cyan-700 transition-all hover:bg-cyan-50 focus:ring-2 focus:ring-cyan-600 whitespace-nowrap"
          >
            View All Services
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col p-8 rounded-lg bg-slate-50 border border-slate-200 hover:border-cyan-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-md border ${service.accent}`}>
                  <service.icon className="size-5" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  {service.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed flex-1 mb-8">
                {service.description}
              </p>

              <Link
                href={`/services#${service.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-cyan-700 hover:text-cyan-800 transition-colors"
              >
                Learn More
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
