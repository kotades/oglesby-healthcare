import { ArrowRight, Award, Calendar, Mail, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function ConsultantsPage() {
  const consultants = [
    {
      name: "Dr. Marcus Oglesby, MD, MBA",
      role: "Founder & Chief Medical Officer",
      specialty: "Clinical Operations & Health System Strategy",
      bio: "20+ years leading clinical transformations and ambulatory care restructuring. Former Chief of Staff at Regional Health System.",
      credentials: ["MD - Johns Hopkins", "MBA - Wharton", "Board Certified Internal Medicine"],
    },
    {
      name: "Elena Vance, MHA, CPC",
      role: "Managing Director, Revenue Cycle Management",
      specialty: "RCM Optimization & Claims Recovery",
      bio: "Expert in commercial payor contract negotiations, denial recovery protocols, and outpatient billing automation.",
      credentials: ["MHA - Cornell", "Certified Professional Coder (CPC)", "HFMA Certified Fellow"],
    },
    {
      name: "Robert Chen, JD, CHPS",
      role: "Director of Healthcare Compliance & Privacy",
      specialty: "HIPAA Security, HITECH & Regulatory Defense",
      bio: "Specializes in healthcare privacy law, federal audit preparation, and Business Associate Agreement (BAA) architectures.",
      credentials: ["JD - Georgetown Law", "Certified in Healthcare Privacy and Security (CHPS)"],
    },
    {
      name: "Dr. Sarah Jenkins, DNP, RN",
      role: "Senior Director of Clinical Telehealth Systems",
      specialty: "EHR Integration & Digital Health Workflows",
      bio: "Pioneered virtual care workflows across multi-site primary care networks, focusing on clinician burn-out reduction.",
      credentials: ["DNP - Vanderbilt University", "Healthcare Informatics Specialist"],
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
              Executive Leadership & Advisory Board
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Senior Advisory Team
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Our team brings together veteran medical doctors, healthcare attorneys, RCM specialists, and
            digital health architects to solve your toughest operational challenges.
          </p>
        </div>
      </section>

      {/* Consultants Grid */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {consultants.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">
                      {person.specialty}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{person.name}</h3>
                    <p className="text-sm font-semibold text-slate-600">{person.role}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {person.name.charAt(4)}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">{person.bio}</p>

                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Credentials & Accreditations
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {person.credentials.map((cred, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/#booker"
                className="flex items-center justify-center gap-2 w-full py-3 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
                <Calendar className="size-3.5 text-cyan-400" />
                Schedule Session with {person.name.split(" ")[1]}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
