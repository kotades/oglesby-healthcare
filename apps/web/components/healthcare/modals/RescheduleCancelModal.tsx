"use client";

import { useState } from "react";
import { X, Calendar, AlertTriangle, RefreshCw, Trash2 } from "lucide-react";

interface RescheduleCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingTitle?: string;
}

export function RescheduleCancelModal({ isOpen, onClose, bookingTitle = "Consultation" }: RescheduleCancelModalProps) {
  const [action, setAction] = useState<"reschedule" | "cancel">("reschedule");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-cyan-100 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Modify Appointment</h3>
            <p className="text-xs text-slate-500">{bookingTitle}</p>
          </div>
        </div>

        {/* Option Selector */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAction("reschedule")}
            className={`p-3 text-xs font-bold rounded-xl border flex items-center justify-center space-x-2 transition-all ${
              action === "reschedule"
                ? "bg-cyan-50 border-cyan-500 text-cyan-800 ring-2 ring-cyan-500/20"
                : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reschedule Time</span>
          </button>
          <button
            type="button"
            onClick={() => setAction("cancel")}
            className={`p-3 text-xs font-bold rounded-xl border flex items-center justify-center space-x-2 transition-all ${
              action === "cancel"
                ? "bg-red-50 border-red-500 text-red-800 ring-2 ring-red-500/20"
                : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Cancel Consultation</span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Modification</label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide details for rescheduling or cancellation..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          onClick={onClose}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-md transition-all duration-200 ${
            action === "cancel" ? "bg-red-600 hover:bg-red-700" : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {action === "cancel" ? "Confirm Cancellation" : "Select New Time Slot"}
        </button>
      </div>
    </div>
  );
}
