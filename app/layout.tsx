import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Elif Altun - Portfolio",
  description: "Yazılım Mühendisliği Öğrencisi | Modern Minimalist Portföy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-[#121212] text-[#E0E0E0]`}
      >
        {children}
      </body>
    </html>
  );
}
