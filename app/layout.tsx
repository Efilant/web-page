import type { Metadata } from "next";
import { Inter, Poppins, Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Elif Altun - Portfolio",
  description: "Yazılım Mühendisliği Öğrencisi | AI, ML ve Veri Odaklı Yazılım Geliştirici",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} ${pressStart.variable} font-sans antialiased bg-[#090B13] text-[#E0E0E0]`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
