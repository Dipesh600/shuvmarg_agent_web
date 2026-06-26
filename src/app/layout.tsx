import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Travel Agent Portal | Shuvmarg Partner",
  description:
    "Grow your travel agency with Shuvmarg Partner — Nepal's #1 digital transit platform for agents. Book tickets, earn commission, and manage customers seamlessly.",
  keywords: [
    "travel agent Nepal",
    "Shuvmarg partner agent",
    "bus ticket booking agent",
    "Nepal online bus ticketing",
    "digital transport agent",
  ],
  openGraph: {
    title: "Travel Agent Portal | Shuvmarg Partner",
    description:
      "Join Nepal's largest digital transit booking network. High commissions, instant booking, and 24/7 support.",
    type: "website",
    locale: "en_US",
    siteName: "Shuvmarg Partner",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Neue Machina font */}
        <link rel="preconnect" href="https://shuvmarg.vercel.app" />
        {/* Google Font Connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols Rounded — Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
