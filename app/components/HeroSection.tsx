"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// p5.jsシェーダーアニメーションを動的インポート（SSR無効）
const ShaderAnimation = dynamic(
  () => import("./ShaderAnimation"),
  { ssr: false }
);

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(0.5); // 初期速度（度/フレーム）
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // アニメーションループ
    const animate = () => {
      if (logoRef.current) {
        rotationRef.current += speedRef.current;
        logoRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // ランダムな速度を1-5秒ごとに変更
    const changeSpeed = () => {
      const newSpeed = Math.random() * 1.5 + 0.3; // 0.3-1.8度/フレーム
      speedRef.current = newSpeed;

      const nextChange = Math.random() * 4000 + 1000; // 1-5秒
      setTimeout(changeSpeed, nextChange);
    };

    changeSpeed();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* p5.js シェーダーアニメーション背景 */}
      <ShaderAnimation />

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80 z-[1]" />

      {/* コンテンツ */}
      <div className="relative z-10 text-center">
        {/* 回転するロゴ */}
        <div className="mb-8 flex justify-center">
          <div ref={logoRef} className="inline-block">
            <Image
              src="/images/open_logo_top.png"
              alt="Bar オープン ロゴ"
              width={150}
              height={150}
              priority
              className="drop-shadow-2xl"
            />
          </div>
        </div>

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
