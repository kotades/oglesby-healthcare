import { Phone, Mail, MapPin, Clock, Send, ShieldCheck } from "lucide-react";
import { COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_NAME } from "@calcom/lib/constants";

export const metadata = {
  title: "Contact Us | Oglesby Healthcare Consulting",
  description: "Contact Oglesby Healthcare Consulting in Shreveport, Louisiana by phone at +1 318 232 6195 or online inquiry.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
                    {/* Banner */}
        <div className="bg-gradient-to-b from-teal-50/60 to-white py-16 border-b border-cyan-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-300/60">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Contact Oglesby Healthcare Consulting
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about clinical audits, HIPAA compliance, or telehealth setup? Reach out to our Shreveport headquarters.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-slate-900">Direct Office Contact</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our advisory team is ready to discuss your medical practice objectives. Contact us by phone or visit our offices.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Support</span>
                    <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`} className="text-base font-bold text-slate-900 block hover:text-cyan-700">
                      {COMPANY_PHONE}
                    </a>
                    <span className="text-[11px] text-slate-500">Mon-Fri: 8:00 AM - 6:00 PM CST</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Headquarters Address</span>
                    <span className="text-sm font-bold text-slate-900 block">{COMPANY_ADDRESS}</span>
                    <span className="text-[11px] text-slate-500">Shreveport, Louisiana 71113</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Inquiry</span>
                    <a href="mailto:contact@oglesbyhealthcare.com" className="text-sm font-bold text-slate-900 block hover:text-cyan-700">
                      contact@oglesbyhealthcare.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="lg:col-span-7 backdrop-blur-xl bg-white p-8 rounded-3xl border border-cyan-200/80 shadow-lg shadow-cyan-900/5 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Send an Advisory Inquiry</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below and an Oglesby Healthcare Consultant will respond within 24 business hours.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@clinic.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (318) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Practice / Organization</label>
                    <input
                      type="text"
                      placeholder="Shreveport Medical Group"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your practice goals, clinical compliance needs, or telehealth integration inquiries..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 shadow-md shadow-cyan-600/20 hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Oglesby Team</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
                </div>
  );
}
