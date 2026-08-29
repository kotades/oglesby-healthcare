"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export function FaqSection() {
  const faqs = [
    {
      q: "What types of healthcare practices does Oglesby Healthcare consult for?",
      a: "We work with single-specialty practices, multi-location ambulatory clinics, telehealth platforms, and large regional hospital networks to streamline operations, revenue cycles, and HIPAA compliance.",
    },
    {
      q: "How does the initial 60-Minute Operations Audit work?",
      a: "Our senior consultants evaluate your current scheduling workflows, patient intake friction, RCM claim denial rates, and EHR integration bottlenecks to deliver a customized roadmap for efficiency.",
    },
    {
      q: "Are your digital tools and data pipelines HIPAA compliant?",
      a: "Yes. All data pipelines, storage, and authentication integrations leverage isolated namespacing, end-to-end encryption, and BAA-backed architecture adhering strictly to HIPAA and HITECH guidelines.",
    },
    {
      q: "Can you assist with claim denial recovery and billing infrastructure?",
      a: "Absolutes. Our RCM specialists perform deep audit recovery to resolve denied claims, overhaul coding practices, and implement automated patient billing systems.",
    },
    {
      q: "How quickly can an advisory engagement begin?",
      a: "Following your initial consultation, engagement options range from rapid 2-week workflow audits to ongoing executive advisory retainers.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-slate-50 py-20 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100">
            <HelpCircle className="size-3.5 text-cyan-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Clear Answers to Your Practice Queries
          </h2>
          <p className="text-slate-500 text-sm font-light">
            Everything you need to know about partnering with Oglesby Healthcare Consulting LLC.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/50 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-cyan-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 font-light text-sm leading-relaxed border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
