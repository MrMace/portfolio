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
  title: "Matt Mace — Software Engineer × AI",
  description: "Software engineer based in Indianapolis embracing AI to build the future. Full-stack developer with a passion for intelligent systems.",
  keywords: ["software engineer", "AI", "full stack", "Indianapolis", "developer", "Matt Mace"],
  openGraph: {
    title: "Matt Mace — Software Engineer × AI",
    description: "Software engineer embracing AI to build the future.",
    type: "website",
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
