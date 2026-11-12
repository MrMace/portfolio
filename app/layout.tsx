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
  title: "Matt Mace | Software Engineer",
  description: "Software engineer in Indianapolis with 8+ years on a SaaS platform serving millions of users. Early adopter of AI development tools.",
  keywords: ["Matt Mace", "software engineer", "full-stack developer", "AI", "Claude Code", "Next.js", "Indianapolis", "SaaS"],
  metadataBase: new URL("https://mattmace.dev"),
  openGraph: {
    title: "Matt Mace | Software Engineer",
    description: "8+ years on a SaaS platform serving millions of users. Early adopter of AI development tools.",
    type: "website",
    url: "https://mattmace.dev",
  },
  twitter: {
    card: "summary",
    title: "Matt Mace | Software Engineer",
    description: "8+ years on a SaaS platform serving millions of users. Early adopter of AI development tools.",
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
