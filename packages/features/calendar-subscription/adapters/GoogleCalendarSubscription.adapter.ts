import type { calendar_v3 } from "@googleapis/calendar";
import { v4 as uuid } from "uuid";

import dayjs from "@calcom/dayjs";
import { CalendarCacheEventService } from "@calcom/features/calendar-subscription/lib/cache/CalendarCacheEventService";
import logger from "@calcom/lib/logger";
import type { SelectedCalendar } from "@calcom/prisma/client";

import type {
  ICalendarSubscriptionPort,
  CalendarSubscriptionResult,
  CalendarSubscriptionEvent,
  CalendarSubscriptionEventItem,
  CalendarCredential,
} from "../lib/CalendarSubscriptionPort.interface";

const log = logger.getSubLogger({ prefix: ["GoogleCalendarSubscriptionAdapter"] });

class CalendarAuth {
  constructor(private credential: CalendarCredential) {}
  async getClient(): Promise<any> {
    throw new Error("Google Calendar integration not configured.");
  }
}

/**
 * Google Calendar Subscription Adapter
 *
 * This adapter uses the Google Calendar API to create and manage calendar subscriptions
 * @see https://developers.google.com/google-apps/calendar/quickstart/nodejs
 */
export class GoogleCalendarSubscriptionAdapter implements ICalendarSubscriptionPort {
  private GOOGLE_WEBHOOK_TOKEN = process.env.GOOGLE_WEBHOOK_TOKEN;
  private GOOGLE_WEBHOOK_URL = `${
    process.env.GOOGLE_WEBHOOK_URL || process.env.NEXT_PUBLIC_WEBAPP_URL
  }/api/webhooks/calendar-subscription/google_calendar`;

  async validate(request: Request): Promise<boolean> {
    const token = request?.headers?.get("X-Goog-Channel-Token");
    if (!this.GOOGLE_WEBHOOK_TOKEN) {
      log.warn("GOOGLE_WEBHOOK_TOKEN not configured");
      return false;
    }
    if (token !== this.GOOGLE_WEBHOOK_TOKEN) {
      log.warn("Invalid webhook token");
      return false;
    }
    return true;
  }

  async extractChannelId(request: Request): Promise<string | null> {
    return request?.headers?.get("X-Goog-Channel-ID") || null;
  }

  async extractResourceId(request: Request): Promise<string | null> {
    return request?.headers?.get("X-Goog-Resource-ID") || null;
  }

  async subscribe(
    selectedCalendar: SelectedCalendar,
    credential: CalendarCredential
  ): Promise<CalendarSubscriptionResult> {
    log.info("Attempt to subscribe to Google Calendar", { externalId: selectedCalendar.externalId });
    const client = await this.getClient(credential);
    const channelId = uuid();
    const expiration = dayjs().add(7, "day").toDate();
    const result = await client.events.watch({
      calendarId: selectedCalendar.externalId,
      requestBody: {
        id: channelId,
        type: "web_hook",
        address: this.GOOGLE_WEBHOOK_URL,
        token: this.GOOGLE_WEBHOOK_TOKEN,
        params: {
          ttl: "604800",
        },
      },
    });

    if (!result.data.id || !result.data.resourceId || !result.data.resourceUri) {
      log.error("Error subscribing to Google Calendar", result);
      throw new Error("Error subscribing to Google Calendar");
    }

    return {
      provider: "google_calendar",
      id: result.data.id,
      resourceId: result.data.resourceId,
      resourceUri: result.data.resourceUri,
      expiration,
    };
  }
  async unsubscribe(selectedCalendar: SelectedCalendar, credential: CalendarCredential): Promise<void> {
    log.debug("Attempt to unsubscribe from Google Calendar", { externalId: selectedCalendar.externalId });

    const client = await this.getClient(credential);
    await client.channels
      .stop({
        requestBody: {
          id: selectedCalendar.channelId as string,
          resourceId: selectedCalendar.channelResourceId as string,
        },
      })
      .catch((err: unknown) => {
        log.error("Error unsubscribing from Google Calendar", err);
        throw err;
      });
  }

  async fetchEvents(
    selectedCalendar: SelectedCalendar,
    credential: CalendarCredential
  ): Promise<CalendarSubscriptionEvent> {
    log.info("Attempt to fetch events from Google Calendar", { externalId: selectedCalendar.externalId });
    const client = await this.getClient(credential);

    let syncToken = selectedCalendar.syncToken || undefined;
    let pageToken;

    const params: calendar_v3.Params$Resource$Events$List = {
      calendarId: selectedCalendar.externalId,
      pageToken,
      singleEvents: true,
    };

    if (!syncToken) {
      log.info("Fetching full sync of events from Google Calendar", {
        externalId: selectedCalendar.externalId,
      });

      params.timeMin = dayjs().subtract(1, "month").toISOString();
      params.timeMax = dayjs().add(1, "month").toISOString();
    } else {
      log.info("Fetching incremental sync of events from Google Calendar", {
        externalId: selectedCalendar.externalId,
      });
      params.syncToken = syncToken;
    }

    const items: CalendarSubscriptionEventItem[] = [];

    do {
      params.pageToken = pageToken;
      const result = await client.events.list(params).catch((err: unknown) => {
        log.error("Error fetching events from Google Calendar", err);
        throw err;
      });

      syncToken = result.data.nextSyncToken ?? undefined;
      pageToken = result.data.nextPageToken ?? undefined;

      const results = this.mapEvents(result.data.items);
      items.push(...results);
    } while (pageToken);

    return {
      provider: "google_calendar",
      syncToken: syncToken ?? null,
      items,
    };
  }

  private mapEvents(items: calendar_v3.Schema$Event[] = []): CalendarSubscriptionEventItem[] {
    return items
      .filter((event) => !event.recurrence)
      .map((event) => {
        const busy = event.transparency === "transparent" ? false : true;

        const start = event.start?.dateTime
          ? new Date(event.start.dateTime)
          : event.start?.date
            ? new Date(event.start.date)
            : new Date();

        const end = event.end?.dateTime
          ? new Date(event.end.dateTime)
          : event.end?.date
            ? new Date(event.end.date)
            : new Date();

        return {
          id: event.id as string,
          iCalUID: event.iCalUID ?? null,
          start,
          end,
          busy,
          summary: event.summary ?? null,
          description: event.description ?? null,
          location: event.location ?? null,
          kind: event.kind ?? null,
          etag: event.etag ?? null,
          status: event.status ?? null,
          isAllDay: typeof event.start?.date === "string" && !event.start?.dateTime ? true : false,
          timeZone: event.start?.timeZone ?? null,
          recurringEventId: event.recurringEventId ?? null,
          originalStartDate: event.originalStartTime?.dateTime
            ? new Date(event.originalStartTime.dateTime)
            : event.originalStartTime?.date
              ? new Date(event.originalStartTime.date)
              : null,
          createdAt: event.created ? new Date(event.created) : null,
          updatedAt: event.updated ? new Date(event.updated) : null,
        };
      });
  }

  private async getClient(credential: CalendarCredential) {
    const auth = new CalendarAuth(credential);
    return await auth.getClient();
  }
}
