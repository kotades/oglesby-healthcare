"use client";

import { getOglesbyCollection, oglesbyAuth } from "@calcom/lib/firebase/oglesbyFirebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Calendar, CheckCircle2, Clock, ShieldCheck, UserCheck, Video, X } from "lucide-react";
import { useState } from "react";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: () => void;
  defaultConsultant?: string;
}

export function QuickBookingModal({
  isOpen,
  onClose,
  onBookingCreated,
  defaultConsultant = "Dr. Marcus Oglesby, MD, MBA",
}: QuickBookingModalProps) {
  const currentUser = oglesbyAuth.currentUser;

  const [consultant, setConsultant] = useState(defaultConsultant);
  const [offering, setOffering] = useState("60-Min Comprehensive Clinical & Operations Audit");
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("10:00 AM");
  const [modality, setModality] = useState<"video" | "phone" | "onsite">("video");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setErrorMessage("Please sign in to confirm booking.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const bookingsRef = getOglesbyCollection("bookings");
      const meetingId = `oglesby-${Math.random().toString(36).substring(2, 9)}`;

      await addDoc(bookingsRef, {
        userId: currentUser.uid,
        userName: currentUser.displayName || "Patient / Client",
        userEmail: currentUser.email || "",
        consultantName: consultant,
        type: offering,
        date: date,
        time: time,
        modality: modality,
        notes: notes || "General clinical advisory and workflow review.",
        status: "CONFIRMED",
        meetingUrl: modality === "video" ? `https://meet.oglesbyhealthcare.com/${meetingId}` : null,
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      if (onBookingCreated) {
        onBookingCreated();
      }
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Error creating booking:", err);
      setErrorMessage("Failed to save booking. Please verify network or security permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
          aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-400 shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Book Patient & Practice Consultation</h3>
            <p className="text-xs text-slate-500 font-light">Oglesby Healthcare Advisory Services</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="size-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-900">Consultation Confirmed!</h4>
            <p className="text-xs text-slate-500 font-light">
              Your appointment with {consultant} has been booked into your portal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Consultant Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Select Advisory Specialist
              </label>
              <select
                value={consultant}
                onChange={(e) => setConsultant(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                <option value="Dr. Marcus Oglesby, MD, MBA">
                  Dr. Marcus Oglesby, MD, MBA &bull; Lead Clinical & Workflow Physician
                </option>
                <option value="Sarah Jenkins, JD, CHPS">
                  Sarah Jenkins, JD, CHPS &bull; Senior Healthcare Regulatory Attorney
                </option>
                <option value="Dr. Elena Rostova, MD, MS">
                  Dr. Elena Rostova, MD, MS &bull; Chief Clinical Informatics Architect
                </option>
                <option value="Michael Chang, FHFMA, CRCR">
                  Michael Chang, FHFMA, CRCR &bull; VP of Revenue Cycle Advisory
                </option>
                <option value="David Vance, MBA, CMPE">
                  David Vance, MBA, CMPE &bull; Practice Operations & ASC Director
                </option>
                <option value="Rachel Adams, CPC, CPMA">
                  Rachel Adams, CPC, CPMA &bull; Lead Clinical Documentation Auditor
                </option>
              </select>
            </div>

            {/* Offering Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Consultation Type
              </label>
              <select
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                <option value="60-Min Comprehensive Clinical & Operations Audit">
                  60-Min Comprehensive Clinical & Operations Audit
                </option>
                <option value="30-Min Initial Practice Discovery Session">
                  30-Min Initial Practice Discovery Session
                </option>
                <option value="15-Min Urgent Advisory Consultation">
                  15-Min Urgent Advisory Consultation
                </option>
                <option value="HIPAA & OCR Regulatory Defense Strategy">
                  HIPAA & OCR Regulatory Defense Strategy
                </option>
                <option value="RCM Denial Analysis & Billing Diagnostic">
                  RCM Denial Analysis & Billing Diagnostic
                </option>
              </select>
            </div>

            {/* Date, Time & Modality */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Session Modality</label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                  <option value="video">Secure Video (Telehealth)</option>
                  <option value="phone">Direct Phone Call</option>
                  <option value="onsite">On-Site Clinic Visit</option>
                </select>
              </div>
            </div>

            {/* Notes / Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Consultation Objective / Chief Concern
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe what you'd like to discuss (e.g. claim denial review, EHR optimization, practice workflow)..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>

            {errorMessage && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center space-x-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Session stored securely in your isolated HIPAA compliance account.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md disabled:opacity-50">
              {isSubmitting ? "Confirming Session..." : "Confirm & Save Appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
