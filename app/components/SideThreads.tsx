"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any;

function SideThreadsCanvas() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let leftInst:  AnyP5 = null;
    let rightInst: AnyP5 = null;

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const init = async () => {
      const { default: p5 } = await import("p5");

      const CANVAS_W = 80;

      const makeSketch = (
        elRef: React.RefObject<HTMLDivElement | null>,
        side: "left" | "right",
        r: number, g: number, b: number
      ) => (p: AnyP5) => {
        let H = window.innerHeight;
        let t = 0;

        p.setup = () => {
          const canvas = p.createCanvas(CANVAS_W, H);
          if (elRef.current) canvas.parent(elRef.current);
          p.noFill();
          p.strokeCap(p.ROUND);
          p.strokeJoin(p.ROUND);
        };

        p.draw = () => {
          p.clear();

          // ヒーロー通過後にフェードイン
          const heroH = window.innerHeight;
          const rawAlpha = (scrollY - heroH * 0.3) / (heroH * 0.3) * 255;
          const alpha = Math.min(255, Math.max(0, rawAlpha));

          if (alpha <= 0) { t += 0.004; return; }

          p.stroke(r, g, b, alpha);
          p.strokeWeight(10);

          p.beginShape();
          for (let y = -20; y <= H + 20; y += 3) {
            // worldY でスクロールに連動させる
            const wy = y + scrollY;

            // 3層の波: 大・中・細
            const w1 = Math.sin(wy * 0.004  + t * 0.5)          * 55;
            const w2 = Math.sin(wy * 0.014  + t * 0.9  + 2.0)   * 20;
            const w3 = Math.sin(wy * 0.030  + t * 0.55 + 4.5)   *  8;
            const wave = w1 + w2 + w3;

            // 左: canvas 内 (0〜CANVAS_W) に波が来るよう基点を調整
            //   wave 範囲: ±83。基点を CANVAS_W/2 にすると中央に収まる
            // 右: 同様に CANVAS_W/2 を中心に反転
            const x = side === "left"
              ? CANVAS_W * 0.5 + wave   // 左端: -23〜+123 (clipped 0〜80)
              : CANVAS_W * 0.5 - wave;  // 右端: 同様

            p.vertex(x, y);
          }
          p.endShape();

          t += 0.004;
        };

        p.windowResized = () => {
          H = window.innerHeight;
          p.resizeCanvas(CANVAS_W, H);
        };
      };

      leftInst  = new p5(makeSketch(leftRef,  "left",  10,  113, 78));
      rightInst = new p5(makeSketch(rightRef, "right", 204, 163,  0));
    };

    init();

    return () => {
      window.removeEventListener("scroll", onScroll);
      leftInst?.remove();
      rightInst?.remove();
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width:  "80px",
    height: "100vh",
    pointerEvents: "none",
    overflow: "hidden",
    // セクション背景(z-index なし)より前面、ヒーロー(z:20)より背面
    zIndex: 15,
  };

  return (
    <>
      <div ref={leftRef}  style={{ ...baseStyle, left:  0 }} />
      <div ref={rightRef} style={{ ...baseStyle, right: 0 }} />
    </>
  );
}

const SideThreads = dynamic(
  () => Promise.resolve(SideThreadsCanvas),
  { ssr: false }
);

export default SideThreads;
