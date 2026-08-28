import { OglesbyHero } from "@components/healthcare/OglesbyHero";
import { ServicesGrid } from "@components/healthcare/ServicesGrid";
import { EmbeddedBooker } from "@components/healthcare/EmbeddedBooker";

const OglesbyPortalPage = () => {
  return (
    <main className="w-full">
      <OglesbyHero />
      <ServicesGrid />
      <EmbeddedBooker />
    </main>
  );
};

export default OglesbyPortalPage;
