# Resend Integration Setup Guide

This guide covers Resend setup for the Breakaway landing page contact form.

## 1. Create a Resend Account

Sign up at [resend.com](https://resend.com) if you do not already have an account.

## 2. Get Your API Key

1. Log in to the Resend dashboard
2. Go to **API Keys**
3. Click **Create API Key**
4. Copy the generated key (starts with `re_`)

## 3. Verify Your Domain (Production)

For production emails, verify your sending domain:

1. Go to **Domains** in the Resend dashboard
2. Add your domain (e.g. `breakaway.work`)
3. Add the DNS records Resend provides
4. Wait for verification

For local testing you can use `onboarding@resend.dev` as the sender.

## 4. Create an Audience (Optional)

Contacts from the form can be added to a Resend audience when `RESEND_SEGMENT_ID` is set:

1. Go to **Audiences** in the Resend dashboard
2. Create a new audience (e.g. "Contact Form Leads")
3. Copy the audience ID

Run `node get-resend-audiences.js` to list audiences and their IDs.

## 5. Configure Environment Variables

Create a `.env.local` file in the project root:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Breakaway <noreply@breakaway.work>
CONTACT_NOTIFICATION_EMAIL=general@breakaway.work
RESEND_SEGMENT_ID=your_audience_id_here
```

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `RESEND_FROM_EMAIL` | No | Sender address (defaults to `Breakaway <onboarding@resend.dev>`) |
| `CONTACT_NOTIFICATION_EMAIL` | No | Where form notifications are sent (defaults to `general@breakaway.work`) |
| `RESEND_SEGMENT_ID` | No | Audience ID used when creating contacts |

## 6. Deploy to Vercel

When deploying to Vercel, add the same environment variables:

1. Open your project in the Vercel dashboard
2. Go to **Settings → Environment Variables**
3. Add each variable from your `.env.local` file for Production, Preview, and Development as needed

Never expose `RESEND_API_KEY` in client-side code. The `/api/subscribe` route reads it server-side only.

## 7. Testing the Integration

To test locally:

1. Create your `.env.local` file with the variables above
2. Run `bun run dev`
3. Submit the contact form on any locale page
4. Check the Resend dashboard for the new contact and notification email

You can also run `node test-resend.js` to add a test contact directly via the API.

## 8. How It Works

When a user submits the contact form:

1. The browser sends a POST request to `/api/subscribe`
2. If `RESEND_SEGMENT_ID` is set, a contact is created in that Resend audience
3. A notification email is sent to `CONTACT_NOTIFICATION_EMAIL` with the form details
4. On success, the user is redirected to `/[locale]/thank-you`

## 9. Additional Resources

- [Resend API Documentation](https://resend.com/docs/api-reference/introduction)
- [Resend Node.js SDK](https://github.com/resend/resend-node)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
