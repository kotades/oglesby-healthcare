import type { AppMeta } from "@calcom/types/App";

// We have to import all the booker-apps config/metadata in here as without importing that we can't dig into their config and read their props
// It isn't a  significant bundle-size impact as we are only importing the metadata of only the booker apps, but when it becomes a problem we can figure out a solution
import { appStoreMetadata as rawBookerAppsMetadata } from "./bookerApps.metadata.generated";
import { getNormalizedAppMetadata } from "./getNormalizedAppMetadata";

type RawAppStoreMetaData = typeof rawBookerAppsMetadata;
type AppStoreMetaData = {
  [key in keyof RawAppStoreMetaData]: AppMeta;
};

const ESSENTIAL_HEALTHCARE_APPS = new Set([
  "googlecalendar",
  "office365calendar",
  "applecalendar",
  "dailyvideo",
  "zoomvideo",
  "googlevideo",
  "stripepayment",
  "sendgrid",
  "cron",
]);

export const appStoreMetadata = {} as AppStoreMetaData;
for (const [key, value] of Object.entries(rawBookerAppsMetadata)) {
  if (ESSENTIAL_HEALTHCARE_APPS.has(key)) {
    appStoreMetadata[key as keyof typeof rawBookerAppsMetadata] = getNormalizedAppMetadata(value);
  }
}
