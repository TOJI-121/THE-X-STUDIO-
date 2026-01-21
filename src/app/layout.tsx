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
  title: "THEXSTUDIO | Code Crafted",
  description: "Personal portfolio crafting modern, high-performance websites that convert, engage, and elevate your brand. Custom website design, frontend development, and deployment optimization.",
  keywords: ["web design", "frontend development", "React", "Next.js", "website development", "India"],
  authors: [{ name: "Orchids" }],
  openGraph: {
    title: "THEXSTUDIO | Code Crafted",
    description: "Personal portfolio crafting modern, high-performance websites that convert, engage, and elevate your brand.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "THEXSTUDIO | Code Crafted",
    description: "Personal portfolio crafting modern, high-performance websites that convert, engage, and elevate your brand.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
