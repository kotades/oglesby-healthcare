"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function EmbeddedBooker() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section className="w-full bg-slate-50 py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-cyan-600 font-bold tracking-widest uppercase text-xs mb-3">
            Schedule Integration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Book a Strategy Session
          </h2>
          <p className="text-slate-500 font-light max-w-2xl text-sm leading-relaxed">
            Select a convenient time below to speak with our healthcare consulting experts.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden min-h-[600px] w-full max-w-4xl mx-auto flex items-center justify-center">
          <div className="w-full h-full p-4 md:p-8">
            <Cal
              namespace="consultation"
              calLink="team/oglesby/consultation"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
