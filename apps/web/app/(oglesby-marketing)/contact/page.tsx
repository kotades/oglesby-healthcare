"use client";

import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from "@calcom/lib/constants";
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Scale,
  Send,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const departments = [
    {
      title: "Executive CMO Advisory",
      email: "cmo@oglesbyhealthcare.com",
      focus: "Clinical operations, physician leadership alignment, hospital system restructuring",
      icon: Stethoscope,
    },
    {
      title: "RCM & Claims Audit Division",
      email: "rcm@oglesbyhealthcare.com",
      focus: "Claim denial recovery, billing scrubber setup, commercial fee schedule negotiation",
      icon: TrendingUp,
    },
    {
      title: "HIPAA & Regulatory Defense",
      email: "compliance@oglesbyhealthcare.com",
      focus: "OCR federal audit readiness, BAA execution, zero-trust data security audits",
      icon: Scale,
    },
    {
      title: "Telehealth & EHR Systems",
      email: "informatics@oglesbyhealthcare.com",
      focus: "Epic/Athena/Cerner interoperability, FHIR data sync, video consultation setup",
      icon: Headphones,
    },
  ];

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
            <Building2 className="size-4 text-cyan-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
              Direct Advisory Channel
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Connect With Our Senior <br className="hidden sm:inline" />
            <span className="text-cyan-700">Healthcare Leadership</span>
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Schedule an operational practice audit, request emergency OCR defense support, or discuss tailored
            executive advisory retainers.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Corporate Headquarters
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Primary Office
                    </h5>
                    <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                      {COMPANY_ADDRESS}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Executive Direct Line
                    </h5>
                    <p className="text-xs text-slate-700 font-semibold mt-1">{COMPANY_PHONE}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Advisory Desk
                    </h5>
                    <p className="text-xs text-slate-500 font-light mt-1">advisory@oglesbyhealthcare.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Operational Hours
                    </h5>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      Monday &ndash; Friday: 8:00 AM &ndash; 6:00 PM CST
                      <br />
                      <span className="text-[10px] text-emerald-600 font-medium">
                        24/7 Emergency Audit Dispatch for active client networks
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Track Box */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Priority Dispatch
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  24-HR SLA
                </span>
              </div>
              <h4 className="text-lg font-bold">Imminent OCR Audit or Payer Denial Escalations</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                For health systems facing urgent federal regulatory deadlines, sudden commercial payer dispute
                notices, or acute EHR transition bottlenecks, our rapid advisory response unit deploys within
                24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="size-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Transmitted Successfully</h3>
                  <p className="text-xs text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                    Thank you. Your consultation request has been routed to the appropriate senior advisory
                    lead. A member of our clinical executive team will review your practice metadata and reach
                    out within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">Consultation & Audit Request</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <ShieldCheck className="size-3" />
                      HIPAA Secure Channel
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Full Name & Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jane Doe, MD"
                        className="w-full h-11 rounded-lg border border-slate-200 px-3.5 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Professional Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane.doe@healthsystem.com"
                        className="w-full h-11 rounded-lg border border-slate-200 px-3.5 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Practice / Facility Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Apex Medical Group"
                        className="w-full h-11 rounded-lg border border-slate-200 px-3.5 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Practice Scale / Provider Count
                      </label>
                      <select className="w-full h-11 rounded-lg border border-slate-200 px-3 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all">
                        <option>Solo Practitioner (1 Provider)</option>
                        <option>Small Group Practice (2 - 5 Providers)</option>
                        <option>Mid-Sized Clinic / ASC (6 - 20 Providers)</option>
                        <option>Large Medical Group (20 - 50 Providers)</option>
                        <option>Hospital System / Network (50+ Providers)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Primary Advisory Focus
                      </label>
                      <select className="w-full h-11 rounded-lg border border-slate-200 px-3 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all">
                        <option>Clinical Workflow & Capacity Optimization</option>
                        <option>HIPAA & OCR Regulatory Audit Defense</option>
                        <option>Revenue Cycle Management (RCM) Overhaul</option>
                        <option>Telehealth & EHR Systems Interoperability</option>
                        <option>Executive Advisory & Practice Valuation</option>
                        <option>Payer Contracting & Fee Schedule Audit</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Primary EHR Platform
                      </label>
                      <select className="w-full h-11 rounded-lg border border-slate-200 px-3 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all">
                        <option>Epic Systems</option>
                        <option>AthenaHealth</option>
                        <option>Cerner Oracle Health</option>
                        <option>NextGen Healthcare</option>
                        <option>eClinicalWorks</option>
                        <option>Allscripts / Veradigm</option>
                        <option>Other / Proprietary System</option>
                      </select>
                    </div>
                  </div>

                  {/* Urgent Checkbox */}
                  <div className="flex items-center gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <input
                      type="checkbox"
                      id="urgentToggle"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 size-4"
                    />
                    <label htmlFor="urgentToggle" className="text-xs text-slate-700 cursor-pointer">
                      <strong className="font-semibold">Urgent Audit Dispatch:</strong> Practice is currently
                      facing imminent regulatory review or critical cash-flow disruption.
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Overview of Practice Challenges / Audit Goals
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your current operational bottlenecks, denial rates, or target audit scope..."
                      className="w-full rounded-lg border border-slate-200 p-3.5 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
                    <Send className="size-4 text-cyan-400" />
                    Transmit Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Department Directory Grid */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
              Departmental Routing
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">Direct Specialized Inquiries</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, idx) => {
              const Icon = dept.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{dept.title}</h4>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 block">
                    {dept.email}
                  </a>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">{dept.focus}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
