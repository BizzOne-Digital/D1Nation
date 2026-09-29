# D1 Nation — Website & Admin Portal

Production-ready marketing site and `/admin` content portal for **D1 Nation**, built with Next.js (App Router), TypeScript, Tailwind CSS, and MongoDB. Media uploads use **Cloudinary** (serverless-safe).

## Project location

All application code lives in this folder: `d1-nation/`.

## Requirements

- Node.js 20+
- MongoDB Atlas (or local MongoDB)
- Cloudinary account (for logo, hero video, and image uploads in admin)

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in `MONGODB_URI`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and Cloudinary keys.

4. Seed default services, FAQs, site settings, and the first admin user:

   ```bash
   npm run seed
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Admin portal

Manage from `/admin` after signing in:

- Site settings (logo, hero video/image, headlines, contact, social URLs, SEO)
- Services (descriptions, benefits, images, internal price + **Show public price** toggle)
- Testimonials, FAQs, products, blog posts, team profiles
- Contact inquiries (status workflow)

**Pricing rule:** The public site shows **Contact for pricing** unless **Show public price** is enabled for that service or product.

## Production build (local check)

```bash
npm run lint
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) — this is the same mode Vercel uses after `next build`.

## Deploying to Vercel

1. Import the `d1-nation` project (root directory: `d1-nation`).
2. Set **Environment variables** (Production) from `.env.example`:
   - `MONGODB_URI`
   - `AUTH_SECRET` (32+ random characters; generate a new one for production)
   - `NEXT_PUBLIC_SITE_URL` (your live domain, e.g. `https://your-domain.com`)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` only needed when running seed (do not commit real passwords)
3. Deploy. Vercel runs `npm run build` automatically.
4. On your machine (once), point `.env.local` at **production** `MONGODB_URI` and run `npm run seed` to create the admin user and default content. Change the admin password after first login.
5. In MongoDB Atlas → Network Access, allow Vercel (or `0.0.0.0/0` during setup).

Uploads use **Cloudinary** — the server filesystem is not used for media in production.

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Development server         |
| `npm run build`| Production build           |
| `npm run start`| Start production server  |
| `npm run lint` | ESLint                     |
| `npm run seed` | Seed DB + admin user       |

## Notes

- No fabricated testimonials, team members, addresses, social URLs, or prices are shown by default.
- Online checkout is not implemented; the shop uses inquiry CTAs.
- Replace the temporary text logo and hero fallback via **Admin → Site Settings** when client assets arrive.
