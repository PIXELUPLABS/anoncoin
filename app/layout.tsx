import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const generalSans = localFont({
  src: "./fonts/GeneralSans-Regular.woff2",
  variable: "--font-general-sans",
  weight: "400",
  style: "normal",
});

const interDisplay = localFont({
  src: "./fonts/InterDisplay-Regular.woff2",
  variable: "--font-inter-display",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "NFA",
  description:
    "NFA is the lightning-fast trading terminal for Hyperliquid, bringing market intelligence straight to your chart across stocks, crypto, commodities, and indices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} ${generalSans.variable} ${inter.variable} ${interDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
