"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Video,
  X,
} from "lucide-react";

interface ConsultationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: {
    id: string;
    consultantName: string;
    type: string;
    date: string;
    time: string;
    modality: "video" | "phone" | "onsite";
    status: string;
    notes?: string;
    meetingUrl?: string | null;
  } | null;
  onCancelRequest?: (bookingId: string) => void;
}

export function ConsultationDetailModal({
  isOpen,
  onClose,
  booking,
  onCancelRequest,
}: ConsultationDetailModalProps) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
          aria-label="Close modal">
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="size-11 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold shadow-xs">
            <Calendar className="size-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
              {booking.type}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Consultation Details</h3>
          </div>
        </div>

        {/* Details Card */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Assigned Specialist
              </span>
              <span className="text-sm font-bold text-slate-900">{booking.consultantName}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Date & Time</span>
                <span className="font-semibold text-slate-800">
                  {booking.date} at {booking.time}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Session Format</span>
                <span className="font-semibold text-slate-800 capitalize flex items-center gap-1 mt-0.5">
                  {booking.modality === "video" ? (
                    <Video className="size-3.5 text-cyan-600" />
                  ) : booking.modality === "phone" ? (
                    <Phone className="size-3.5 text-emerald-600" />
                  ) : (
                    <MapPin className="size-3.5 text-slate-600" />
                  )}
                  {booking.modality}
                </span>
              </div>
            </div>

            {booking.notes && (
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Reason for Visit</span>
                <p className="text-xs text-slate-600 font-light mt-0.5 italic">
                  &ldquo;{booking.notes}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Security Badge */}
          <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2.5 rounded-xl border border-emerald-200">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Encrypted Telehealth Session under HIPAA Safeguards</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {booking.meetingUrl && booking.modality === "video" && (
              <a
                href={booking.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl shadow-xs transition-colors">
                <Video className="size-4" />
                <span>Join Video Room</span>
              </a>
            )}

            {onCancelRequest && booking.status !== "CANCELLED" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCancelRequest(booking.id);
                }}
                className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors">
                Cancel Appointment
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
