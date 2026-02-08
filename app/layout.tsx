import type { Metadata } from "next";
import { Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-old-mincho",
});

export const metadata: Metadata = {
  title: "BAR OPEN - 大人の隠れ家バー",
  description: "落ち着いた雰囲気の中で、こだわりのお酒とお料理をお楽しみください",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${zenOldMincho.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
