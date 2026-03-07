"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { COLORS } from "../../config/colors";

const BAR_TEXT = "BAR";
const SAPPORO_TEXT = "SAPPORO";

export default function HeroSection() {
  const [barChars, setBarChars] = useState(0);
  const [sapporoChars, setSapporoChars] = useState(0);

  useEffect(() => {
    const barTimers = BAR_TEXT.split("").map((_, i) =>
      setTimeout(() => setBarChars(i + 1), 300 + i * 150)
    );
    const sapporoTimers = SAPPORO_TEXT.split("").map((_, i) =>
      setTimeout(() => setSapporoChars(i + 1), 950 + i * 120)
    );
    return () => [...barTimers, ...sapporoTimers].forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景画像 */}
      <Image
        src="/images/top_image.jpg"
        alt="Bar オープン 店内"
        fill
        priority
        className="object-cover"
      />

      {/* 暗めのオーバーレイ */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ロゴ＋BAR・SAPPOROテキスト */}
      <div className="relative z-10 flex items-center justify-center" style={{ width: 520, height: 420 }}>
        {/* BAR テキスト: 左上 */}
        <div
          className="font-nove absolute top-5 left-10 leading-none select-none"
          style={{
            fontSize: 80,
            color: "transparent",
            WebkitTextStroke: `2px ${COLORS.heroCream}`,
            transform: "rotate(-20deg)",
            transformOrigin: "left top",
          }}
        >
          {BAR_TEXT.slice(0, barChars)}
        </div>

        {/* 中央ロゴ（回転アニメーション）＋テキスト */}
        <div className="flex items-center justify-center" style={{ width: 300, height: 300 }}>
          <Image
            src="/images/open_logo_top.png"
            alt="Bar オープン"
            width={300}
            height={300}
            priority
            className="animate-spin absolute"
            style={{ animationDuration: "12s", animationTimingFunction: "linear", width: 300, height: 300 }}
          />
          <span
            className="relative text-3xl tracking-widest text-center leading-snug"
            style={{ color: COLORS.heroCream }}
          >
            オープン
          </span>
        </div>

        {/* SAPPORO テキスト: 右下 */}
        <div
          className="font-nove absolute bottom-5 right-0 leading-none select-none"
          style={{
            fontSize: 80,
            color: "transparent",
            WebkitTextStroke: `2px ${COLORS.heroCream}`,
            transform: "rotate(-15deg)",
            transformOrigin: "right bottom",
          }}
        >
          {SAPPORO_TEXT.slice(0, sapporoChars)}
        </div>
      </div>
    </section>
  );
}
