import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
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
<html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}>
  <body className="min-h-full flex flex-col">
    <script dangerouslySetInnerHTML={{
      __html: `
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      `
    }} />
    <SessionProvider>
      {children}
      <ToastContainer />
    </SessionProvider>
  </body>
</html>
  );
}