"use client";

import { COMPANY_PHONE } from "@calcom/lib/constants";
import { Activity, ArrowRight, Menu, Phone, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function OglesbyHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Consultants", href: "/consultants" },
    { name: "Compliance", href: "/compliance" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500 shadow-sm transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Oglesby<span className="text-cyan-600">.</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Healthcare Consulting
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 h-full">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`h-full flex items-center text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                  active
                    ? "text-cyan-700 border-cyan-600"
                    : "text-slate-600 hover:text-cyan-600 border-transparent hover:border-cyan-300"
                }`}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 flex items-center gap-1">
              <Phone className="size-2.5 text-cyan-600" />
              Direct Line
            </span>
            <span className="text-xs font-semibold text-slate-900">{COMPANY_PHONE}</span>
          </div>

          <Link
            href="/#booker"
            className="flex h-9 items-center justify-center gap-1.5 rounded border border-cyan-600 bg-cyan-50/50 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-cyan-700 transition-colors hover:bg-cyan-100/70">
            Schedule Audit
          </Link>

          <Link
            href="/auth/login"
            className="flex h-9 items-center justify-center gap-2 rounded bg-slate-900 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-slate-800 shadow-sm">
            Client Portal
            <ArrowRight className="size-3" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive(link.href) ? "text-cyan-700 font-bold" : "text-slate-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-1" />
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/#booker"
                className="flex h-10 items-center justify-center gap-2 rounded border border-cyan-600 bg-cyan-50 text-[11px] font-bold uppercase tracking-[0.1em] text-cyan-800"
                onClick={() => setIsMobileMenuOpen(false)}>
                Schedule Audit
              </Link>
              <Link
                href="/auth/login"
                className="flex h-10 items-center justify-center gap-2 rounded bg-slate-900 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
                onClick={() => setIsMobileMenuOpen(false)}>
                Client Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default OglesbyHeader;
