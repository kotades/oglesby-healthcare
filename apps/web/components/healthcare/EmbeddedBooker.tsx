"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, Phone, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { COMPANY_PHONE } from "@calcom/lib/constants";
import { useRouter } from "next/navigation";

const consultationTypes = [
  {
    id: "30-min-discovery",
    title: "Initial Practice Discovery",
    duration: "30 Min",
    type: "Virtual Call",
    description: "Evaluate practice challenges and compliance goals.",
  },
  {
    id: "60-min-audit",
    title: "Clinical & HIPAA Audit",
    duration: "60 Min",
    type: "Deep-Dive",
    description: "In-depth review of clinical operations and HIPAA risk.",
  },
  {
    id: "15-min-urgent",
    title: "Urgent Consultation",
    duration: "15 Min",
    type: "Phone Call",
    description: "Fast-track briefing for urgent regulatory inquiries.",
  },
];

export function EmbeddedBooker() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(consultationTypes[0].id);
  const [selectedSlot, setSelectedSlot] = useState("9:00 AM");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate booking API
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <section id="booker" className="relative w-full bg-slate-50 py-24 border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Context */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Direct Scheduling
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Initialize a secure <span className="text-cyan-700">Audit Session.</span>
            </h2>
            
            <p className="text-slate-600 font-light leading-relaxed mb-10">
              Select an engagement type to review your operational protocols, assess regulatory vulnerabilities, and establish a framework for optimization. All sessions are completely confidential.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-md bg-white border border-slate-200 shadow-sm w-fit mb-8">
              <ShieldCheck className="size-6 text-emerald-600" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">End-to-End Encryption</p>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">HIPAA compliant consultation systems</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Phone className="size-4 text-cyan-600" />
              Direct Support: <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`} className="text-cyan-700 hover:underline">{COMPANY_PHONE}</a>
            </div>
          </div>

          {/* Right Interface */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 1</h3>
                      <p className="text-[11px] text-slate-500 mt-1">Select Consultation Parameters</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {consultationTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`text-left p-4 rounded-md border transition-all ${
                          selectedType === type.id
                            ? "border-cyan-600 bg-cyan-50/50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedType === type.id ? 'text-cyan-700' : 'text-slate-400'}`}>
                            {type.duration}
                          </span>
                          {selectedType === type.id && <CheckCircle className="size-3 text-cyan-600" />}
                        </div>
                        <h4 className={`text-sm font-bold mb-1 ${selectedType === type.id ? 'text-slate-900' : 'text-slate-700'}`}>{type.title}</h4>
                        <p className="text-[10px] text-slate-500 font-light leading-relaxed">{type.description}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="flex h-10 items-center justify-center gap-2 rounded bg-slate-900 px-8 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-slate-800"
                    >
                      Continue
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 2</h3>
                      <p className="text-[11px] text-slate-500 mt-1">Provide Practice Details</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.05em] font-bold text-slate-500">Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="rounded-md h-10 px-3 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.05em] font-bold text-slate-500">Corporate Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="rounded-md h-10 px-3 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.05em] font-bold text-slate-500">Direct Phone</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="rounded-md h-10 px-3 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.05em] font-bold text-slate-500">Facility / Practice Name</label>
                        <input
                          type="text"
                          required
                          value={facilityName}
                          onChange={(e) => setFacilityName(e.target.value)}
                          className="rounded-md h-10 px-3 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex h-10 items-center justify-center gap-2 rounded bg-slate-900 px-8 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-slate-800 disabled:opacity-50"
                      >
                        {isSubmitting ? "Processing..." : "Confirm Booking"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="size-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6">
                    <CheckCircle className="size-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Audit Initialized</h3>
                  <p className="text-sm text-slate-500 max-w-sm font-light mb-8">
                    Your session request has been received. You will receive an encrypted confirmation email shortly.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex h-10 items-center justify-center rounded border border-slate-200 bg-white px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600 transition-all hover:bg-slate-50"
                    >
                      Book Another
                    </button>
                    <button
                      onClick={() => router.push('/auth/signup')}
                      className="flex h-10 items-center justify-center rounded border border-cyan-600 bg-transparent px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-cyan-700 transition-all hover:bg-cyan-50"
                    >
                      Create Client Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
