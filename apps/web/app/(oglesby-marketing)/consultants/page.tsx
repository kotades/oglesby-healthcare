import { UserCheck, Award, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Consultants & Experts | Oglesby Healthcare Consulting",
  description: "Meet our senior healthcare consultants, clinical auditors, and HIPAA compliance advisors.",
};

const consultantsList = [
  {
    name: "Dr. Marcus Oglesby, MHA, FACHE",
    role: "Managing Director & Principal Healthcare Consultant",
    specialty: "Clinical Operations & Practice Scaling",
    bio: "Over 18 years of healthcare leadership experience optimizing clinical workflows, medical staff alignment, and health system efficiency.",
    credentials: ["MHA", "FACHE", "Certified HIPAA Professional"],
  },
  {
    name: "Sarah Jenkins, RN, CHC",
    role: "Senior HIPAA Compliance & Regulatory Advisor",
    specialty: "HIPAA Auditing & Patient Privacy Protocols",
    bio: "Clinical nursing background combined with Certified Healthcare Compliance (CHC) credentials, specializing in risk assessments and audit readiness.",
    credentials: ["RN", "BSN", "CHC"],
  },
  {
    name: "David Sterling, MBA",
    role: "Director of Revenue Cycle & Telehealth Strategy",
    specialty: "Medical Billing & Telehealth Integration",
    bio: "Expert in digital health platform integrations, telehealth scheduling infrastructure, and medical billing optimization for growing practices.",
    credentials: ["MBA", "Certified Practice Executive"],
  },
];

export default function ConsultantsPage() {
  return (
    <div className="w-full">
                    {/* Banner */}
        <div className="bg-gradient-to-b from-teal-50/60 to-white py-16 border-b border-cyan-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-300/60">
              Expert Advisory Team
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Healthcare Consulting Directors
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Work directly with seasoned healthcare executives, clinical nurse leaders, and certified compliance auditors.
            </p>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {consultantsList.map((consultant, idx) => (
              <div
                key={idx}
                className="rounded-2xl backdrop-blur-xl bg-white p-8 border border-cyan-100 shadow-[0_4px_20px_rgba(8,145,178,0.05)] hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    <UserCheck className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{consultant.name}</h3>
                    <p className="text-xs font-semibold text-cyan-700 mt-0.5">{consultant.role}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {consultant.credentials.map((cred, i) => (
                      <span key={i} className="text-[11px] font-bold text-slate-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-100">
                        {cred}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    {consultant.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <a
                    href="/#booker"
                    className="w-full inline-flex items-center justify-center space-x-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 py-3 rounded-xl shadow hover:shadow-md transition-all duration-200"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Direct Consultation</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
                </div>
  );
}
