import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Cpu,
  Database,
  FileCheck,
  FileSpreadsheet,
  HeartPulse,
  Layers,
  Lock,
  Network,
  Scale,
  Server,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "clinical-ops",
      title: "Clinical Workflow & Capacity Optimization",
      subtitle: "Eliminate bottleneck friction, reduce patient wait times, and enhance provider throughput.",
      icon: Stethoscope,
      tag: "Operations",
      target: "Ambulatory Clinics, Surgical Centers, Multi-Specialty Groups",
      kpi: "38% avg reduction in administrative documentation time",
      scope:
        "We restructure clinical scheduling grids, patient triage pathways, and exam room turnovers to maximize physician capacity without adding staff.",
      deliverables: [
        "Patient Intake & Triage Streamlining Protocols",
        "EHR Auto-Documentation Template Customization",
        "Provider Wait-Time & Exam Room Turnover Reduction",
        "Cross-Department Clinical Communication Frameworks",
      ],
      platforms: ["Epic", "AthenaHealth", "Cerner Oracle", "NextGen"],
    },
    {
      id: "hipaa-compliance",
      title: "HIPAA, HITECH & OCR Regulatory Defense",
      subtitle: "Institutional-grade privacy safeguards, technical isolation, and federal audit readiness.",
      icon: ShieldCheck,
      tag: "Compliance",
      target: "Health Systems, Telehealth Providers, Specialty Practices",
      kpi: "100% OCR audit defense readiness with zero-trust logging",
      scope:
        "Comprehensive gap assessments across federal Administrative, Physical, and Technical Safeguards under 45 CFR Part 160/164.",
      deliverables: [
        "Full-Spectrum HIPAA Privacy & Security Gap Analysis",
        "Business Associate Agreement (BAA) Audits & Repository",
        "Staff Compliance Training & Role-Based Access Enforcement",
        "Corrective Action Plan (CAP) Implementation & Legal Defensibility",
      ],
      platforms: ["Zero-Trust Firebase", "AWS HealthLake", "Google Cloud Healthcare"],
    },
    {
      id: "revenue-cycle",
      title: "Revenue Cycle Management (RCM) & Clean Claim Engineering",
      subtitle: "Maximize claim acceptance rates, eliminate denials, and accelerate cash flow velocity.",
      icon: TrendingUp,
      tag: "Finance",
      target: "High-Volume Specialty Networks & Outpatient Centers",
      kpi: "98.8% clean claim rate & 26-day average A/R reduction",
      scope:
        "End-to-end RCM diagnostics targeting pre-authorization accuracy, specialty coding compliance, denial appeals, and payer contract negotiations.",
      deliverables: [
        "Clean Claim Submission Rate Optimization (>98%)",
        "Automated Pre-Authorization Validation Pipelines",
        "Denial Root-Cause Analysis & Rapid Appeal Playbooks",
        "Commercial Payer Fee Schedule & Contract Renegotiation",
      ],
      platforms: ["Waystar", "Availity", "Change Healthcare", "Kareo"],
    },
    {
      id: "telehealth-integration",
      title: "Telehealth & Clinical Systems Interoperability",
      subtitle: "Modernize virtual care delivery, remote monitoring, and multi-EHR data synchronization.",
      icon: Video,
      tag: "Technology",
      target: "Digital Health Platforms, Hybrid Care Clinics, Remote Networks",
      kpi: "Sub-second sync with zero cross-tenant data contamination",
      scope:
        "Architecting HIPAA-compliant video consultation platforms, asynchronous intake queues, and bi-directional EHR scheduling APIs.",
      deliverables: [
        "Encrypted Video Consultation Platform Architecture",
        "Remote Patient Monitoring (RPM) Workflow Integration",
        "Bi-Directional EHR Data Synchronization via FHIR / HL7",
        "Automated Patient Appointment Reminders & Intake Flow",
      ],
      platforms: ["Epic MyChart", "Twilio HIPAA Video", "AthenaNet API", "HL7/FHIR"],
    },
    {
      id: "executive-advisory",
      title: "Executive Healthcare Advisory & Practice Valuation",
      subtitle:
        "Strategic leadership support for growing medical practices, mergers, and multi-site scaling.",
      icon: Building2,
      tag: "Executive",
      target: "Physician Founders, Health System Boards, Private Equity Groups",
      kpi: "$2.4M avg enterprise valuation expansion post-restructuring",
      scope:
        "Providing strategic governance, financial capital allocation, physician partner equity onboarding, and operational M&A due diligence.",
      deliverables: [
        "Practice Expansion & Multi-Site Scaling Roadmaps",
        "Physician Partner Onboarding & Compensation Models",
        "Operational Budgeting, Capital Allocation & Unit Economics",
        "Mergers & Acquisitions (M&A) Operational Due Diligence",
      ],
      platforms: ["Executive KPI Dashboards", "Financial Modeling Suites"],
    },
    {
      id: "payer-contracting",
      title: "Payer Contracting & Credentialing Modernization",
      subtitle: "Expedite provider credentialing and secure competitive reimbursement fee schedules.",
      icon: FileSpreadsheet,
      tag: "Reimbursement",
      target: "New Practice Launches, Expanding Groups, Multi-Provider Networks",
      kpi: "60-day faster provider onboarding & 14% higher reimbursement rates",
      scope:
        "Auditing existing commercial payer contracts, identifying rate disparities, and managing CAQH credentialing pipelines with major health plans.",
      deliverables: [
        "Commercial & Managed Medicaid Contract Analysis",
        "Market Reimbursement Benchmark Comparisons",
        "Automated CAQH & State License Credentialing Tracking",
        "Direct Value-Based Care Incentive Structuring",
      ],
      platforms: ["CAQH ProView", "Availity Payer Portal", "CMS NPPES"],
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
              Clinical & Financial Advisory
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Advisory Solutions for <br className="hidden sm:inline" />
            <span className="text-cyan-700">Modern Healthcare Delivery</span>
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            From clinical workflow restructuring and EHR optimization to zero-trust HIPAA compliance and
            revenue cycle acceleration, our senior advisory board transforms clinical operations into
            high-velocity institutions.
          </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service) => {
            const Icon = service.icon;
            return (
              <div
                id={service.id}
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between scroll-mt-24">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
                      <Icon className="size-6 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-50 text-cyan-700 border border-cyan-100">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-500 font-light mb-4 leading-relaxed">{service.subtitle}</p>

                  {/* Highlight Metric */}
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 mb-6">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Target Outcome
                    </span>
                    <p className="text-xs font-bold text-cyan-800">{service.kpi}</p>
                  </div>

                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">{service.scope}</p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Core Deliverables
                    </span>
                    {service.deliverables.map((deliverable, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="size-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{deliverable}</span>
                      </div>
                    ))}
                  </div>

                  {/* Platforms */}
                  <div className="mb-8">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Systems & Integration
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.platforms.map((plat, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/#booker"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm">
                  Schedule {service.tag} Audit
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
              Engagement Architecture
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Flexible Partnership Models</h2>
            <p className="text-slate-400 text-xs font-light">
              Structured to align with the specific operational scale and urgency of your medical group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-slate-800/70 border border-slate-700 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Model 01</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    RAPID DIAGNOSTIC
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">60-Minute Operations Audit</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  Targeted initial diagnostic covering scheduling bottlenecks, billing denial root causes, and
                  HIPAA access security policies. Delivers an immediate priority action report.
                </p>
              </div>
              <Link
                href="/#booker"
                className="w-full py-2.5 rounded bg-cyan-600 text-white text-xs font-bold uppercase tracking-wider text-center block hover:bg-cyan-500 transition-colors">
                Book 60-Min Audit
              </Link>
            </div>

            <div className="p-8 rounded-xl bg-slate-800/70 border border-cyan-500/50 relative space-y-4 flex flex-col justify-between shadow-lg shadow-cyan-950">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    Model 02
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    MOST POPULAR
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">Tactical 8-Week Transformation</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  Hands-on restructuring of intake workflows, EHR template rewrites, clean claim scrubber
                  deployments, and complete staff HIPAA compliance certification.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-wider text-center block hover:bg-white transition-colors">
                Inquire for Practice
              </Link>
            </div>

            <div className="p-8 rounded-xl bg-slate-800/70 border border-slate-700 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Model 03</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                    ENTERPRISE
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">Executive Advisory Retainer</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  Continuous CMO/COO-level strategic advisory, monthly RCM velocity auditing, quarterly OCR
                  compliance simulations, and commercial payer contract support.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded bg-slate-800 text-cyan-400 border border-cyan-700/50 text-xs font-bold uppercase tracking-wider text-center block hover:bg-slate-700 transition-colors">
                Discuss Retainer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
