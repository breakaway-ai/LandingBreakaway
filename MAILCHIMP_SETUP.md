# Mailchimp Integration Setup Guide

This guide will help you set up Mailchimp integration for the Breakaway landing page contact form.

## 1. Create a Mailchimp Account

If you don't already have a Mailchimp account, sign up at [mailchimp.com](https://mailchimp.com).

## 2. Get Your API Key

1. Log in to your Mailchimp account
2. Click on your profile icon in the bottom left
3. Select "Account & Billing"
4. Navigate to "Extras" > "API keys"
5. Click "Create A Key" or use an existing key
6. Copy the generated API key

## 3. Find Your Server Prefix

Your server prefix is the part of your Mailchimp URL after "admin" and before ".mailchimp.com". For example, if your Mailchimp URL is `https://us1.admin.mailchimp.com/`, your server prefix is `us1`.

## 4. Create an Audience List

1. In Mailchimp, go to "Audience" > "Audience dashboard"
2. If you don't have an audience yet, create one by clicking "Create Audience"
3. Follow the prompts to set up your audience

## 5. Get Your Audience List ID

1. Go to "Audience" > "Audience dashboard"
2. Click "Settings" > "Audience name and defaults"
3. You'll find your Audience ID in the "Audience ID" field
4. Copy this ID

## 6. Configure Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_SERVER_PREFIX=your_server_prefix_here
MAILCHIMP_LIST_ID=your_audience_id_here
```

Replace the placeholder values with your actual Mailchimp credentials.

## 7. Deploy to Netlify

When deploying to Netlify, you'll need to add these same environment variables:

1. Go to your site in the Netlify dashboard
2. Navigate to "Site settings" > "Build & deploy" > "Environment"
3. Click "Edit variables" and add each of the variables from your `.env` file

## 8. Testing the Integration

To test the integration locally:

1. Run `npm run netlify` to start the development server with Netlify Functions
2. Fill out and submit the contact form
3. Check your Mailchimp audience to see if the contact was added

If you encounter any issues, check the browser console and Netlify Function logs for error messages.

## 9. Customizing Merge Fields

If you need to customize the merge fields in Mailchimp:

1. Go to "Audience" > "Settings" > "Audience fields and *|MERGE|* tags"
2. Add or modify fields as needed
3. Update the `merge_fields` object in the `netlify/functions/subscribe.js` file to match your Mailchimp audience fields

## 10. Additional Resources

- [Mailchimp API Documentation](https://mailchimp.com/developer/marketing/api/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Mailchimp Node.js SDK](https://github.com/mailchimp/mailchimp-marketing-node) 