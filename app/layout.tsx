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

const noveFont = localFont({
  src: "../public/fonts/nove.ttf",
  variable: "--font-nove",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-motor",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bar-open.pages.dev"),
  title: "バー・オープン - 札幌",
  description: "札幌・大通公園すぐ近くのバー・オープン。解放×開放をテーマに、おしゃれな空間とカジュアルな雰囲気で初心者から常連まで楽しめるバーです。",
  keywords: ["バー・オープン", "バー", "札幌", "大通公園", "飲み放題", "カジュアル", "おしゃれ"],
  authors: [{ name: "バー・オープン" }],
  openGraph: {
    title: "バー・オープン - 札幌",
    description: "解放×開放をテーマに、おしゃれ×カジュアルな雰囲気で楽しめるバーです。",
    url: "https://bar-open.pages.dev",
    siteName: "バー・オープン",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "バー・オープン - 札幌",
    description: "解放×開放をテーマに、おしゃれ×カジュアルな雰囲気で楽しめるバーです。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://bar-open.pages.dev/#website",
      url: "https://bar-open.pages.dev",
      name: "バー・オープン",
      inLanguage: "ja",
      publisher: { "@id": "https://bar-open.pages.dev/#business" },
    },
    {
      "@type": "BarOrPub",
      "@id": "https://bar-open.pages.dev/#business",
      name: "バー・オープン",
      description:
        "札幌・大通公園すぐ近くのバー・オープン。解放×開放をテーマに、おしゃれな空間とカジュアルな雰囲気で初心者から常連まで楽しめるバーです。",
      url: "https://bar-open.pages.dev",
      image: "https://bar-open.pages.dev/icon.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "南１条西１丁目３ 板谷ビル 8階",
        addressLocality: "札幌市中央区",
        addressRegion: "北海道",
        addressCountry: "JP",
      },
      servesCuisine: "Bar",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "19:00",
          closes: "24:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${bokuGothic.variable} ${bebasNeue.variable} ${noveFont.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
