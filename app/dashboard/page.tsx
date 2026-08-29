"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import DashboardView from "@/components/dashboard-view";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1a3d5c]/20 border-t-[#1a3d5c] rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading your portal…</p>
        </div>
      </div>
    );
  }

  if (!user) return null; // redirect in-flight

  return <DashboardView user={user} />;
}
