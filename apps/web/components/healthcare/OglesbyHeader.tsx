"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, Menu, X, ArrowRight } from "lucide-react";
import { COMPANY_PHONE } from "@calcom/lib/constants";

export function OglesbyHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6 lg:px-10">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500 shadow-sm transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Oglesby<span className="text-cyan-600">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          <Link href="/services" className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-600 transition-colors">
            Services
          </Link>
          <Link href="/consultants" className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-600 transition-colors">
            Consultants
          </Link>
          <Link href="/about" className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-600 transition-colors">
            About & Compliance
          </Link>
          <Link href="/contact" className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end mr-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Direct Line</span>
            <span className="text-sm font-semibold text-slate-900">{COMPANY_PHONE}</span>
          </div>
          
          <Link
            href="/auth/login"
            className="flex h-9 items-center justify-center gap-2 rounded bg-slate-900 px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-slate-800"
          >
            Client Portal
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <Link href="/services" className="text-sm font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link href="/consultants" className="text-sm font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Consultants</Link>
            <Link href="/about" className="text-sm font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>About & Compliance</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="h-px bg-slate-100 my-2" />
            <Link
              href="/auth/login"
              className="flex h-10 items-center justify-center gap-2 rounded bg-slate-900 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Client Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
