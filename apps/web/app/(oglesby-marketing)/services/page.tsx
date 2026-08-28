import { ServicesGrid } from "@components/healthcare/ServicesGrid";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Healthcare Consulting Services | Oglesby Healthcare Consulting",
  description: "Explore our clinical operations optimization, HIPAA compliance auditing, telehealth infrastructure, and revenue cycle management solutions.",
};

export default function ServicesPage() {
  return (
    <div className="w-full pt-10 pb-20">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-b from-teal-50/60 to-white py-16 border-b border-cyan-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-300/60">
              Specialized Healthcare Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Tailored Solutions for Modern Medical Practices
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We assist healthcare executives, clinic directors, and medical practitioners in achieving peak operational performance, stringent HIPAA compliance, and sustainable financial growth.
            </p>
          </div>
        </div>

        {/* Services Bento Overview */}
        <ServicesGrid />

        {/* Practice Consultation Estimator Callout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-r from-cyan-900 via-slate-900 to-teal-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                Custom Engagement Models
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Need a Custom Compliance or Operational Audit?
              </h2>
              <p className="text-sm text-cyan-100 leading-relaxed">
                Whether you operate a single-location medical clinic or a multi-state telehealth platform, Oglesby Healthcare Consulting creates customized advisory roadmaps aligned with your clinical goals.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/#booker"
                  className="inline-flex items-center justify-center space-x-2 text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 px-6 py-3.5 rounded-xl transition-all duration-200"
                >
                  <span>Book Advisory Session</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
