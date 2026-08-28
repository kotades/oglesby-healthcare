import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Compass,
  FileCheck,
  HeartPulse,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const pillars = [
    {
      title: "Data-Driven Clinical Precision",
      description:
        "Every operational recommendation is engineered from empirical practice analytics, EHR log diagnostics, and payor reimbursement benchmarks.",
      icon: Target,
      highlight: "Evidence-Based Action",
    },
    {
      title: "Uncompromising Zero-Trust Compliance",
      description:
        "HIPAA Title II, HITECH, and OCR regulatory safeguards are baked directly into practice workflows, ensuring total legal defense and patient trust.",
      icon: ShieldCheck,
      highlight: "Audit-Proof Governance",
    },
    {
      title: "Provider-Centric Workflow Design",
      description:
        "We eliminate documentation debt and EHR friction, returning up to 14 hours weekly per clinician to focus on patient outcomes and well-being.",
      icon: Compass,
      highlight: "Burnout Elimination",
    },
    {
      title: "Financial Acceleration & RCM Health",
      description:
        "Transforming broken claim pipelines with algorithmic pre-authorization and clean claim protocols that push recovery rates past 98.5%.",
      icon: TrendingUp,
      highlight: "Sustainable Growth",
    },
  ];

  const methodology = [
    {
      step: "01",
      name: "Rapid Diagnostic Audit",
      timeline: "Week 1",
      desc: "Comprehensive 60-minute evaluation of EHR data, claim denial rates, HIPAA access policies, and clinical scheduling bottlenecks.",
    },
    {
      step: "02",
      name: "Architectural Blueprint",
      timeline: "Weeks 2-3",
      desc: "Customized technical and operational roadmap detailing EHR auto-templates, BAA updates, and RCM claim scrubber configurations.",
    },
    {
      step: "03",
      name: "Targeted Implementation",
      timeline: "Weeks 4-8",
      desc: "Seamless hands-on deployment with clinical staff training, automated test claim submissions, and zero disruption to active care.",
    },
    {
      step: "04",
      name: "Continuous Scaling & Defense",
      timeline: "Quarterly Ongoing",
      desc: "Quarterly compliance reviews, OCR audit simulations, payor contract renegotiations, and executive advisory briefings.",
    },
  ];

  const councilSpecialties = [
    {
      role: "Clinical Governance & Medical Direction",
      lead: "Board-Certified MDs & DNPs",
      focus: "Ambulatory workflow, inpatient transition, clinical protocol standardization",
    },
    {
      role: "Healthcare Law & Regulatory Defense",
      lead: "Healthcare Attorneys (JD, CHPS)",
      focus: "HIPAA Security Rule, OCR federal audits, Business Associate Agreement architecture",
    },
    {
      role: "Revenue Cycle & Payor Analytics",
      lead: "HFMA Fellows & Certified Coders (CPC)",
      focus: "Claim denial recovery, specialty fee schedule optimization, CMS billing compliance",
    },
    {
      role: "Health Informatics & EHR Engineering",
      lead: "Clinical Systems Architects",
      focus: "Epic, Cerner, AthenaHealth API sync, video telehealth infrastructure, FHIR integration",
    },
  ];

  const accreditations = [
    { label: "HIPAA & HITECH Compliant", desc: "Institutional Safeguards Alignment" },
    { label: "AAPC Certified Coders", desc: "Outpatient & Surgical Expertise" },
    { label: "AHIMA Aligned Protocols", desc: "Health Information Integrity" },
    { label: "HFMA Fellowship Leadership", desc: "Healthcare Financial Management" },
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
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bridging Clinical Excellence & <br className="hidden sm:inline" />
            <span className="text-cyan-700">Institutional Operational Power</span>
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Founded by veteran clinical leaders, healthcare attorneys, and health system strategists, Oglesby
            Healthcare Consulting engineers resilient medical practices that thrive under modern regulatory
            and financial pressures.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="size-3 text-cyan-600" />
              Our Foundational Mission
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Eliminating the Administrative Tax on Modern Medicine
            </h2>
            <p className="text-slate-600 font-light text-sm leading-relaxed">
              Every day, physicians and clinical teams spend up to 40% of their working hours navigating
              cumbersome EHR documentation, appealing wrongful claim denials, and managing fractured
              compliance protocols.
            </p>
            <p className="text-slate-600 font-light text-sm leading-relaxed">
              Oglesby Healthcare Consulting was founded to eradicate this friction. We build high-throughput,
              HIPAA-secure operational ecosystems that allow clinicians to focus on what matters most:
              delivering world-class patient care without administrative burnout or revenue leakage.
            </p>
            <div className="pt-4 flex flex-wrap gap-6">
              <div className="border-l-2 border-cyan-600 pl-4">
                <div className="text-2xl font-black text-slate-900">180+</div>
                <div className="text-xs text-slate-500 font-medium">Practices Transformed</div>
              </div>
              <div className="border-l-2 border-emerald-600 pl-4">
                <div className="text-2xl font-black text-slate-900">$52M+</div>
                <div className="text-xs text-slate-500 font-medium">Claim Revenue Recovered</div>
              </div>
              <div className="border-l-2 border-teal-600 pl-4">
                <div className="text-2xl font-black text-slate-900">99.9%</div>
                <div className="text-xs text-slate-500 font-medium">Audit Pass Rating</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Executive Advisory Guarantees
            </h3>
            <ul className="space-y-4 text-xs text-slate-600 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800 font-semibold block mb-0.5">
                    Physician-Led Engagements:
                  </strong>
                  Every clinical audit is spearheaded by board-certified physicians who understand clinic
                  reality.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800 font-semibold block mb-0.5">Zero Care Disruption:</strong>
                  All operational and EHR enhancements are staged and verified without interrupting daily
                  patient schedules.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800 font-semibold block mb-0.5">
                    Defensible Regulatory Shield:
                  </strong>
                  Complete alignment with HHS OCR guidelines, strict BAA governance, and isolated data
                  architectures.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="bg-white border-y border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              The 4 Pillars of Operational Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 block mb-2">
                      {pillar.highlight}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multidisciplinary Council */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100">
            <Users className="size-3.5 text-cyan-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">
              Multidisciplinary Expertise
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Collaborative Advisory Council Structure
          </h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed">
            Healthcare problems cannot be solved in silos. Our transformation roadmaps are co-authored by
            specialists across medicine, law, revenue cycle, and health technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {councilSpecialties.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  {item.lead}
                </span>
                <Scale className="size-4 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 pt-2">{item.role}</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">{item.focus}</p>
            </div>
          ))}
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
            <p className="text-slate-500 text-xs font-light">
              Structured for rapid diagnostic clarity, seamless deployment, and continuous risk defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 relative space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-cyan-600/40">{m.step}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 px-2 py-0.5 rounded bg-cyan-100/50">
                      {m.timeline}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{m.name}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Bar */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {accreditations.map((acc, idx) => (
              <div key={idx} className={`${idx !== 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""} space-y-2`}>
                <Award className="size-6 text-cyan-400 mb-2" />
                <h4 className="text-sm font-bold">{acc.label}</h4>
                <p className="text-xs text-slate-400 font-light">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#booker"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm">
            <Calendar className="size-4 text-cyan-400" />
            Schedule an Executive Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
