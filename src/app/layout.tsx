import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContextQ",
  description: "AI-powered document intelligence platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ContextQ",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2C2D6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
      <SessionProvider>
  {children}
  <ToastContainer />
</SessionProvider>
      </body>
    </html>
  );
}