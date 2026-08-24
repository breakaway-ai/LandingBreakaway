# Resend Integration Setup Guide

This guide will help you set up Resend integration for the Breakaway landing page contact form.

## 1. Create a Resend Account

If you don't already have a Resend account, sign up at [resend.com](https://resend.com).

## 2. Get Your API Key

1. Log in to your Resend dashboard
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

## 4. Create a Segment (Optional)

Contacts from the form can be added to a Resend segment for future campaigns:

1. Go to **Segments** in the Resend dashboard
2. Create a new segment (e.g. "Contact Form Leads")
3. Copy the segment ID

Run `node get-resend-audiences.js` to list all segments and their IDs.

## 5. Configure Environment Variables

Create a `.env` file in the root directory of your project:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Breakaway <noreply@breakaway.work>
CONTACT_NOTIFICATION_EMAIL=general@breakaway.work
RESEND_SEGMENT_ID=your_segment_id_here
```

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `RESEND_FROM_EMAIL` | No | Sender address (defaults to `Breakaway <onboarding@resend.dev>`) |
| `CONTACT_NOTIFICATION_EMAIL` | No | Where form notifications are sent (defaults to `general@breakaway.work`) |
| `RESEND_SEGMENT_ID` | No | Segment ID to add new contacts to |

## 6. Deploy to Netlify

When deploying to Netlify, add the same environment variables:

1. Go to your site in the Netlify dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add each variable from your `.env` file

Note that `CONTACT_NOTIFICATION_EMAIL` and `RESEND_FROM_EMAIL` are listed under
`SECRETS_SCAN_OMIT_KEYS` in `netlify.toml`. Both hold public addresses on the same
domain the site displays on screen, so without the exemption Netlify's secrets
scanning finds the values in the generated files and fails the build. Neither is
sensitive: a sender address travels in the header of every email you send.

Never add `RESEND_API_KEY` to that list, and don't reach for `SECRETS_SCAN_ENABLED`,
which switches off scanning for every variable including the key.

## 7. Testing the Integration

To test locally:

1. Create your `.env` file with the variables above
2. Run `npm run netlify` to start the dev server with Netlify Functions
3. Fill out and submit the contact form
4. Check the Resend dashboard for the new contact and notification email

You can also run `node test-resend.js` to add a test contact directly via the API.

## 8. How It Works

When a user submits the contact form:

1. A contact is created in Resend with name, email, company, phone, and message as custom properties
2. If `RESEND_SEGMENT_ID` is set, the contact is added to that segment
3. A notification email is sent to `CONTACT_NOTIFICATION_EMAIL` with the form details

## 9. Additional Resources

- [Resend API Documentation](https://resend.com/docs/api-reference/introduction)
- [Resend Node.js SDK](https://github.com/resend/resend-node)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
