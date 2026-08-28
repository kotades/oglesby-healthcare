import { ArrowRight, BookOpen, Download, FileText, Search } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  const articles = [
    {
      title: "2026 Healthcare RCM Benchmark Report",
      category: "Whitepaper",
      date: "August 2026",
      readTime: "8 min read",
      description: "An analysis of commercial payor denial patterns across 150+ outpatient surgical centers.",
    },
    {
      title: "Mastering HIPAA Audit Readiness",
      category: "Guide",
      date: "July 2026",
      readTime: "12 min read",
      description: "Step-by-step preparation checklist for HHS OCR privacy and security audits.",
    },
    {
      title: "Reducing Provider EHR Burnout",
      category: "Case Study",
      date: "June 2026",
      readTime: "5 min read",
      description: "How Apex Medical Group reclaimed 14 hours per physician weekly via workflow automation.",
    },
    {
      title: "Telehealth Reimbursement Strategies",
      category: "Regulatory Update",
      date: "May 2026",
      readTime: "6 min read",
      description: "Navigating post-pandemic CMS policy shifts and billing codes for virtual care.",
    },
  ];

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
            <BookOpen className="size-4 text-cyan-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
              Knowledge Base & Clinical Insights
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Operations & Compliance Library
          </h1>
          <p className="text-slate-500 font-light text-sm max-w-2xl mx-auto">
            Actionable playbooks, regulatory updates, and revenue cycle research written by our senior
            advisory staff.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="px-2.5 py-1 rounded bg-cyan-50 text-cyan-700 font-bold uppercase text-[10px]">
                    {art.category}
                  </span>
                  <span>
                    {art.date} &bull; {art.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{art.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-6">{art.description}</p>
              </div>

              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 hover:text-cyan-900 transition-colors pt-4 border-t border-slate-100">
                <Download className="size-3.5" />
                Download Briefing PDF
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
