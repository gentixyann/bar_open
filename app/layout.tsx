import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bokuGothic = localFont({
  src: "../public/fonts/Boku2-Bold.otf",
  variable: "--font-boku-gothic",
  weight: "400",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-motor",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bar オープン - 札幌 | 解放×開放",
  description: "札幌・大通公園すぐそばのBar オープン。解放×開放をテーマに、おしゃれな空間とカジュアルな雰囲気で初心者から常連まで楽しめるバーです。営業時間19:00-24:00、飲み放題3,000円。日曜・水曜定休。",
  keywords: ["Bar オープン", "バー", "札幌", "大通公園", "飲み放題", "カジュアル", "おしゃれ"],
  authors: [{ name: "Bar オープン" }],
  openGraph: {
    title: "Bar オープン - 札幌",
    description: "解放×開放をテーマに、おしゃれ×カジュアルな雰囲気で楽しめるバーです。",
    url: "https://bar-open.pages.dev",
    siteName: "Bar オープン",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bar オープン - 札幌",
    description: "解放×開放をテーマに、おしゃれ×カジュアルな雰囲気で楽しめるバーです。",
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
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${bokuGothic.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
