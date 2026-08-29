import { EmbeddedBooker } from "@/components/healthcare/EmbeddedBooker";
import { FaqSection } from "@/components/healthcare/FaqSection";
import { MetricsSection } from "@/components/healthcare/MetricsSection";
import { OglesbyHero } from "@/components/healthcare/OglesbyHero";
import { ServicesGrid } from "@/components/healthcare/ServicesGrid";
import {
  Activity,
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  FileCheck,
  HeartPulse,
  Hospital,
  Lock,
  Minus,
  Network,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";

const sectors = [
  {
    icon: Hospital,
    title: "Hospitals & Health Systems",
    description:
      "Enterprise workflow orchestration, inpatient-to-outpatient transitions, cross-department scheduling sync, and multi-tier HIPAA governance.",
    kpis: ["34% lower patient wait times", "Cross-department EHR sync", "Enterprise BAA management"],
  },
  {
    icon: Building,
    title: "Ambulatory Surgical Centers",
    description:
      "OR schedule maximization, perioperative documentation streamlining, specialty billing capture, and sterile supply cycle audits.",
    kpis: ["99.1% clean claim rate", "18-min faster room turnover", "Automated pre-op clearances"],
  },
  {
    icon: Stethoscope,
    title: "Specialty Medical Practices",
    description:
      "Tailored for cardiology, orthopedics, neurology, oncology, and primary care groups seeking to eliminate administrative burnout and maximize provider capacity.",
    kpis: ["14 hrs reclaimed / MD / wk", "Denial rate cut from 12% to 1.8%", "Payor contract renegotiation"],
  },
  {
    icon: Video,
    title: "Telehealth & Digital Health",
    description:
      "HIPAA-grade video infrastructure, asynchronous intake pipelines, state-by-state clinician licensing compliance, and multi-EHR API connectivity.",
    kpis: ["100% end-to-end encryption", "Instant patient onboarding", "Zero cross-tenant data leakage"],
  },
];

const caseStudies = [
  {
    tag: "Revenue Cycle Overhaul",
    title: "Reclaiming $3.4M in Denied Surgical Claims for Regional Orthopedic Network",
    practice: "28-Provider Multi-Location Center",
    metric: "+$3.4M",
    metricLabel: "Recovered Revenue",
    summary:
      "Implemented algorithmic pre-authorization validation and corrected systemic cross-specialty billing code mismatches across 4 ambulatory surgical centers.",
    highlights: [
      "Clean claim rate elevated from 84.2% to 98.9%",
      "Average days in A/R reduced from 54 days to 28 days",
      "Zero interruption to daily patient surgical scheduling",
    ],
  },
  {
    tag: "Clinical Workflow & EHR",
    title: "Reclaiming 14 Hours Weekly Per Physician Across 12 Outpatient Clinics",
    practice: "Apex Multi-Specialty Medical Group",
    metric: "-38%",
    metricLabel: "Documentation Overhead",
    summary:
      "Restructured intake documentation templates, deployed automated triage routing, and optimized provider desktop workflows within Epic and AthenaHealth.",
    highlights: [
      "Patient check-in to exam room velocity improved by 41%",
      "Physician after-hours charting reduced by 72%",
      "Provider retention improved to 98% year-over-year",
    ],
  },
  {
    tag: "HIPAA & OCR Compliance Defense",
    title: "Zero-Deficiency OCR Audit Preparation for 140-Bed Hospital Network",
    practice: "Regional Healthcare Network",
    metric: "100%",
    metricLabel: "Safeguard Compliance",
    summary:
      "Conducted complete Administrative, Physical, and Technical Safeguards remediation, deployed immutable audit logging, and certified all third-party BAAs.",
    highlights: [
      "Full HIPAA Security Rule & HITECH gap remediation in 30 days",
      "Implemented strict tenant data isolation protocols",
      "Executive advisory representation during federal audit reviews",
    ],
  },
];

const comparisonPoints = [
  {
    feature: "Physician & Clinical Leadership",
    traditional: "Non-clinical MBAs and generalist analysts",
    oglesby: "Board-certified MDs, health attorneys & RCM fellows",
  },
  {
    feature: "HIPAA & Data Security",
    traditional: "Theoretical policy templates without technical enforcement",
    oglesby: "Zero-Trust technical isolation with immutable audit logs",
  },
  {
    feature: "Implementation Speed",
    traditional: "6 to 9-month heavy slide-deck consulting cycles",
    oglesby: "60-minute rapid audit with 4 to 12-week tactical sprints",
  },
  {
    feature: "EHR System Integration",
    traditional: "Surface-level advice without technical template rewrites",
    oglesby: "Direct workflow engineering for Epic, Cerner, Athena & NextGen",
  },
  {
    feature: "RCM Recovery Guarantee",
    traditional: "Hourly billing without quantifiable claim recovery metrics",
    oglesby: "Measured on clean claim rates (>98%) and cash-flow acceleration",
  },
];

const OglesbyPortalPage = () => {
  return (
    <main className="w-full bg-slate-50">
      <OglesbyHero />
      <MetricsSection />

      {/* Sectors Served Section */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100">
            <HeartPulse className="size-3.5 text-cyan-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">
              Clinical Specializations
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Targeted Advisory Across Healthcare Ecosystems
          </h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed">
            We understand the distinct regulatory pressures, billing codes, and operational complexities
            specific to each tier of modern healthcare delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{sector.title}</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-6">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Verified Outcomes
                  </span>
                  {sector.kpis.map((kpi, kIdx) => (
                    <div key={kIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ServicesGrid />

      {/* Case Studies Spotlight */}
      <section className="bg-white py-24 border-y border-slate-200 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                <FileCheck className="size-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  Transformation Track Record
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Quantifiable Impact in Clinical Settings
              </h2>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Explore how our multi-disciplinary advisory team eliminated administrative bottlenecks,
                secured regulatory compliance, and unlocked rapid revenue recovery.
              </p>
            </div>

            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
              Explore All Case Studies
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between hover:border-cyan-200 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-100 text-cyan-800 border border-cyan-200">
                      {cs.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{cs.practice}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4 leading-snug">{cs.title}</h3>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        {cs.metricLabel}
                      </span>
                      <span className="text-2xl font-black text-cyan-700">{cs.metric}</span>
                    </div>
                    <div className="size-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <TrendingUp className="size-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">{cs.summary}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  {cs.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <Check className="size-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparative Advantage Matrix */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">
            Why Healthcare Leaders Choose Oglesby
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Active Clinical Engineering vs. Traditional Consulting
          </h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed">
            Unlike generic management firms, our consultants are board-certified clinicians, healthcare
            attorneys, and health informatics architects who execute solutions rather than deliver static
            reports.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-900 text-white p-6 font-bold text-xs uppercase tracking-wider">
            <div className="md:col-span-4">Strategic Dimension</div>
            <div className="md:col-span-4 text-slate-400">Traditional Consulting Firms</div>
            <div className="md:col-span-4 text-cyan-400">Oglesby Healthcare Advisory</div>
          </div>

          <div className="divide-y divide-slate-100">
            {comparisonPoints.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-6 gap-4 text-xs items-center hover:bg-slate-50/70 transition-colors">
                <div className="md:col-span-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="size-2 rounded-full bg-cyan-600" />
                  {row.feature}
                </div>
                <div className="md:col-span-4 text-slate-500 font-light pl-4 border-l md:border-l-0 border-slate-100">
                  <span className="md:hidden font-bold text-slate-400 block mb-1">Traditional:</span>
                  {row.traditional}
                </div>
                <div className="md:col-span-4 text-cyan-900 font-semibold bg-cyan-50/60 p-3 rounded-lg border border-cyan-100">
                  <span className="md:hidden font-bold text-cyan-700 block mb-1">Oglesby:</span>
                  {row.oglesby}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmbeddedBooker />
      <FaqSection />
    </main>
  );
};

export default OglesbyPortalPage;
