import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matt Mace — Platform Engineer & AI Graduate Student",
  description: "CMS Platform Engineer based in Indianapolis with 8+ years on a SaaS platform serving millions of users. Pursuing an M.S. in AI. Builder of a 21 CFR Part 11-compliant LIMS.",
  keywords: ["Matt Mace", "platform engineer", "CMS engineer", "data integrity", "LIMS", "AI", "Indianapolis", "software engineer", "SaaS"],
  metadataBase: new URL("https://mattmace.dev"),
  openGraph: {
    title: "Matt Mace — Platform Engineer & AI Graduate Student",
    description: "8+ years on a SaaS platform serving millions of users. M.S. in AI in progress. Builder of a 21 CFR Part 11-compliant LIMS.",
    type: "website",
    url: "https://mattmace.dev",
  },
  twitter: {
    card: "summary",
    title: "Matt Mace — Platform Engineer & AI Graduate Student",
    description: "8+ years on a SaaS platform serving millions of users. M.S. in AI in progress.",
  },
  alternates: {
    canonical: "https://mattmace.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased" style={{ background: "#030712" }}>
        {children}
      </body>
    </html>
  );
}
