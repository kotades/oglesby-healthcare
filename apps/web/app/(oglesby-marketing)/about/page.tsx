import { ShieldCheck, MapPin, Phone, Mail, Building2, CheckCircle2, Clock } from "lucide-react";
import { COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_NAME } from "@calcom/lib/constants";

export const metadata = {
  title: "About & Compliance | Oglesby Healthcare Consulting",
  description: "Learn about Oglesby Healthcare Consulting headquarters in Shreveport, Louisiana, our mission, and HIPAA compliance standards.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
                    {/* Banner */}
        <div className="bg-gradient-to-b from-teal-50/60 to-white py-16 border-b border-cyan-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-300/60">
              Our Vision & Commitment
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              About Oglesby Healthcare Consulting
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Dedicated to clinical excellence, regulatory compliance, and administrative efficiency for healthcare providers.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Mission & Story Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Empowering Healthcare Leaders to Deliver Higher Quality Care
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded with a commitment to clinical integrity and operational clarity, Oglesby Healthcare Consulting partners with medical practices, clinics, and telehealth platforms across the United States.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our advisors combine healthcare management expertise with hands-on clinical understanding, giving medical practice directors actionable strategies to improve patient satisfaction while protecting compliance.
              </p>
            </div>

            {/* Headquarters Detail Card */}
            <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-cyan-900 to-slate-900 p-8 text-white shadow-xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-cyan-800 pb-4">
                <Building2 className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold">National Headquarters</h3>
                  <p className="text-xs text-cyan-200">Shreveport, Louisiana</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Office Address</span>
                    <span className="text-cyan-100">{COMPANY_ADDRESS}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Direct Line</span>
                    <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`} className="text-cyan-100 hover:text-white">
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Consulting Hours</span>
                    <span className="text-cyan-100">Monday – Friday: 8:00 AM – 6:00 PM CST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HIPAA Security Statement */}
          <div className="p-8 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-4">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">100% HIPAA Data Protection Commitment</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Oglesby Healthcare Consulting maintains strict Business Associate Agreement (BAA) standards, end-to-end data encryption, and HIPAA-compliant scheduling protocols across all virtual and in-person advisory engagements.
            </p>
          </div>
        </div>
                </div>
  );
}
