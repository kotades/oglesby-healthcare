import { EmbeddedBooker } from "@components/healthcare/EmbeddedBooker";
import { FaqSection } from "@components/healthcare/FaqSection";
import { MetricsSection } from "@components/healthcare/MetricsSection";
import { OglesbyHero } from "@components/healthcare/OglesbyHero";
import { ServicesGrid } from "@components/healthcare/ServicesGrid";

const OglesbyPortalPage = () => {
  return (
    <main className="w-full">
      <OglesbyHero />
      <MetricsSection />
      <ServicesGrid />
      <EmbeddedBooker />
      <FaqSection />
    </main>
  );
};

export default OglesbyPortalPage;
