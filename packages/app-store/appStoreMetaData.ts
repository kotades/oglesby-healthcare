import type { AppMeta } from "@calcom/types/App";

import { appStoreMetadata as rawAppStoreMetadata } from "./apps.metadata.generated";
import { getNormalizedAppMetadata } from "./getNormalizedAppMetadata";

type RawAppStoreMetaData = typeof rawAppStoreMetadata;
type AppStoreMetaData = {
  [key in keyof RawAppStoreMetaData]: Omit<AppMeta, "dirName"> & { dirName: string };
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
for (const [key, value] of Object.entries(rawAppStoreMetadata)) {
  if (ESSENTIAL_HEALTHCARE_APPS.has(key)) {
    appStoreMetadata[key as keyof typeof appStoreMetadata] = getNormalizedAppMetadata(value);
  }
}
