# 🧭 Avuncular Group — Project Implementation Draft (PID)

**Stack:** Next.js (App Router) · TypeScript · TailwindCSS · shadcn/ui · Mailjet API
**Style:** Light · Warm · Minimalist · Sophisticated
**Purpose:** One-page company website with business overview + contact form.

---

## 1. 🎯 Project Goals

* Build a **clean, modern, warm, minimalist** single-page website.
* Present the **Avuncular Group** umbrella and its businesses.
* Provide a **contact form** that:

  * Uses Mailjet via a Next.js Route Handler.
  * Sends an internal email to `info@avunculargroup.com`.
  * Sends the user a confirmation email.
* Structure the code for **easy expansion** (future businesses, pages).
* Deploy seamlessly to **Vercel**.

---

## 2. 📁 Project Structure

```text
avuncular-group/
│
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── components/
│   │   ├── business-card.tsx
│   │   ├── contact-form.tsx
│   │   ├── header.tsx
│   │   └── section.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/ui/         // Added via shadcn
│
├── public/
│   └── favicon.ico
│
├── styles/
│   └── globals.css
│
├── .env.local
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. ⚙️ Setup Instructions

### 3.1 Create the project

```bash
npx create-next-app@latest avuncular-group --typescript --tailwind --app
cd avuncular-group
```

### 3.2 Install shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea form toast card
```

### 3.3 Install Mailjet SDK

```bash
npm install node-mailjet
```

### 3.4 Environment variables

Create `.env.local`:

```env
MAILJET_API_KEY=your_key
MAILJET_API_SECRET=your_secret
MAILJET_FROM_EMAIL=info@avunculargroup.com
MAILJET_FROM_NAME=Avuncular Group
```

---

## 4. 🎨 Design System

### 4.1 Color Palette

| Purpose         | Color     |
| --------------- | --------- |
| Background      | `#FAF7F2` |
| Text primary    | `#2C2C2C` |
| Text secondary  | `#6F6F6F` |
| Accent          | `#B45309` |
| Card background | `#FFFFFF` |
| Card border     | `#E5E5E5` |

### 4.2 Aesthetic Principles

* Warm, soft neutrals
* No harsh contrast
* Light, breathable layout spacing
* Subtle amber accents
* Calm typography (Inter recommended)

---

## 5. 🧱 Global Styles

### `styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

body {
  @apply bg-[#FAF7F2] text-neutral-800 antialiased;
}
```

---

## 6. 🏛 Layout

### `app/layout.tsx`

```tsx
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Avuncular Group",
  description: "A thoughtful collective building practical, human-focused ventures.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

## 7. 🏠 Page Structure

### `app/page.tsx`

```tsx
import Header from "./components/header";
import Section from "./components/section";
import BusinessCard from "./components/business-card";
import ContactForm from "./components/contact-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-32">

        <Header />

        <Section title="About">
          <p className="text-sm text-neutral-600 max-w-xl leading-relaxed">
            Avuncular Group brings together independent operators under one roof.
            We back ideas that are grounded, human, and useful — with a bias toward
            long-term partnerships and quiet, compounding impact.
          </p>
        </Section>

        <Section title="Businesses">
          <div className="space-y-6">
            <BusinessCard
              name="Business One"
              tagline="A concise explanation of what it does."
              description="A short description about focus, values, market, or mission."
            />
            <BusinessCard
              name="Business Two"
              tagline="Another positioning line."
              description="Two or three sentences describing this initiative with calm clarity."
            />
          </div>
        </Section>

        <Section title="In Development">
          <BusinessCard
            name="Working Title"
            tagline="Something new is taking shape."
            description="A brief hint at the concept being explored."
            subdued
          />
        </Section>

        <Section title="Contact">
          <ContactForm />
        </Section>

        <footer className="text-xs text-neutral-500 pt-12">
          © {new Date().getFullYear()} Avuncular Group
        </footer>

      </div>
    </main>
  );
}
```

---

## 8. 🧩 Components

### 8.1 Header

#### `app/components/header.tsx`

```tsx
export default function Header() {
  return (
    <header className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-[0.2em] uppercase text-neutral-800">
        Avuncular Group
      </h1>
      <p className="text-sm text-neutral-600 max-w-md">
        A small, thoughtful group building practical solutions for complex problems.
      </p>
    </header>
  );
}
```

---

### 8.2 Section Wrapper

#### `app/components/section.tsx`

```tsx
export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-700">
        {title}
      </h2>
      {children}
    </section>
  );
}
```

---

### 8.3 Business Card

#### `app/components/business-card.tsx`

```tsx
type Props = {
  name: string;
  tagline: string;
  description: string;
  subdued?: boolean;
};

export default function BusinessCard({ name, tagline, description, subdued }: Props) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 transition-transform duration-200",
        subdued
          ? "border-neutral-200 bg-white/60"
          : "border-neutral-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md",
      ].join(" ")}
    >
      <h4 className="text-sm font-medium text-neutral-800">{name}</h4>
      <p className="text-xs text-amber-700/80 mt-1">{tagline}</p>
      <p className="text-xs text-neutral-600 mt-3 leading-relaxed">{description}</p>
    </div>
  );
}
```

---

### 8.4 Contact Form

#### `app/components/contact-form.tsx`

```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast({ title: "Message sent", description: "We’ll be in touch soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        placeholder="Name"
        required
        className="bg-white border-neutral-300 text-neutral-800 placeholder:text-neutral-400 shadow-sm"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Input
        placeholder="Email"
        type="email"
        required
        className="bg-white border-neutral-300 text-neutral-800 placeholder:text-neutral-400 shadow-sm"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        placeholder="Subject"
        required
        className="bg-white border-neutral-300 text-neutral-800 placeholder:text-neutral-400 shadow-sm"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />

      <Textarea
        placeholder="Message"
        rows={4}
        required
        className="bg-white border-neutral-300 text-neutral-800 placeholder:text-neutral-400 shadow-sm resize-none"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
      >
        {loading ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
```

---

## 9. 📡 API Route — Mailjet Integration

### `app/api/contact/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const apiKey = process.env.MAILJET_API_KEY!;
    const apiSecret = process.env.MAILJET_API_SECRET!;
    const fromEmail = process.env.MAILJET_FROM_EMAIL!;
    const fromName = process.env.MAILJET_FROM_NAME!;

    const mailjet = new Mailjet({ apiKey, apiSecret });

    const internalEmail = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: "info@avunculargroup.com" }],
          Subject: `[Website] ${subject}`,
          HTMLPart: `
            <p>New message from ${name} (${email})</p>
            <p>${message.replace(/\n/g, "<br />")}</p>
          `,
        },
      ],
    });

    const userReply = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: email }],
          Subject: `We received your message`,
          HTMLPart: `
            <p>Hi ${name},</p>
            <p>Thanks for getting in touch with Avuncular Group.</p>
            <p><strong>Your message:</strong></p>
            <p>${message.replace(/\n/g, "<br />")}</p>
            <p>We’ll reply soon.</p>
          `,
        },
      ],
    });

    await Promise.all([internalEmail, userReply]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
```

---

## 10. ☁️ Deployment

Recommended: **Vercel**

1. Push your repo to GitHub.
2. Import it into Vercel.
3. Add env vars:

   * `MAILJET_API_KEY`
   * `MAILJET_API_SECRET`
   * `MAILJET_FROM_EMAIL`
   * `MAILJET_FROM_NAME`

Build and deploy.

---

## 11. 🔮 Optional Enhancements

* Add dynamic pages for each business.
* Add founders / principles section.
* Add subtle animations (fade-in on scroll).
* Include SVG logo/wordmark.
* Add a CMS for editable content.
