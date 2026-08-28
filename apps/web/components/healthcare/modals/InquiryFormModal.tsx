"use client";

import { COMPANY_PHONE } from "@calcom/lib/constants";
import { Mail, Send, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

interface InquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryFormModal({ isOpen, onClose }: InquiryFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-cyan-100 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Request Custom Advisory Proposal</h3>
            <p className="text-xs text-slate-500">Oglesby Healthcare Consulting Services</p>
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              placeholder="Dr. John Doe"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@clinic.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (318) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Practice / Facility Details
            </label>
            <textarea
              rows={3}
              placeholder="Describe your medical practice size, current compliance needs, or workflow objectives..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 shadow-md transition-all duration-200">
            Submit Proposal Request
          </button>
        </form>
      </div>
    </div>
  );
}
