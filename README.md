# Breakaway Landing Page

Marketing site for Breakaway, built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Locale-prefixed routes for Spanish, English, Italian, and Portuguese (`/es`, `/en`, `/it`, `/pt`)
- Server-rendered SEO metadata, sitemap, and robots.txt
- Contact form backed by a Resend API route
- Responsive layout with animated sections

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- [Bun](https://bun.sh/) 1.4 or later

### Installation

```bash
git clone https://github.com/yourusername/LandingBreakaway.git
cd LandingBreakaway
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The proxy redirects unlocalized paths to the default locale (`/es`).

### Production build

```bash
bun run build
bun run start
```

## Resend Integration

The contact form posts to `/api/subscribe`. See [RESEND_SETUP.md](./RESEND_SETUP.md) for environment variable setup.

Create a `.env.local` file in the project root:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Breakaway <noreply@breakaway.work>
CONTACT_NOTIFICATION_EMAIL=general@breakaway.work
RESEND_SEGMENT_ID=your_audience_id_here
```

## Deployment on Vercel

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Vercel detects Next.js automatically; no custom build settings are required.
4. Add the Resend environment variables in **Project Settings → Environment Variables**.
5. Deploy.

Legacy redirects are handled in `next.config.ts` and `src/proxy.ts`:

- `/nosotros` → `/es/about`
- `/privacidad` → `/es/privacy`
- `/gracias` → `/es/thank-you`
- `?lng=…` → locale-prefixed path
- `?lead=success` → `/[locale]/thank-you`

## Built With

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [next-intl](https://next-intl.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend](https://resend.com/docs)
