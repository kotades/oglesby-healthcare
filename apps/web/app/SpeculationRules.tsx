import Script from "next/script";

export function SpeculationRules({
  prefetchPathsOnHover = [],
  prerenderPathsOnHover = [],
}: {
  prefetchPathsOnHover?: string[];
  prerenderPathsOnHover?: string[];
}) {
  const speculationRules = {
    prefetch: [
      {
        urls: prefetchPathsOnHover,
        eagerness: "moderate",
      },
    ],
    prerender: [
      {
        urls: prerenderPathsOnHover,
        eagerness: "moderate",
      },
    ],
  };

  if (!prefetchPathsOnHover.length && !prerenderPathsOnHover.length) {
    return null;
  }

  return (
    <Script
      id="speculation-rules"
      type="speculationrules"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `${JSON.stringify(speculationRules)}`,
      }}
    />
  );
}
