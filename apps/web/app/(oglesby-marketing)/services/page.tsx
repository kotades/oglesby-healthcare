import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Clinical Workflow Optimization",
      subtitle: "Eliminate bottleneck friction and enhance provider throughput.",
      icon: Stethoscope,
      benefits: [
        "Patient Intake & Triage Streamlining",
        "EHR Template Customization & Auto-Documentation",
        "Provider Wait-Time Reduction Strategy",
        "Cross-Department Communication Frameworks",
      ],
      tag: "Operations",
    },
    {
      title: "HIPAA & Regulatory Compliance Audits",
      subtitle: "Full-spectrum risk assessments for peace of mind.",
      icon: ShieldCheck,
      benefits: [
        "Comprehensive HIPAA Privacy & Security Gap Analysis",
        "Business Associate Agreement (BAA) Audits",
        "Staff Compliance Training & Certification Tracking",
        "Corrective Action Plan (CAP) Implementation",
      ],
      tag: "Security",
    },
    {
      title: "Revenue Cycle Management (RCM)",
      subtitle: "Maximize claim acceptance rates and accelerate cash flow.",
      icon: TrendingUp,
      benefits: [
        "Clean Claim Submission Rate Optimization (>98%)",
        "Denial Analysis & Appeal Management",
        "Patient Billing Transparency & Payment Portals",
        "Fee Schedule & Payor Contract Negotiation",
      ],
      tag: "Finance",
    },
    {
      title: "Telehealth & Systems Integration",
      subtitle: "Modernize virtual care delivery and platform interoperability.",
      icon: Activity,
      benefits: [
        "Secure Video Consultation Platform Setup",
        "Remote Patient Monitoring (RPM) Workflow Design",
        "Multi-EHR Data Synchronization",
        "Custom Scheduling Engine Integration",
      ],
      tag: "Technology",
    },
    {
      title: "Executive Healthcare Advisory",
      subtitle: "Strategic leadership support for growing medical practices.",
      icon: Building2,
      benefits: [
        "Practice Expansion & Multi-Site Scaling",
        "Physician Partner Onboarding Protocols",
        "Operational Budgeting & Capital Allocation",
        "Mergers & Acquisition (M&A) Operational Due Diligence",
      ],
      tag: "Executive",
    },
  ];

  return (
    <main className="w-full bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
            <Activity className="size-4 text-cyan-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
              End-to-End Practice Transformation
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Specialized Healthcare Consulting Services
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            From clinical workflow restructuring to HIPAA-grade compliance and revenue cycle optimization, our
            expert advisory teams ensure your practice operates at peak efficiency.
          </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                      <Icon className="size-6 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-50 text-cyan-700 border border-cyan-100">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-500 font-light mb-6 leading-relaxed">{service.subtitle}</p>

                  <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="size-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/#booker"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
                  Book Consultation
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engagement Models Banner */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Flexible Partnership Models
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Tailored to Your Organizational Needs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-slate-800/60 border border-slate-700 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Phase 1</span>
              <h4 className="text-xl font-bold">60-Minute Rapid Audit</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Initial deep-dive into your operational data, claim denial bottlenecks, and system compliance
                status.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-slate-800/60 border border-slate-700 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Phase 2</span>
              <h4 className="text-xl font-bold">Project-Based Transformation</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Focused 4-to-12 week implementations designed to overhaul specific workflows, RCM pipelines,
                or EHR systems.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-slate-800/60 border border-slate-700 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Phase 3</span>
              <h4 className="text-xl font-bold">Executive Retainer</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Ongoing advisory support, quarterly compliance audits, and continuous billing performance
                monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
