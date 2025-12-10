# 🗺️ Build Plan — Avuncular Group Website

## 1. Project Summary
- **Goal:** Launch a single-page marketing site for Avuncular Group with a warm minimalist aesthetic plus an email-powered contact form.
- **Stack:** Next.js (App Router) · TypeScript · TailwindCSS · shadcn/ui · Mailjet API.
- **Deployment Target:** Vercel with CI triggered from GitHub main branch.

## 2. Deliverables
1. Source repository scaffolding per structure in `PROJECT_IMPLEMENTATION.md`.
2. Design system (colors, typography, spacing) encoded in Tailwind + global styles.
3. Content sections: Header, About, Businesses, In Development, Contact, Footer.
4. Contact workflow: client form + server route that sends Mailjet email to team and confirmation to submitter.
5. Deployment infrastructure (Vercel project + secrets) with documented verification steps.

## 3. Prerequisites
- Node.js 18+ and npm 9+ installed locally.
- Mailjet account with API key/secret and verified sender `info@avunculargroup.com`.
- GitHub repository access + Vercel account connected to GitHub.

## 4. Environment & Tooling Setup
1. **Bootstrap project**
   ```bash
   npx create-next-app@latest avuncular-group --typescript --tailwind --app
   cd avuncular-group
   ```
2. **Initialize shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button input textarea form toast card
   ```
3. **Install Mailjet SDK**
   ```bash
   npm install node-mailjet
   ```
4. **Configure linting/formatting**
   - Use Next.js defaults (ESLint) and enable `"strict": true` in `tsconfig.json` to keep types safe.
   - Add `"check": "next lint"` to `package.json` scripts if not already present.
5. **Secrets file** — create `.env.local` with:
   ```env
   MAILJET_API_KEY=your_key
   MAILJET_API_SECRET=your_secret
   MAILJET_FROM_EMAIL=info@avunculargroup.com
   MAILJET_FROM_NAME=Avuncular Group
   ```

## 5. Implementation Milestones

### M1 — Repository Hygiene
- Add `.gitignore` (from Next.js template) and confirm no secrets in repo.
- Update `README.md` with setup + deploy instructions mirroring this plan.
- Commit baseline scaffold (`feat: bootstrap next app`).

### M2 — Global Styles & Theme
- Update `styles/globals.css` per design system (`bg #FAF7F2`, neutral text, `color-scheme: light`).
- Configure `tailwind.config.js` to extend colors (background, accent) and font family (Inter via Google Fonts in `layout.tsx`).
- Verify typography + spacing tokens align with aesthetic principles (light, breathable, subtle amber accents).

### M3 — Layout Shell
- Implement `app/layout.tsx` with metadata and `<Toaster />` from shadcn UI.
- Install Inter font via `next/font/google` and apply to `<body>` class.
- Smoke-test layout via `npm run dev` to ensure global styles load.

### M4 — Page Composition (`app/page.tsx`)
- Structure `<main>` container with `max-w-6xl`, `space-y-32`, `px-6 py-16` as described.
- Import section + content components (Header, Section, BusinessCard, ContactForm).
- Fill copy from PID (About text, Business placeholders, footer with dynamic year).
- Acceptance: Page renders all sections with proper spacing and background.

### M5 — UI Components
1. **Header** — uppercase logotype + supporting copy.
2. **Section** — reusable wrapper with amber title styling.
3. **BusinessCard** — supports `subdued` variant (reduced shadow) and hover elevation.
4. **ContactForm** — client component managing local state, uses shadcn `Input`, `Textarea`, `Button`, `useToast`.
- Ensure components reside in `app/components/` and export defaults as in PID snippets.
- Storybook (optional) or Chromatic visual check if available.

### M6 — Contact API Route
- File: `app/api/contact/route.ts`.
- Responsibilities:
  - Parse POST body `{ name, email, subject, message }`.
  - Instantiate Mailjet client with env vars.
  - Send two emails (internal notification + user confirmation) using `mailjet.post("send", { version: "v3.1" })` requests.
  - Return `NextResponse.json({ ok: true })` on success, `status 500` on failure.
  - Log errors server-side; avoid leaking secrets to client.
- Add basic request validation (ensure required fields) before sending.
- Unit test with mocked Mailjet client or integration test hitting Vercel preview using Mailjet sandbox.

### M7 — Content QA & Accessibility
- Review copy for clarity; replace placeholder business info with real data if available.
- Run `npm run lint` and `npm run test` (if tests added).
- Use Axe or Lighthouse to confirm accessibility (color contrast, form labels, focus states).
- Confirm contact form handles loading/disabled state.

### M8 — Deployment Pipeline
1. **GitHub** — push repository and protect main branch.
2. **Vercel**
   - Import repo; set build command `npm run build`, output `.next` (default).
   - Add env vars `MAILJET_API_KEY`, `MAILJET_API_SECRET`, `MAILJET_FROM_EMAIL`, `MAILJET_FROM_NAME`.
   - Enable preview deployments per branch.
3. **Verification Checklist**
   - Preview URL renders correctly across desktop/mobile.
   - Contact form submission works (check Mailjet activity + toast success message).
   - Footer year updates automatically.

### M9 — Post-Launch Enhancements (Optional)
- Dynamic routes for individual businesses (e.g., `/ventures/[slug]`).
- Additional sections (Founders, Principles, Press) using existing Section component.
- Scroll-triggered fade transitions (Framer Motion) aligned with calm aesthetic.
- CMS integration (e.g., Contentful, Sanity) for editable content.

## 6. Risk & Mitigation Notes
- **Mailjet credentials** — store only in Vercel + local `.env.local`; never commit.
- **Form abuse** — consider adding rate limiting or hCaptcha if spam observed.
- **Deployment drift** — keep parity between `.env.local` and Vercel env vars; document changes in `README.md`.

## 7. Acceptance Criteria
- All sections visually match PID mocks (spacing, colors, typography).
- ESLint + TypeScript checks pass; `npm run build` succeeds.
- Contact form reliably sends internal + confirmation emails via preview + production.
- Vercel production URL live with HTTPS and warm minimalist presentation.

---
This plan provides the concrete steps and checkpoints needed to build and ship the Avuncular Group site exactly as described in `PROJECT_IMPLEMENTATION.md`. Good luck! 🎯
