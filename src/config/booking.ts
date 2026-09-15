const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

function isValidBookingUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function getBookingUrl(): string | null {
  if (!BOOKING_URL || !isValidBookingUrl(BOOKING_URL)) {
    return null;
  }
  return BOOKING_URL;
}

export function getScheduleHref(): string | null {
  return getBookingUrl();
}

export function hasScheduleUrl(): boolean {
  return getScheduleHref() !== null;
}

export function getPrimaryCtaHref(contactAnchor = "#contact"): string {
  return getBookingUrl() ?? contactAnchor;
}

export function isExternalBookingUrl(href: string): boolean {
  const bookingUrl = getBookingUrl();
  return bookingUrl !== null && href === bookingUrl;
}
