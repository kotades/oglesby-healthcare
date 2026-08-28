"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  FileCheck,
  FileText,
  Filter,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadedId, setDownloadedId] = useState<number | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const categories = ["All", "RCM & Billing", "HIPAA Compliance", "Clinical Workflows", "Telehealth & Tech"];

  const articles = [
    {
      id: 1,
      title: "2026 Healthcare RCM Benchmark Report: Denial Recovery in Ambulatory Surgery",
      category: "RCM & Billing",
      date: "August 2026",
      readTime: "9 min read",
      author: "Elena Vance, MHA, CPC",
      description:
        "An in-depth empirical analysis of commercial payor denial patterns across 150+ outpatient surgical centers, highlighting pre-authorization root causes and appeal win rates.",
      takeaways: [
        "Pre-authorization code mismatch accounts for 43% of surgical denials",
        "Automated claim scrubbers improve clean submission rates to 98.8%",
        "Average days in A/R reduced by 22 days with rapid appeal protocols",
      ],
      pdfSize: "2.4 MB PDF",
    },
    {
      id: 2,
      title: "Mastering HIPAA OCR Audit Readiness: 2026 Executive Playbook",
      category: "HIPAA Compliance",
      date: "July 2026",
      readTime: "14 min read",
      author: "Robert Chen, JD, CHPS",
      description:
        "Step-by-step preparation framework for HHS Office for Civil Rights (OCR) privacy and security audits. Includes ready-to-use BAA verification templates and safeguard checklists.",
      takeaways: [
        "How to conduct a legally defensible Risk Analysis under 45 CFR § 164.308",
        "Sub-processor BAA chain-of-custody compliance rules",
        "Technical safeguards: immutable audit logging and role-based access",
      ],
      pdfSize: "3.1 MB PDF",
    },
    {
      id: 3,
      title: "Reducing Provider EHR Burnout: Reclaiming 14 Hours Weekly Per Clinician",
      category: "Clinical Workflows",
      date: "June 2026",
      readTime: "7 min read",
      author: "Dr. Marcus Oglesby, MD, MBA",
      description:
        "Field case study detailing how Apex Multi-Specialty Medical Group reclaimed 14 hours per physician weekly through auto-documentation template redesign and triage streamlining.",
      takeaways: [
        "Restructuring EHR desktop templates cuts after-hours charting by 70%",
        "Exam room turnover time reduced from 24 mins to 14 mins",
        "Improved physician retention and Net Promoter Score (NPS)",
      ],
      pdfSize: "1.8 MB PDF",
    },
    {
      id: 4,
      title: "Telehealth Reimbursement Strategies & Multi-State Compliance",
      category: "Telehealth & Tech",
      date: "May 2026",
      readTime: "8 min read",
      author: "Dr. Sarah Jenkins, DNP, RN",
      description:
        "Navigating post-public health emergency CMS billing rules, originating site codes, and cross-state clinician licensing requirements for hybrid practices.",
      takeaways: [
        "Billing POS 02 vs. POS 10 modifiers correctly for maximum reimbursement",
        "Remote Patient Monitoring (RPM) CPT codes (99453, 99454, 99457)",
        "HIPAA-compliant video encryption standards (TLS 1.3 & AES-256)",
      ],
      pdfSize: "2.1 MB PDF",
    },
    {
      id: 5,
      title: "Payer Contract Negotiation: Unlocking 12-18% Higher Commercial Rates",
      category: "RCM & Billing",
      date: "April 2026",
      readTime: "11 min read",
      author: "Michael Sterling, FACHE, MBA",
      description:
        "How private specialty groups leverage regional volume data, quality metrics, and market benchmarks to renegotiate evergreen fee schedule contracts with commercial insurers.",
      takeaways: [
        "Identifying under-reimbursed CPT codes relative to regional Medicare multipliers",
        "Structuring evergreen clause termination and renewal triggers",
        "Value-based care risk corridors and shared savings formulas",
      ],
      pdfSize: "2.8 MB PDF",
    },
    {
      id: 6,
      title: "Zero-Trust Architecture for Modern Health Systems: Technical Whitepaper",
      category: "HIPAA Compliance",
      date: "March 2026",
      readTime: "16 min read",
      author: "Priya Sharma, MS, RHIA",
      description:
        "A technical architecture guide for implementing isolated multi-tenant data namespaces, FIPS 140-2 encryption, and millisecond audit trails on cloud backends.",
      takeaways: [
        "Isolated root prefix design (`oglesby_healthcare/`) preventing cross-tenant leakage",
        "Continuous token validation and biometric IAM integration",
        "FHIR and HL7 encrypted payload streaming protocols",
      ],
      pdfSize: "4.2 MB PDF",
    },
    {
      id: 7,
      title: "Optimizing Operating Room Scheduling & Perioperative Flow",
      category: "Clinical Workflows",
      date: "February 2026",
      readTime: "6 min read",
      author: "Dr. Marcus Oglesby, MD, MBA",
      description:
        "Strategies for Ambulatory Surgical Centers (ASCs) to maximize block time utilization, eliminate late first-case starts, and streamline patient pre-op clearances.",
      takeaways: [
        "First-case on-time starts improved from 62% to 94%",
        "Sterile processing cycle sync eliminating instrument delay",
        "Dynamic block time reallocation based on 90-day surgeon utilization",
      ],
      pdfSize: "1.9 MB PDF",
    },
    {
      id: 8,
      title: "FHIR API Integration with Legacy EHRs: Overcoming Interoperability Hurdles",
      category: "Telehealth & Tech",
      date: "January 2026",
      readTime: "10 min read",
      author: "Priya Sharma, MS, RHIA",
      description:
        "Connecting modern scheduling portals and mobile intake apps to legacy Epic, Cerner, and NextGen installations using SMART on FHIR protocols.",
      takeaways: [
        "Bi-directional patient appointment slot synchronization",
        "Real-time insurance eligibility checks at booking intake",
        "Automated CDA document generation and ingest",
      ],
      pdfSize: "3.5 MB PDF",
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: number) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 3000);
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
            <BookOpen className="size-4 text-cyan-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
              Healthcare Operations & Compliance Library
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Research, Playbooks & <br className="hidden sm:inline" />
            <span className="text-cyan-700">Clinical Regulatory Insights</span>
          </h1>
          <p className="text-slate-500 font-light text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Actionable whitepapers, empirical benchmarks, and regulatory compliance checklists written by our
            senior physicians, healthcare attorneys, and revenue cycle specialists.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search playbooks, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 px-6 max-w-[1400px] mx-auto">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="size-10 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Matching Resources</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              We couldn't find any documents matching &ldquo;{searchQuery}&rdquo;. Try selecting another
              category or clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 font-bold uppercase text-[10px] border border-cyan-100">
                      {art.category}
                    </span>
                    <span className="text-[11px] font-medium">
                      {art.date} &bull; {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">{art.title}</h3>
                  <span className="text-[11px] font-semibold text-cyan-700 block mb-4">By {art.author}</span>

                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-6">{art.description}</p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Takeaways
                    </span>
                    {art.takeaways.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="size-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{art.pdfSize}</span>

                  <button
                    onClick={() => handleDownload(art.id)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 hover:text-cyan-900 transition-colors">
                    {downloadedId === art.id ? (
                      <>
                        <FileCheck className="size-4 text-emerald-600" />
                        <span className="text-emerald-600">Briefing Ready</span>
                      </>
                    ) : (
                      <>
                        <Download className="size-4 text-cyan-600" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Subscription Box */}
      <section className="bg-slate-900 text-white py-16 px-6 border-t border-slate-800">
        <div className="max-w-[1000px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700 text-cyan-300 text-[10px] font-bold uppercase tracking-widest">
            <Mail className="size-3.5" />
            Executive Intelligence
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">The Healthcare Regulatory & RCM Dispatch</h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Bi-weekly executive briefings covering CMS rule revisions, commercial payor fee trends, and HIPAA
            OCR enforcement actions delivered directly to your inbox.
          </p>

          {emailSubscribed ? (
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold inline-flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Thank you for subscribing! Your executive dispatch will arrive every other Tuesday.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubscribed(true);
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="physician.leader@healthsystem.com"
                className="w-full sm:flex-1 h-11 px-4 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-11 px-6 rounded-lg bg-cyan-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-cyan-500 transition-colors shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
