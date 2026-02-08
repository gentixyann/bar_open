"use client";

import dynamic from "next/dynamic";

// p5.jsシェーダーアニメーションを動的インポート（SSR無効）
const ShaderAnimation = dynamic(
  () => import("./ShaderAnimation"),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* p5.js シェーダーアニメーション背景 */}
      <ShaderAnimation />

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-[1]" />

      {/* コンテンツ */}
      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
          Bar オープン
        </h2>
        <p className="text-2xl text-gray-200 mb-4 drop-shadow-lg">
          解放 × 開放
        </p>
      </div>
    </section>
  );
}
