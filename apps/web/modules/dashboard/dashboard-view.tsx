"use client";

import {
  getOglesbyCollection,
  getOglesbyDoc,
  oglesbyAuth,
  oglesbyDb,
} from "@calcom/lib/firebase/oglesbyFirebase";
import { DocumentUploader } from "@calcom/web/components/healthcare/DocumentUploader";
import { QuickBookingModal } from "@calcom/web/components/healthcare/modals/QuickBookingModal";
import { signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck,
  FileSpreadsheet,
  FileText,
  FileUp,
  FolderOpen,
  Headphones,
  HelpCircle,
  Hospital,
  Info,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  Upload,
  User,
  UserCheck,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ConsultationBooking {
  id: string;
  consultantName: string;
  type: string;
  date: string;
  time: string;
  modality: "video" | "phone" | "onsite";
  notes?: string;
  status: "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  meetingUrl?: string | null;
  createdAt?: any;
}

interface IntakeFormData {
  practiceName?: string;
  specialty?: string;
  primaryConcern?: string;
  phone?: string;
  urgency?: string;
  additionalNotes?: string;
  submittedAt?: any;
}

interface PatientDocument {
  id: string;
  fileName: string;
  fileSize?: number;
  fileType?: string;
  downloadUrl: string;
  storagePath: string;
  category?: string;
  createdAt?: any;
}

function DashboardHeader({ user }: { user: any }) {
  const handleSignOut = async () => {
    await firebaseSignOut(oglesbyAuth);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-emerald-500 shadow-xs transition-transform group-hover:scale-105">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                Oglesby<span className="text-cyan-600">.</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Patient & Client Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {user?.displayName || user?.name || user?.email?.split("@")[0] || "Patient / Client"}
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              HIPAA Secure Account
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-900 text-cyan-400 border border-slate-200 flex items-center justify-center font-bold text-xs shadow-xs">
            {(user?.displayName || user?.email || "P").charAt(0).toUpperCase()}
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Sign Out">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default function DashboardView({ user: initialUser }: { user: any }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(initialUser);
  const [loading, setLoading] = useState(true);

  // Live Firestore State
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [intakeData, setIntakeData] = useState<IntakeFormData | null>(null);
  const [documents, setDocuments] = useState<PatientDocument[]>([]);

  // Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  // Intake Form Inputs
  const [intakePractice, setIntakePractice] = useState("");
  const [intakeSpecialty, setIntakeSpecialty] = useState("Ambulatory Surgery Center (ASC)");
  const [intakeConcern, setIntakeConcern] = useState("Clinical Workflow & Capacity Bottlenecks");
  const [intakePhone, setIntakePhone] = useState("");
  const [intakeUrgency, setIntakeUrgency] = useState("Standard (Within 1-2 weeks)");
  const [intakeNotes, setIntakeNotes] = useState("");
  const [isSavingIntake, setIsSavingIntake] = useState(false);

  // Auth & Live Firestore Listeners
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(oglesbyAuth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);

        // 1. Live Bookings Listener
        const bookingsQuery = query(
          getOglesbyCollection("bookings"),
          where("userId", "==", firebaseUser.uid)
        );
        const unsubscribeBookings = onSnapshot(
          bookingsQuery,
          (snapshot) => {
            const fetched = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            })) as ConsultationBooking[];
            // Sort in memory by date/createdAt
            fetched.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
            setBookings(fetched);
          },
          (err) => {
            if (err.code !== "permission-denied") {
              console.warn("Bookings snapshot notice:", err);
            }
          }
        );

        // 2. Live Intake Data Listener
        const intakeDocRef = getOglesbyDoc("intake_forms", firebaseUser.uid);
        const unsubscribeIntake = onSnapshot(
          intakeDocRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data() as IntakeFormData;
              setIntakeData(data);
              setIntakePractice(data.practiceName || "");
              setIntakeSpecialty(data.specialty || "Ambulatory Surgery Center (ASC)");
              setIntakeConcern(data.primaryConcern || "Clinical Workflow & Capacity Bottlenecks");
              setIntakePhone(data.phone || "");
              setIntakeUrgency(data.urgency || "Standard (Within 1-2 weeks)");
              setIntakeNotes(data.additionalNotes || "");
            } else {
              setIntakeData(null);
            }
          },
          (err) => {
            if (err.code !== "permission-denied") {
              console.warn("Intake snapshot notice:", err);
            }
          }
        );

        // 3. Live Documents Listener
        const docsQuery = query(getOglesbyCollection("documents"), where("userId", "==", firebaseUser.uid));
        const unsubscribeDocs = onSnapshot(
          docsQuery,
          (snapshot) => {
            const fetchedDocs = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            })) as PatientDocument[];
            setDocuments(fetchedDocs);
            setLoading(false);
          },
          (err) => {
            if (err.code !== "permission-denied") {
              console.warn("Docs snapshot notice:", err);
            }
            setLoading(false);
          }
        );

        return () => {
          unsubscribeBookings();
          unsubscribeIntake();
          unsubscribeDocs();
        };
      } else {
        router.push("/auth/login");
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // Handle Cancel Booking
  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this scheduled consultation?")) return;
    try {
      const bookingRef = doc(oglesbyDb, "oglesby_healthcare", "v1", "bookings", bookingId);
      await updateDoc(bookingRef, {
        status: "CANCELLED",
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking. Please check your connection.");
    }
  };

  // Handle Submit Intake
  const handleSaveIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSavingIntake(true);
    try {
      const intakeRef = getOglesbyDoc("intake_forms", currentUser.uid);
      await setDoc(
        intakeRef,
        {
          userId: currentUser.uid,
          userEmail: currentUser.email || "",
          userName: currentUser.displayName || "Patient / Client",
          practiceName: intakePractice,
          specialty: intakeSpecialty,
          primaryConcern: intakeConcern,
          phone: intakePhone,
          urgency: intakeUrgency,
          additionalNotes: intakeNotes,
          submittedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Sync user doc status
      const userRef = getOglesbyDoc("users", currentUser.uid);
      await setDoc(
        userRef,
        {
          hasCompletedIntake: true,
          phone: intakePhone,
          organization: intakePractice,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setIsIntakeModalOpen(false);
    } catch (err) {
      console.error("Error saving intake form:", err);
      alert("Failed to save intake. Please verify your connection.");
    } finally {
      setIsSavingIntake(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
          <Activity className="size-8 text-cyan-600 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Loading Patient Account & Consultations...
          </p>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "IN_PROGRESS");
  const pastBookings = bookings.filter((b) => b.status === "COMPLETED" || b.status === "CANCELLED");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white flex flex-col">
      <DashboardHeader user={currentUser} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Patient Context Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-[10px] font-bold uppercase tracking-wider">
              <Stethoscope className="size-3 text-cyan-600" />
              Patient & Client Advisory Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {currentUser?.displayName || currentUser?.email?.split("@")[0] || "Patient / Client"}
            </h1>
            <p className="text-slate-500 text-xs font-normal">
              Account ID:{" "}
              <code className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                {currentUser?.uid?.substring(0, 12)}...
              </code>{" "}
              &bull; Email: <strong className="text-slate-700">{currentUser?.email}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsUploaderOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors shadow-xs">
              <Upload className="size-3.5 text-cyan-600" />
              Upload Medical Files
            </button>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-xs">
              <CalendarPlus className="size-3.5 text-cyan-400" />
              Book Consultation
            </button>
          </div>
        </div>

        {/* Real Patient Status & Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Consultations */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Active Consultations</span>
              <Calendar className="size-4 text-cyan-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{activeBookings.length}</span>
              <span className="text-xs font-bold text-slate-500">
                {activeBookings.length === 1 ? "Scheduled Session" : "Scheduled Sessions"}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 font-light">
              Real-time bookings from Firestore
            </span>
          </div>

          {/* Intake Status */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Clinical Intake</span>
              <FileCheck className="size-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              {intakeData ? (
                <span className="text-xl font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                  Submitted
                </span>
              ) : (
                <span className="text-xl font-extrabold text-amber-700 flex items-center gap-1.5">
                  <AlertCircle className="size-5 text-amber-600 shrink-0" />
                  Action Required
                </span>
              )}
            </div>
            <button
              onClick={() => setIsIntakeModalOpen(true)}
              className="text-[10px] text-cyan-700 font-bold hover:underline mt-2 text-left">
              {intakeData ? "View / Edit Intake Details &rarr;" : "Complete Intake Form Now &rarr;"}
            </button>
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Medical Files Vault</span>
              <FolderOpen className="size-4 text-teal-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{documents.length}</span>
              <span className="text-xs font-bold text-slate-500">
                {documents.length === 1 ? "Uploaded File" : "Uploaded Files"}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 font-light">Encrypted cloud repository</span>
          </div>

          {/* Compliance & Security */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>HIPAA Status</span>
              <ShieldCheck className="size-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                BAA Enforced
              </span>
            </div>
            <Link href="/bba" className="text-[10px] text-cyan-700 font-bold hover:underline mt-2">
              Review BAA Agreement &rarr;
            </Link>
          </div>
        </div>

        {/* Patient Onboarding Roadmap (If 0 Bookings or Incomplete Intake) */}
        {bookings.length === 0 && (
          <div className="bg-gradient-to-r from-cyan-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-800/60 border border-cyan-700/50 text-cyan-200 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="size-3" />
                Getting Started with Your Consultancy
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Complete These Steps to Begin Your Advisory Program
              </h2>
              <p className="text-cyan-200/80 text-xs font-light">
                Follow this quick 3-step checklist to ensure our specialists have your full clinical context
                prior to your session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Step 1 */}
              <div className="p-5 rounded-xl bg-white/10 border border-white/15 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      STEP 1
                    </span>
                    {intakeData && <CheckCircle2 className="size-4 text-emerald-400" />}
                  </div>
                  <h3 className="text-sm font-bold text-white">Fill Out Clinical Intake</h3>
                  <p className="text-xs text-cyan-100/70 font-light">
                    Share your medical practice specialty, chief operational goals, and contact details.
                  </p>
                </div>
                <button
                  onClick={() => setIsIntakeModalOpen(true)}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors">
                  {intakeData ? "Review Intake Data" : "Complete Intake Form"}
                </button>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl bg-white/10 border border-white/15 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      STEP 2
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Book Advisory Consultation</h3>
                  <p className="text-xs text-cyan-100/70 font-light">
                    Reserve a 60-min audit or 30-min discovery session with Dr. Marcus Oglesby or our
                    legal/RCM team.
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-colors">
                  Schedule Consultation
                </button>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl bg-white/10 border border-white/15 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      STEP 3
                    </span>
                    {documents.length > 0 && <CheckCircle2 className="size-4 text-emerald-400" />}
                  </div>
                  <h3 className="text-sm font-bold text-white">Upload Practice Records</h3>
                  <p className="text-xs text-cyan-100/70 font-light">
                    Securely upload EHR sample reports, claim denial samples, or policy binders.
                  </p>
                </div>
                <button
                  onClick={() => setIsUploaderOpen(true)}
                  className="w-full py-2 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors">
                  Upload Documentation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid: My Consultations & Intake Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consultations Section (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Consultations Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CalendarCheck className="size-5 text-cyan-600" />
                    My Scheduled Consultations
                  </h2>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Live advisory appointments, video links, and status tracking
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs self-start sm:self-auto">
                  <Plus className="size-3.5" />
                  Book New Session
                </button>
              </div>

              {/* List of Active Consultations */}
              {activeBookings.length === 0 ? (
                <div className="py-12 px-4 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <Calendar className="size-10 text-slate-400 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-800">No Upcoming Consultations</h3>
                  <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">
                    You currently have no active appointments booked. Select a date to meet with our clinical
                    advisory specialists.
                  </p>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs">
                    Schedule Your First Session
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-300 transition-all space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-xl bg-slate-900 text-cyan-400 flex flex-col items-center justify-center shrink-0 shadow-xs">
                            <span className="text-[9px] font-bold uppercase">
                              {new Date(b.date).toLocaleDateString("en-US", { month: "short" })}
                            </span>
                            <span className="text-base font-black leading-none">
                              {new Date(b.date).getDate()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                              {b.type}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">{b.consultantName}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            {b.status}
                          </span>
                        </div>
                      </div>

                      {/* Date, Time & Modality Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5 text-slate-400" />
                          <span>
                            {new Date(b.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="size-3.5 text-slate-400" />
                          <span>{b.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {b.modality === "video" ? (
                            <Video className="size-3.5 text-cyan-600" />
                          ) : (
                            <Phone className="size-3.5 text-emerald-600" />
                          )}
                          <span className="capitalize">{b.modality} Consultation</span>
                        </div>
                      </div>

                      {b.notes && (
                        <p className="text-xs text-slate-500 font-light italic bg-slate-100/70 p-2.5 rounded-lg">
                          &ldquo;{b.notes}&rdquo;
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                          {b.meetingUrl && b.modality === "video" && (
                            <a
                              href={b.meetingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs">
                              <Video className="size-3.5" />
                              Join Video Session
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors">
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past / Completed History (If any) */}
            {pastBookings.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Past Consultation History ({pastBookings.length})
                </h3>
                <div className="space-y-3">
                  {pastBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between opacity-80">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{b.type}</span>
                        <h4 className="text-xs font-bold text-slate-800">{b.consultantName}</h4>
                        <span className="text-[11px] text-slate-500 font-light">
                          {b.date} &bull; {b.time}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${b.status === "COMPLETED" ? "bg-slate-200 text-slate-700" : "bg-rose-100 text-rose-700"}`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Clinical Intake Summary & Documents */}
          <div className="space-y-6">
            {/* Clinical Intake Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="size-4 text-cyan-600" />
                  Clinical Intake Profile
                </h3>
                <button
                  onClick={() => setIsIntakeModalOpen(true)}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1">
                  <Edit3 className="size-3" />
                  {intakeData ? "Edit" : "Fill"}
                </button>
              </div>

              {intakeData ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Practice / Facility
                    </span>
                    <span className="font-semibold text-slate-900">
                      {intakeData.practiceName || "Not specified"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Clinical Specialty
                    </span>
                    <span className="font-semibold text-slate-900">{intakeData.specialty}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Chief Objective
                    </span>
                    <span className="font-semibold text-slate-900">{intakeData.primaryConcern}</span>
                  </div>

                  {intakeData.phone && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Contact Phone
                      </span>
                      <span className="font-semibold text-slate-900">{intakeData.phone}</span>
                    </div>
                  )}

                  {intakeData.urgency && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Timeline</span>
                      <span className="font-semibold text-slate-900">{intakeData.urgency}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-2">
                  <AlertCircle className="size-6 text-amber-600 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-900">Intake Incomplete</h4>
                  <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                    Please submit your practice background so our specialists can prepare for your review.
                  </p>
                  <button
                    onClick={() => setIsIntakeModalOpen(true)}
                    className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs">
                    Complete Intake Form
                  </button>
                </div>
              )}
            </div>

            {/* Document Vault Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="size-4 text-teal-600" />
                  My Uploaded Documents
                </h3>
                <button
                  onClick={() => setIsUploaderOpen(true)}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1">
                  <Plus className="size-3" />
                  Upload
                </button>
              </div>

              {documents.length === 0 ? (
                <div className="py-6 text-center bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                  <FileUp className="size-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No Documents Uploaded</p>
                  <p className="text-[11px] text-slate-500 font-light">
                    Upload medical intake forms, claim denial batches, or BAA documentation.
                  </p>
                  <button
                    onClick={() => setIsUploaderOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs">
                    Upload File
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <FileText className="size-4 text-cyan-600 shrink-0" />
                        <div className="truncate">
                          <h4 className="text-xs font-semibold text-slate-900 truncate">{doc.fileName}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {doc.fileSize ? `${Math.round(doc.fileSize / 1024)} KB` : "Cloud File"}
                          </span>
                        </div>
                      </div>
                      <a
                        href={doc.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-cyan-700 hover:text-cyan-900 rounded hover:bg-cyan-50 transition-colors shrink-0"
                        title="Download Document">
                        <Download className="size-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Support Desk Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-cyan-400">
                <Headphones className="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Clinical Advisory Concierge
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Need immediate assistance with an upcoming OCR audit or priority emergency consultation?
              </p>
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Direct Desk:</span>
                <a href="tel:+13182860882" className="font-bold text-cyan-400 hover:underline">
                  +1 (318) 286-0882
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <QuickBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      {/* Clinical Intake Modal */}
      {isIntakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsIntakeModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="size-10 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold">
                <FileText className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Clinical & Practice Intake Form</h3>
                <p className="text-xs text-slate-500 font-light">
                  Directly saved to your isolated HIPAA compliance file
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveIntake} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Practice / Facility Name
                </label>
                <input
                  type="text"
                  required
                  value={intakePractice}
                  onChange={(e) => setIntakePractice(e.target.value)}
                  placeholder="e.g. Apex Multi-Specialty Clinic"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Specialty</label>
                  <select
                    value={intakeSpecialty}
                    onChange={(e) => setIntakeSpecialty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                    <option value="Ambulatory Surgery Center (ASC)">Ambulatory Surgery Center (ASC)</option>
                    <option value="Hospital & Health System">Hospital & Health System</option>
                    <option value="Multi-Specialty Medical Group">Multi-Specialty Medical Group</option>
                    <option value="Orthopedic & Surgical Practice">Orthopedic & Surgical Practice</option>
                    <option value="Family Medicine & Primary Care">Family Medicine & Primary Care</option>
                    <option value="Telehealth & Digital Health Platform">
                      Telehealth & Digital Health Platform
                    </option>
                    <option value="Solo / Independent Physician">Solo / Independent Physician</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={intakePhone}
                    onChange={(e) => setIntakePhone(e.target.value)}
                    placeholder="+1 (318) 555-0199"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Advisory Objective
                </label>
                <select
                  value={intakeConcern}
                  onChange={(e) => setIntakeConcern(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                  <option value="Clinical Workflow & Capacity Bottlenecks">
                    Clinical Workflow & Capacity Bottlenecks
                  </option>
                  <option value="HIPAA, HITECH & OCR Regulatory Defense">
                    HIPAA, HITECH & OCR Regulatory Defense
                  </option>
                  <option value="Revenue Cycle Management (RCM) & Denial Recovery">
                    Revenue Cycle Management (RCM) & Denial Recovery
                  </option>
                  <option value="EHR Migration & Informatics Interoperability">
                    EHR Migration & Informatics Interoperability
                  </option>
                  <option value="Executive Practice Valuation & Expansion">
                    Executive Practice Valuation & Expansion
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Urgency</label>
                <select
                  value={intakeUrgency}
                  onChange={(e) => setIntakeUrgency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white">
                  <option value="Standard (Within 1-2 weeks)">Standard (Within 1-2 weeks)</option>
                  <option value="Priority (Within 3-5 days)">Priority (Within 3-5 days)</option>
                  <option value="Emergency (Within 24 hours - Audit/OCR Issue)">
                    Emergency (Within 24 hours - Audit/OCR Issue)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Background Details
                </label>
                <textarea
                  rows={3}
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  placeholder="Describe your current EHR system (Epic, AthenaHealth, Cerner), patient volume, or specific issues..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingIntake}
                className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md disabled:opacity-50">
                {isSavingIntake ? "Saving Intake Data..." : "Submit Clinical Intake"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Document Uploader Modal */}
      {isUploaderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setIsUploaderOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
              <X className="size-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900">Upload Patient & Practice Records</h3>
            <p className="text-xs text-slate-500 font-light">
              Securely transmit EHR records, claim denial batches, or BAA forms directly to your isolated
              cloud repository.
            </p>
            <DocumentUploader
              category="documents"
              entityId={currentUser?.uid || "patient_records"}
              onUploadSuccess={() => {
                setTimeout(() => setIsUploaderOpen(false), 1500);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
