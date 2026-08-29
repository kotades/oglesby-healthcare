import type { Metadata } from "next";
import DashboardView from "@/components/dashboard-view";

export const metadata: Metadata = {
  title: "Client Portal & Practice Dashboard | Oglesby Healthcare",
  description: "Oglesby Healthcare Consulting client portal and HIPAA practice dashboard.",
};

export default function DashboardPage() {
  return <DashboardView user={null} />;
}
