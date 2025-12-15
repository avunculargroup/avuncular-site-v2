import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Avuncular Group",
  description:
    "A thoughtful collective building practical, human-focused ventures.",
  metadataBase: new URL("https://avunculargroup.com"),
  openGraph: {
    title: "Avuncular Group",
    description:
      "A thoughtful collective building practical, human-focused ventures.",
    type: "website",
    url: "/",
    siteName: "Avuncular Group",
    images: [
      {
        url: "/ag-preview.png",
        width: 1200,
        height: 630,
        alt: "Avuncular Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avuncular Group",
    description:
      "A thoughtful collective building practical, human-focused ventures.",
    images: ["/ag-preview.png"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "Avuncular",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
