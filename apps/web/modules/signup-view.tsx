"use client";

import { oglesbyAuth, syncOglesbyUserProfile } from "@calcom/lib/firebase/oglesbyFirebase";
import { OglesbyFooter } from "@calcom/web/components/healthcare/OglesbyFooter";
import { OglesbyHeader } from "@calcom/web/components/healthcare/OglesbyHeader";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Activity, AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type SignupValues = {
  name: string;
  email: string;
  password?: string;
};

export default function SignupView() {
  const router = useRouter();
  const methods = useForm<SignupValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: SignupValues) => {
    setErrorMessage(null);

    if (!values.name || values.name.trim().length === 0) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!values.email || values.email.trim().length === 0) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!values.password || values.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        oglesbyAuth,
        values.email.trim(),
        values.password
      );

      await updateProfile(userCredential.user, {
        displayName: values.name.trim(),
      });

      await syncOglesbyUserProfile({
        uid: userCredential.user.uid,
        email: values.email.trim(),
        name: values.name.trim(),
        role: "CLIENT",
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("An account with this email address already exists. Please sign in.");
      } else if (err.code === "auth/weak-password") {
        setErrorMessage("Password is too weak. Please use at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else {
        setErrorMessage("Unable to create your account. Please check your internet connection.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      <OglesbyHeader />

      <main className="flex-1 flex w-full flex-col lg:flex-row items-stretch">
        {/* Left Side: Brand Context */}
        <div className="relative hidden lg:flex w-1/2 flex-col justify-between p-12 bg-white border-r border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-900 text-cyan-400">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Oglesby<span className="text-cyan-600">.</span>
              </span>
            </div>
          </div>

          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Create Your Patient & Advisory Account
            </h2>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Schedule direct consultations with healthcare specialists, complete your clinical intake
              questionnaire, and access audit reports in your secure portal.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 self-start">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Encrypted with HIPAA Tier-II Zero-Trust Security</span>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-[420px] rounded-2xl p-8 sm:p-10 flex flex-col gap-6 bg-white border border-slate-200 shadow-sm">
            {/* Header */}
            <div className="space-y-1.5 text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-slate-500">
                Sign up to book and track your healthcare consultations.
              </p>
            </div>

            {/* Custom Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in-0">
                <AlertCircle className="size-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      {...methods.register("name")}
                      placeholder="Dr. Arthur Mercer"
                      className="rounded-xl h-11 pl-10 pr-4 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-2 focus:ring-cyan-600/20 transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      {...methods.register("email")}
                      placeholder="name@example.com"
                      className="rounded-xl h-11 pl-10 pr-4 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-2 focus:ring-cyan-600/20 transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...methods.register("password")}
                      placeholder="At least 6 characters"
                      className="rounded-xl h-11 pl-10 pr-10 text-sm w-full bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-2 focus:ring-cyan-600/20 transition-all placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  className="w-full h-11 mt-2 flex justify-center items-center gap-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-800 focus:ring-2 focus:ring-cyan-600 focus:outline-none disabled:opacity-50 shadow-sm cursor-pointer">
                  {methods.formState.isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </FormProvider>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">or</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Sign In Link */}
            <Link
              href="/auth/login"
              className="w-full h-11 flex justify-center items-center gap-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-50 hover:border-slate-400 shadow-xs">
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      </main>

      <OglesbyFooter />
    </div>
  );
}
