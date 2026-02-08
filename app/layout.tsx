import type { Metadata } from "next";
import { Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-old-mincho",
});

export const metadata: Metadata = {
  title: "Bar オープン - 札幌すすきの | おしゃれ×カジュアルなバー",
  description: "札幌すすきののBar オープン。おしゃれな空間とカジュアルな雰囲気で、初心者から常連まで楽しめるバーです。",
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
