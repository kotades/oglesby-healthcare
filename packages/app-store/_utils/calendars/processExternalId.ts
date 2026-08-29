import type { DestinationCalendar } from "@calcom/prisma/client";

const OUTLOOK_TYPE = "office365_calendar";

/**
 * When inviting attendees to a calendar event, sometimes the external ID is only used for internal purposes
 * Need to process the correct external ID for the calendar service
 */
const processExternalId = (destinationCalendar: DestinationCalendar) => {
  if (destinationCalendar.integration === OUTLOOK_TYPE) {
    // Primary email should always be present for Outlook
    return destinationCalendar.primaryEmail || destinationCalendar.externalId;
  }

  return destinationCalendar.externalId;
};

export default processExternalId;
