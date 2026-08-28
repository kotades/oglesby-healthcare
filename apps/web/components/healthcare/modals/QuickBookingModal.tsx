"use client";

import { COMPANY_PHONE } from "@calcom/lib/constants";
import { Calendar, CheckCircle2, Clock, ShieldCheck, Video, X } from "lucide-react";
import { useState } from "react";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickBookingModal({ isOpen, onClose }: QuickBookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cyan-100 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Quick Consultation Reservation</h3>
            <p className="text-xs text-slate-500">Oglesby Healthcare Advisory Services</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">Select Offering</span>
            <select className="w-full mt-1.5 px-3 py-2 rounded-lg border border-cyan-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option>30-Min Initial Practice Discovery Session</option>
              <option>60-Min Comprehensive Clinical & HIPAA Audit</option>
              <option>15-Min Urgent Advisory Phone Call</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="Dr. Jane Smith"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="jane@practice.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted with 100% HIPAA compliant privacy standards.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 shadow-md transition-all duration-200">
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
