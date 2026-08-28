"use client";

import { Calendar, FileText, Settings, User, Activity, Bell, Search, Plus, Clock, ChevronRight, LogOut, ActivitySquare, TrendingDown, TrendingUp, AlertCircle, FileCheck, CheckCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { oglesbyAuth, oglesbyDb, getOglesbyCollectionPath } from "@calcom/lib/firebase/oglesbyFirebase";

function DashboardHeader({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-emerald-500 shadow-md shadow-cyan-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 hidden sm:block">
            OGLESBY <span className="font-medium text-cyan-600">PORTAL</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all w-64 shadow-sm"
            />
          </div>

          <button className="relative p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-full hover:bg-slate-50">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 border-2 border-white" />
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-900 leading-tight">{user?.name || "Client"}</span>
              <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">HIPAA Secure Session</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
              <User className="size-4" />
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-2 p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="Secure Sign Out"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function DashboardView({ user: initialUser }: { user: any }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(oglesbyAuth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({ id: firebaseUser.uid, name: firebaseUser.displayName, email: firebaseUser.email });
        
        try {
          const bookingsRef = collection(oglesbyDb, getOglesbyCollectionPath("bookings"));
          const q = query(bookingsRef, orderBy("date", "asc"));
          const snapshot = await getDocs(q);
          const fetchedBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookings(fetchedBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Activity className="size-8 text-cyan-500 animate-pulse" />
          <p className="text-sm font-medium text-slate-500">Establishing Secure Connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      <DashboardHeader user={user} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Executive Dashboard</h1>
          <p className="text-slate-500 text-sm tracking-wide">
            Live operational metrics and immediate action items. Last updated: <span className="font-mono text-xs font-semibold text-slate-600">{new Date().toLocaleTimeString('en-US')}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Pulse Widget (Span 2) - Translated from Stitch Design to Light Theme */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col min-h-[400px]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ActivitySquare className="size-5 text-cyan-600" />
                  Pulse: Patient Volume
                </h3>
                <p className="text-sm text-slate-500 mt-1">Real-time clinic throughput vs. capacity</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider">
                  LIVE
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Current Volume</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">142</span>
                  <span className="text-xs text-cyan-600 font-bold flex items-center gap-0.5"><TrendingUp className="size-3"/> +12%</span>
                </div>
              </div>
              
              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Avg Wait Time</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">14<span className="text-lg text-slate-500 ml-1">m</span></span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5"><TrendingDown className="size-3"/> -2m</span>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Capacity Util</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">87<span className="text-lg text-slate-500 ml-1">%</span></span>
                  <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">Near Limit</span>
                </div>
              </div>
            </div>

            {/* Fake Chart Area */}
            <div className="flex-1 relative w-full h-[180px] mt-auto rounded-xl bg-gradient-to-b from-transparent to-slate-50 border-b-2 border-cyan-500/20 overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                <div className="border-b border-slate-900 border-dashed w-full h-0"></div>
                <div className="border-b border-slate-900 border-dashed w-full h-0"></div>
                <div className="border-b border-slate-900 border-dashed w-full h-0"></div>
                <div className="border-b border-slate-900 border-dashed w-full h-0"></div>
              </div>
              {/* Fake Line Path */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q10,70 20,85 T40,60 T60,50 T80,30 T100,20 L100,100 L0,100 Z" fill="rgba(6, 182, 212, 0.1)" stroke="none" />
                <path d="M0,80 Q10,70 20,85 T40,60 T60,50 T80,30 T100,20" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            {/* Compliance / Action Items */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">Action Items</h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold">2 PENDING</span>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors group cursor-pointer">
                  <div className="mt-0.5 size-2 rounded-full bg-rose-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">Complete Intake Form</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Required before consultation.</p>
                  </div>
                </li>
                <li className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group cursor-pointer">
                  <div className="mt-0.5 size-2 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Review Privacy Policy</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Updated HIPAA guidelines.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Upcoming Consultations */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">Upcoming</h2>
                <button className="text-xs text-cyan-600 font-semibold hover:text-cyan-700">View Calendar</button>
              </div>
              
              {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50 rounded-xl border border-slate-100">
                  <Calendar className="size-6 text-slate-400 mb-2" />
                  <p className="text-xs font-medium text-slate-600">No scheduled sessions</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-cyan-50 border border-cyan-100 flex flex-col items-center justify-center text-cyan-700">
                          <span className="text-[8px] font-bold uppercase">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                          <span className="text-sm font-black leading-none">{new Date(booking.date).getDate()}</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">{booking.type || "Consultation"}</h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1"><Clock className="size-3" /> {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-slate-400 group-hover:text-cyan-600" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
