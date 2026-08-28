"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { oglesbyAuth, syncOglesbyUserProfile } from "@calcom/lib/firebase/oglesbyFirebase";
import OglesbyHeader from "@calcom/web/components/healthcare/OglesbyHeader";
import OglesbyFooter from "@calcom/web/components/healthcare/OglesbyFooter";

type LoginValues = {
  email: string;
  password?: string;
};

type PageProps = {
  safeCallbackUrl?: string | null;
};

export default function LoginView({ safeCallbackUrl = "" }: PageProps) {
  const router = useRouter();
  const methods = useForm<LoginValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: LoginValues) => {
    setErrorMessage(null);

    if (!values.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(oglesbyAuth, values.email, values.password);
      const sanitizedUid = values.email.replace(/[^a-zA-Z0-9]/g, "_");
      syncOglesbyUserProfile({
        uid: sanitizedUid,
        email: values.email,
      }).catch(() => {});

      router.push(safeCallbackUrl || "/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setErrorMessage("Invalid email or password. Please check your credentials.");
      } else {
        setErrorMessage(err.message || "Service currently unavailable. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      <OglesbyHeader />

      <main className="flex-1 flex w-full flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Brand Visual (From Stitch Layout) */}
        <div className="relative hidden lg:flex w-1/2 flex-col justify-center items-center overflow-hidden bg-slate-50 border-r border-slate-200">
          <div className="absolute top-12 left-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Oglesby<br/>Client Portal
            </h2>
          </div>
          
          {/* Light Theme Atmosphere Gradients */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px] animate-pulse-slow" />
          
          <div className="z-10 flex flex-col items-start max-w-md">
            <div className="w-16 h-px bg-cyan-600 mb-6" />
            <p className="text-lg font-light text-slate-600 tracking-wide leading-relaxed">
              Securely access your clinical records, upcoming appointments, and compliance dashboards.
            </p>
          </div>
          
          <div className="absolute bottom-8 left-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              100% HIPAA Audit Ready
            </span>
          </div>
        </div>

        {/* Right Side: Auth Form Container */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center items-center bg-white p-8 relative">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden absolute top-8 text-center w-full">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Client Portal</h2>
          </div>

          <div className="w-full max-w-[400px] rounded-2xl p-8 sm:p-10 flex flex-col gap-8 z-10 relative bg-white border border-slate-200 shadow-sm">
            
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Access Protocol</h1>
              <p className="text-sm font-light text-slate-500">Sign in to continue to your dashboard.</p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {errorMessage && (
                  <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Corporate ID / Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.05em] font-bold text-slate-500" htmlFor="email">
                    Corporate ID / Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    {...methods.register("email")}
                    placeholder="name@oglesby.health"
                    className="rounded-md h-11 px-4 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Security Key / Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase tracking-[0.05em] font-bold text-slate-500" htmlFor="password">
                      Security Key
                    </label>
                    <Link href="/auth/forgot-password" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...methods.register("password")}
                      placeholder="••••••••"
                      className="rounded-md h-11 px-4 pr-10 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  className="w-full h-11 mt-2 flex justify-center items-center gap-2 rounded-md bg-white border border-cyan-600 text-cyan-700 uppercase text-sm font-bold tracking-[0.1em] transition-all hover:bg-cyan-50 focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 group"
                >
                  {methods.formState.isSubmitting ? "Authenticating..." : "Initialize Session"}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </FormProvider>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">or</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Alternative Action */}
            <Link 
              href="/signup"
              className="w-full h-11 flex justify-center items-center gap-2 rounded-md bg-slate-900 text-white uppercase text-sm font-bold tracking-[0.1em] transition-all hover:bg-slate-800 focus:ring-2 focus:ring-slate-900"
            >
              Request Access Portal
            </Link>

          </div>
        </div>
      </main>
      
      <OglesbyFooter />
    </div>
  );
}
