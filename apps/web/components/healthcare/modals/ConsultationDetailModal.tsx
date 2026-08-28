"use client";

import { Calendar, CheckCircle, Clock, FileText, ShieldCheck, User, Video, X } from "lucide-react";

interface ConsultationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: {
    id: string;
    title: string;
    clientName: string;
    clientEmail: string;
    date: string;
    time: string;
    videoUrl?: string;
  };
}

export function ConsultationDetailModal({ isOpen, onClose, booking }: ConsultationDetailModalProps) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cyan-100 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{booking.title}</h3>
            <p className="text-xs text-slate-500">Consultation Details & Client Intake</p>
          </div>
        </div>

        {/* Details Overview */}
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-semibold uppercase tracking-wider">Client Name</span>
            <p className="text-sm font-bold text-slate-900">{booking.clientName}</p>
            <p className="text-slate-600">{booking.clientEmail}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-semibold uppercase tracking-wider">Schedule</span>
            <p className="text-sm font-bold text-slate-900">{booking.date}</p>
            <p className="text-slate-600">{booking.time}</p>
          </div>
        </div>

        {/* HIPAA Verified Pill */}
        <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">HIPAA Intake & Patient Privacy Verified</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 pt-2">
          {booking.videoUrl ? (
            <a
              href={booking.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center space-x-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl shadow transition-all duration-200">
              <Video className="w-4 h-4" />
              <span>Launch Video Call Room</span>
            </a>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-white bg-cyan-600 rounded-xl hover:bg-cyan-700">
              Close Record
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
