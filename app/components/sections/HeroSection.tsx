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
      setTimeout(() => setBarChars(i + 1), 800 + i * 250)
    );
    const sapporoTimers = SAPPORO_TEXT.split("").map((_, i) =>
      setTimeout(() => setSapporoChars(i + 1), 1800 + i * 200)
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
        alt="バー・オープン 店内"
        fill
        priority
        className="object-cover"
      />

      {/* 暗めのオーバーレイ */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ロゴ＋BAR・SAPPOROテキスト */}
      <div className="relative z-10 flex items-center justify-center" style={{ width: 520, height: 520 }}>
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

        {/* 中央ロゴ（回転アニメーション）＋下部ロゴ */}
        <div className="flex flex-col items-center justify-center gap-0">
          <div className="flex items-center justify-center" style={{ width: 300, height: 300 }}>
            <Image
              src="/images/open_logo.png"
              alt="バー・オープン"
              width={300}
              height={300}
              priority
              className="animate-spin"
              style={{ animationDuration: "12s", animationTimingFunction: "linear", width: 300, height: 300 }}
            />
          </div>
          <Image
            src="/images/open_logo_title.png"
            alt="オープン"
            width={200}
            height={100}
            priority
            style={{ width: 200, height: "auto" }}
          />
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
