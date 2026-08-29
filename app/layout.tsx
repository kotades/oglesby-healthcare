import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import React from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0891b2",
};

export const metadata: Metadata = {
  title: {
    default: "Oglesby Healthcare Consulting | Practice Operations & Client Portal",
    template: "%s | Oglesby Healthcare Consulting",
  },
  description:
    "Empowering medical practices and health systems to optimize clinical workflows, enforce HIPAA compliance, and maximize revenue cycle performance.",
  icons: {
    icon: "/oglesby-favicon.svg",
    apple: "/oglesby-favicon.svg",
    shortcut: "/oglesby-favicon.svg",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
