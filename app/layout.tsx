import type { Metadata } from "next";
import { Geist, Geist_Mono,Amiri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"], 
  subsets: ["arabic"],   
  display: "swap",       
});

export const metadata: Metadata = {
  title: "Lifethon - لايفثون ",
  description: "هاكثون يهدف إلى تحفيز الإبداع التقني والاستثماري وتطوير مهارات العرض لدى المشاركين",
  keywords: "هاكثون، إرتواء، تقنية، استثمار، تطوير",
  authors: [{ name: "Lifethon Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
