# Manta Bali Nusa Tours

A premium, fully-responsive travel agency website for **Manta Bali Nusa Tours**, specializing in Bali &amp; Nusa Penida tour packages.

Built with **Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · TailwindCSS · GSAP**.

> Requires **Node.js 20.9+** (Next.js 16 minimum).

## ✨ Features

- **Modern travel design**: warm orange accent, dark-navy section bars, Plus Jakarta Sans typography, soft cards and a bento destination gallery
- **Automatic language detection**: Indonesian for visitors in Indonesia (geo header or `id` browser language), English otherwise, with a manual EN/ID toggle persisted in a cookie. See `lib/getLocale.ts` and `lib/i18n.ts`
- **GSAP animations**: StrictMode-safe `set`+`to` reveals with `clearProps`, ScrollTrigger staggers, animated number counters
- **Mobile-first &amp; fully responsive**
- **SEO optimized**: dynamic metadata, Open Graph, JSON-LD structured data (`TravelAgency`, `LocalBusiness`, `TouristAttraction`), `sitemap.ts`, `robots.ts`
- **Server Components** by default; client components only where interactivity is needed
- **Optimized images** via `next/image`
- **WhatsApp-focused booking**: every CTA and the contact form deep-link to `wa.me` with a prefilled, localized message

## 🌐 Localization

The landing page renders dynamically per visitor. `getLocale()` resolves the language in priority order: **cookie -> geo country header -> `Accept-Language` -> English**. UI copy lives in `lib/i18n.ts` (`en` / `id` dictionaries); tour descriptions/durations carry `*Id` fields, and recurring itinerary/include terms are translated via a phrase map.

## 🗺️ Pages

| Route | Description |
| --- | --- |
| `/` | Landing page. Tour packages are read **from MongoDB** (seeded from the built-ins, with a static fallback). |
| `/studio/login` | Hidden admin login (noindex, server-side auth) |
| `/studio` | MongoDB-backed package manager: create / edit / delete, image upload, search & filters |
| `/api/studio/*` | Auth + package CRUD API (protected by middleware) |

## 🔐 Admin (/studio) + database

The `/studio` admin is protected by **real server-side auth** — credentials are checked on the server, a signed JWT is stored in an **httpOnly cookie** (`jose`), and `middleware.ts` guards every `/studio` page and `/api/studio` route. Tour packages live in **MongoDB via Mongoose**; edits in `/studio` update the live homepage.

Configure these in `.env.local` (copy from `.env.example`, never commit it):

```
MONGODB_URI=...            # MongoDB Atlas connection string
STUDIO_EMAIL=...           # admin login email
STUDIO_PASSWORD=...        # admin login password (use a long random one)
AUTH_SECRET=...            # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> On first homepage load with an empty database, the built-in packages are seeded automatically (the `title` field is unique, so concurrent first-loads can't create duplicates).

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm run start   # production (Turbopack)
npm run lint                     # ESLint flat config (eslint.config.mjs)
```

## 🧱 Project structure

```
eslint.config.mjs     # ESLint 9 flat config (eslint-config-next 16)
middleware.ts         # guards /studio + /api/studio (JWT cookie check)
app/
  layout.tsx          # root metadata + JSON-LD + fonts
  page.tsx            # landing page (reads packages from MongoDB)
  sitemap.ts robots.ts privacy/ terms/
  studio/
    layout.tsx        # noindex
    login/page.tsx    # server-auth login
    page.tsx          # package manager (server-loaded from DB)
  api/studio/
    auth/login, auth/logout
    packages/, packages/[id]   # CRUD route handlers
components/
  Header, Hero, Footer, BrandLogo, Logo, FloatingWhatsApp, LegalPage, icons
  ui/      SectionHeading, CountUp, Reveal, LocaleSwitcher, PackageDetailModal
  sections/ StatsBar, Packages (+PackagesGrid), WhyChooseUs,
            PopularDestinations, Testimonials, Contact (+ContactForm)
  studio/  StudioDashboard, PackageForm, ConfirmModal
lib/
  data.ts types.ts i18n.ts getLocale.ts useGsapReveal.ts
  mongodb.ts session.ts packages.ts sanitizePackage.ts models/Package.ts
```

## 🎨 Customization

- Colors &amp; gradients: `tailwind.config.ts`
- Tour content: `lib/data.ts`
- Contact details / WhatsApp number: constants at the top of `lib/data.ts`
