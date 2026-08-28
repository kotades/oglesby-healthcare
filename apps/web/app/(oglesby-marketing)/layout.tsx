import { OglesbyFooter } from "@components/healthcare/OglesbyFooter";
import { OglesbyHeader } from "@components/healthcare/OglesbyHeader";

export default function OglesbyMarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-cyan-500 selection:text-white font-sans antialiased">
      <OglesbyHeader />
      <div className="flex-grow">{children}</div>
      <OglesbyFooter />
    </div>
  );
}
