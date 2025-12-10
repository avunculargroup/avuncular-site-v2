# Avuncular Group Website

Warm, minimalist single-page marketing site for Avuncular Group featuring business overviews and a Mailjet-powered contact workflow.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 3 + shadcn/ui component primitives
- Mailjet API for transactional email

## Getting Started

1. **Requirements**
   - Node.js ≥ 18 and npm ≥ 9
   - Mailjet account with verified sender `info@avunculargroup.com`
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Fill in Mailjet API credentials
   ```
4. **Run locally**
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production server
- `npm run lint` / `npm run check` — ESLint via `next lint`

## Contact Workflow

The contact form posts to `app/api/contact/route.ts`, which:

1. Validates the payload (name, email, subject, message) with Zod.
2. Sends an internal notification email to `info@avunculargroup.com`.
3. Sends a confirmation email back to the submitter.

Make sure the following environment variables are set locally and in Vercel:

- `MAILJET_API_KEY`
- `MAILJET_API_SECRET`
- `MAILJET_FROM_EMAIL`
- `MAILJET_FROM_NAME`

## Deployment

1. Push the repository to GitHub.
2. Import it into Vercel (build command `npm run build`, output `.next`).
3. Add the Mailjet environment variables to the Vercel project.
4. Trigger a deployment; preview URLs are automatically generated per branch.

## Project Structure

```
app/
  api/contact/route.ts   # Mailjet route handler
  components/            # Page-level components
  layout.tsx             # Root layout with Inter + toasts
  page.tsx               # Main marketing page
components/ui/           # shadcn/ui primitives
lib/utils.ts             # shadcn helper
public/                  # Static assets
```

Refer to `PLAN.md` and `PROJECT_IMPLEMENTATION.md` for additional background and future enhancements.
