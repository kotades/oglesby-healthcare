import type { ReadonlyURLSearchParams } from "next/navigation";

export function getUniqueIdentifierForBookingPage({ pathname }: { pathname: string }) {
  if (pathname === "/") {
    return "/";
  }
  const pathTokens = pathname.split("/").slice(1);
  const startsWithTeam = pathTokens[0] === "team";
  const isPrivateBookingPage = pathTokens[0] === "d";
  const isDynamicBookingPage = pathTokens[0].toLowerCase().split(/\+|%2B/).length > 1;
  if (isPrivateBookingPage) {
    return pathTokens[1];
  }
  if (isDynamicBookingPage) {
    return pathTokens[0];
  }
  if (startsWithTeam) {
    return pathTokens[1];
  }
  return pathTokens[0];
}

export function getThemeProviderProps({
  props,
}: {
  props: {
    isBookingPage: boolean;
    nonce: string | undefined;
    isThemeSupported?: boolean | undefined;
  };
  isEmbedMode?: boolean;
  embedNamespace?: string | null;
  pathname?: string | null;
  searchParams?: ReadonlyURLSearchParams | null;
}) {
  return {
    key: "forcedThemeKey",
    storageKey: "forcedThemeKey",
    forcedTheme: "light",
    attribute: "class",
    nonce: props.nonce,
    enableColorScheme: false,
    enableSystem: false,
  };
}
