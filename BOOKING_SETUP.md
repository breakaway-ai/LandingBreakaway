# Google Calendar Booking Setup

The landing page can link visitors to a Google Calendar appointment schedule for the "Schedule on calendar" CTA and for primary CTAs when configured.

## 1. Create an appointment schedule

1. Open [Google Calendar](https://calendar.google.com) with the account you want to receive bookings (for example `general@breakaway.work`).
2. In the left sidebar, under **Booking pages**, click **Create** (or edit an existing booking page).
3. Set the duration, availability, and meeting details for your consultation call.

## 2. Copy the booking link

1. Hover over the booking page in the sidebar.
2. Click **Copy link**.

The URL usually looks like one of these:

```
https://calendar.google.com/calendar/appointments/schedules/AcZssZ...
https://calendar.app.google/...
```

You can also use the embed URL from **Options → Sharing options → Website embed**. If you use the embed code, copy only the `url` or `src` value.

## 3. Configure the environment variable

Add this to `.env.local` for local development:

```
NEXT_PUBLIC_BOOKING_URL=https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID
```

Restart the dev server after changing this value.

## 4. Deploy to Vercel

Add the same variable in the Vercel project:

1. Open **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_BOOKING_URL` with your Google Calendar booking link
3. Redeploy so the new value is available in production

## 5. Where it is used

When `NEXT_PUBLIC_BOOKING_URL` is set:

- The CTA section shows **Schedule on calendar** and opens the booking page in a new tab
- Primary CTAs in the navbar, hero, and about page link to the same booking page instead of the contact form

When it is not set:

- The schedule button is hidden
- Primary CTAs fall back to the contact form (`#contact`)
