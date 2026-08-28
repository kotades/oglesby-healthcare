"use client";

import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from "@calcom/lib/constants";
import { Building2, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
            Direct Communications Channel
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect With Our Advisory Board
          </h1>
          <p className="text-slate-500 font-light text-sm max-w-xl mx-auto">
            Schedule an operational audit or submit inquiries directly to our practice management team.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Corporate Headquarters
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase">Primary Office</h5>
                    <p className="text-xs text-slate-500 font-light mt-1">{COMPANY_ADDRESS}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase">Direct Line</h5>
                    <p className="text-xs text-slate-500 font-light mt-1">{COMPANY_PHONE}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase">Executive Email</h5>
                    <p className="text-xs text-slate-500 font-light mt-1">advisory@oglesbyhealthcare.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-900 text-white p-8 rounded-xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                Fast-Track Response
              </span>
              <h4 className="text-lg font-bold">Urgent Audit Escalations</h4>
              <p className="text-xs text-cyan-100/80 font-light leading-relaxed">
                For health systems facing imminent regulatory deadlines or commercial payor disputes, our
                rapid team deploys within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 lg:p-10 rounded-xl border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="size-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Transmitted</h3>
                  <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
                    Thank you. A senior practice advisor will review your submitted details and respond within
                    1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-100">
                    Consultation & Audit Request
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jane Doe"
                        className="w-full h-10 rounded border border-slate-200 px-3 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane.doe@healthsystem.com"
                        className="w-full h-10 rounded border border-slate-200 px-3 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Practice / Facility Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Apex Medical Group"
                        className="w-full h-10 rounded border border-slate-200 px-3 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Primary Area of Interest
                      </label>
                      <select className="w-full h-10 rounded border border-slate-200 px-3 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-cyan-500">
                        <option>Clinical Workflow Optimization</option>
                        <option>HIPAA & Compliance Audit</option>
                        <option>Revenue Cycle Management (RCM)</option>
                        <option>Telehealth & EHR Integration</option>
                        <option>Executive Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Message / Overview of Practice Needs
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your current operational challenges or desired audit scope..."
                      className="w-full rounded border border-slate-200 p-3 text-xs bg-slate-50 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                    <Send className="size-4 text-cyan-400" />
                    Transmit Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
