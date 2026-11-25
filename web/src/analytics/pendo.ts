// Pendo Track Events. The Pendo agent attaches the visitor and account to every event,
// so the properties never include them.
type TrackPropertyValue = string | number | boolean | string[];

export type TrackProperties = Record<string, TrackPropertyValue>;

interface PendoAgent {
  track: (event: string, properties?: TrackProperties) => void;
}

declare global {
  interface Window {
    pendo?: PendoAgent;
  }
}

/** Sends a Pendo Track Event. Does nothing when the Pendo agent isn't loaded, and never throws. */
export function trackEvent(event: string, properties: TrackProperties = {}): void {
  try {
    window.pendo?.track(event, properties);
  } catch (e) {
    console.warn(`Pendo track event ${event} failed`, e);
  }
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Parses a "YYYY-MM-DD" date as a UTC day, so day counts don't shift with time zones. */
function utcDay(date: string): number {
  const [year, month, day] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

/** The number of calendar days a trip covers, counting its start and end dates. */
export function tripLengthDays(startDate: string, endDate: string): number {
  return Math.round((utcDay(endDate) - utcDay(startDate)) / DAY_MS) + 1;
}

/** The number of days from today until a trip starts. Negative when it has already started. */
export function daysUntil(startDate: string): number {
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((utcDay(startDate) - todayUtc) / DAY_MS);
}
