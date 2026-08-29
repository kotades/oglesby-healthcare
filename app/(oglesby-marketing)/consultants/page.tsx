import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileCheck,
  Mail,
  Scale,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ConsultantsPage() {
  const consultants = [
    {
      name: "Dr. Marcus Oglesby, MD, MBA",
      role: "Founder & Chief Medical Officer",
      specialty: "Clinical Operations & Health System Strategy",
      bio: "20+ years leading clinical transformations and ambulatory care restructuring. Former Chief of Staff at Regional Health System. Pioneer in clinician documentation burnout reduction and inpatient-outpatient transitions.",
      credentials: ["MD - Johns Hopkins", "MBA - Wharton", "Board Certified Internal Medicine", "AMA Member"],
      focusAreas: [
        "Clinical capacity planning",
        "EHR auto-template design",
        "Physician leadership alignment",
        "Ambulatory throughput acceleration",
      ],
      initial: "O",
    },
    {
      name: "Elena Vance, MHA, CPC",
      role: "Managing Director, Revenue Cycle Management",
      specialty: "RCM Optimization & Claims Recovery",
      bio: "Expert in commercial payor contract negotiations, denial recovery protocols, and outpatient billing automation. Recovered over $45M in wrongfully denied claims across 60+ surgical centers.",
      credentials: ["MHA - Cornell", "Certified Professional Coder (CPC)", "HFMA Certified Fellow (FHFMA)"],
      focusAreas: [
        "Claim denial root-cause analysis",
        "Clean claim scrubbers (>98.5%)",
        "Commercial fee schedule negotiation",
        "A/R cycle day reduction",
      ],
      initial: "V",
    },
    {
      name: "Robert Chen, JD, CHPS",
      role: "Director of Healthcare Compliance & Privacy",
      specialty: "HIPAA Security, HITECH & OCR Regulatory Defense",
      bio: "Former healthcare regulatory counsel specializing in federal privacy law, HHS OCR audit preparation, Business Associate Agreement (BAA) architectures, and cybersecurity risk remediation.",
      credentials: [
        "JD - Georgetown Law",
        "Certified in Healthcare Privacy and Security (CHPS)",
        "AHIMA Member",
      ],
      focusAreas: [
        "OCR audit defense readiness",
        "Multi-tier BAA governance",
        "Zero-trust tenant data isolation",
        "HIPAA Title II risk assessment",
      ],
      initial: "C",
    },
    {
      name: "Dr. Sarah Jenkins, DNP, RN",
      role: "Senior Director of Clinical Telehealth Systems",
      specialty: "EHR Integration & Digital Health Workflows",
      bio: "Pioneered virtual care workflows and remote patient monitoring across multi-site primary care networks. Specializes in bi-directional EHR scheduling and clinician burnout mitigation.",
      credentials: [
        "DNP - Vanderbilt University",
        "Healthcare Informatics Specialist",
        "American Nurses Association",
      ],
      focusAreas: [
        "HIPAA video consult integration",
        "Remote patient monitoring (RPM)",
        "Asynchronous intake queues",
        "Cross-EHR clinical sync",
      ],
      initial: "J",
    },
    {
      name: "Michael Sterling, FACHE, MBA",
      role: "Principal, Healthcare M&A & Valuation",
      specialty: "Ambulatory M&A, Due Diligence & Practice Valuation",
      bio: "18+ years directing healthcare acquisitions, physician group rollups, and hospital joint ventures. Advised on over $300M in transaction value across private surgical groups.",
      credentials: [
        "MBA - Northwestern Kellogg",
        "Fellow, American College of Healthcare Executives (FACHE)",
      ],
      focusAreas: [
        "Physician partner equity models",
        "Operational due diligence",
        "Practice valuation audits",
        "Multi-site capital expansion",
      ],
      initial: "S",
    },
    {
      name: "Priya Sharma, MS, RHIA",
      role: "Lead Health Informatics Architect",
      specialty: "EHR Interoperability, FHIR & Data Pipelines",
      bio: "Architect of enterprise interoperability pipelines connecting Epic, Cerner, and AthenaHealth with modern telehealth tools. Expert in FHIR API standards and automated reporting.",
      credentials: ["MS Health Informatics - Columbia", "Registered Health Information Administrator (RHIA)"],
      focusAreas: [
        "Epic MyChart & Athena APIs",
        "FHIR & HL7 bi-directional sync",
        "Automated clinical quality reporting",
        "Audit log immutability",
      ],
      initial: "S",
    },
  ];

  return (
    <main className="w-full bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
            <Users className="size-4 text-cyan-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
              Senior Leadership & Advisory Board
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Distinguished Clinical & <br className="hidden sm:inline" />
            <span className="text-cyan-700">Operational Authorities</span>
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Our multidisciplinary leadership unites veteran medical doctors, healthcare attorneys, RCM
            fellows, and health informatics architects to solve high-stakes challenges for modern practices.
          </p>
        </div>
      </section>

      {/* Consultants Grid */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700 block mb-1">
                      {person.specialty}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-snug">{person.name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{person.role}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
                    {person.initial}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">{person.bio}</p>

                {/* Focus Areas */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Specialized Advisory Focus
                  </span>
                  <div className="space-y-1.5">
                    {person.focusAreas.map((area, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="size-3 text-cyan-600 shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Accreditations & Degrees
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.credentials.map((cred, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/#booker"
                className="flex items-center justify-center gap-2 w-full py-3 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm">
                <Calendar className="size-3.5 text-cyan-400" />
                Book Session with {person.name.split(" ")[1]}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Peer Review Standards */}
      <section className="bg-white border-t border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-8 lg:p-14 shadow-lg">
            <div className="max-w-3xl space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/50 border border-cyan-700 text-cyan-300 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="size-3.5" />
                Institutional Quality Governance
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">The Oglesby Dual-Review Standard</h2>
              <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
                To guarantee bulletproof clinical defensibility and operational accuracy, no audit report or
                workflow restructuring blueprint is ever finalized without dual sign-off from both a
                Board-Certified Physician and a Healthcare Regulatory Compliance Officer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <Stethoscope className="size-4" />
                  <span>Clinical Efficacy Review</span>
                </div>
                <p className="text-slate-400 font-light">
                  Ensures workflows never compromise physician judgment, patient safety, or care quality.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Scale className="size-4" />
                  <span>Regulatory Legal Defense</span>
                </div>
                <p className="text-slate-400 font-light">
                  Validates strict compliance with HHS OCR, HIPAA Security Rule, and Stark Law safe harbors.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-teal-400">
                  <TrendingUp className="size-4" />
                  <span>Financial Feasibility</span>
                </div>
                <p className="text-slate-400 font-light">
                  Audits projected billing code compliance and clean claim submission feasibility before
                  launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
