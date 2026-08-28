import { OglesbyFooter } from "@components/healthcare/OglesbyFooter";
import { OglesbyHeader } from "@components/healthcare/OglesbyHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oglesby Healthcare Consulting | Clinical Operations & Compliance",
  description:
    "Empowering medical practices and health systems to optimize clinical workflows, enforce HIPAA compliance, and maximize revenue cycle performance.",
  icons: {
    icon: "/oglesby-favicon.svg",
    shortcut: "/oglesby-favicon.svg",
    apple: "/oglesby-favicon.svg",
  },
};

export default function OglesbyMarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-cyan-500 selection:text-white font-sans antialiased">
      <OglesbyHeader />
      <div className="flex-grow">{children}</div>
      <OglesbyFooter />
    </div>
  );
}
