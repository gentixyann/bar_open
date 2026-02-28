"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

interface ThreadDecorationProps {
  color?: "green" | "yellow";
  height?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any;

function ThreadDecorationCanvas({ color = "green", height = 240 }: ThreadDecorationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: AnyP5 = null;

    const initP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const threadCol = color === "green" ? "#0a714e" : "#cca300";

      const sketch = (p: AnyP5) => {
        let t = 0;
        let w = 0;
        const h = height;

        p.setup = () => {
          if (!containerRef.current) return;
          w = containerRef.current.offsetWidth;
          const canvas = p.createCanvas(w, h);
          canvas.parent(containerRef.current);
          p.noFill();
        };

        p.draw = () => {
          p.clear();
          p.stroke(threadCol);
          p.strokeWeight(8);
          p.strokeCap(p.ROUND);
          p.strokeJoin(p.ROUND);

          const midY = h * 0.5;
          const breathe = Math.sin(t * 0.4) * 5;
          const pts: [number, number][] = [];

          if (color === "green") {
            // ── グリーン: 1本の糸 + ラッソ型ループ × 2
            // ラッソ = 左側から進入し、上方向に輪を作り、交差して抜ける
            const r  = Math.min(h * 0.30, 52);
            const rY = r * 0.74;

            const loops = [
              { lx: w * 0.24, ly: midY + breathe },
              { lx: w * 0.67, ly: midY - breathe },
            ];

            // exitAngle = π + 2.35π ≒ 3.35π
            // cos(3.35π) ≈ -0.454 → ループ後 x = lx - 0.454r
            const EXIT_EXTRA = Math.PI * 2.35;
            const exitCosVal = Math.cos(Math.PI + EXIT_EXTRA); // ≈ -0.454
            const exitSinVal = Math.sin(Math.PI + EXIT_EXTRA);

            let curX = -20;

            for (let li = 0; li < loops.length; li++) {
              const { lx, ly } = loops[li];
              const phase = li * 1.3;

              // 波線セグメント → ループ入口手前まで
              for (let x = curX; x <= lx - r * 1.25; x += 3) {
                pts.push([
                  x,
                  midY + Math.sin((x / w) * Math.PI * 3 + t * 0.4 + phase) * h * 0.09,
                ]);
              }

              // ラッソループ描画
              // 角度 π (左端) から π + 2.35π (ちょうど一回転+交差分)
              const steps = 100;
              for (let i = 0; i <= steps; i++) {
                const frac = i / steps;
                const angle = Math.PI + frac * EXIT_EXTRA;
                pts.push([
                  lx + r  * Math.cos(angle),
                  ly + rY * Math.sin(angle),
                ]);
              }

              // ループ終了後の x を次の開始点に
              curX = lx + r * exitCosVal + 8;
              void exitSinVal; // 使用済み変数の lint 抑制
            }

            // 最終波線 → 右端
            const lastPhase = loops.length * 1.3;
            for (let x = curX; x <= w + 20; x += 3) {
              pts.push([
                x,
                midY + Math.sin((x / w) * Math.PI * 3 + t * 0.4 + lastPhase) * h * 0.09,
              ]);
            }

          } else {
            // ── ゴールド: 1本の糸 + コイル型ループ × 3
            // コイル = 外側から徐々に内側へ 2.3 回巻いたスパイラル
            const cr  = Math.min(h * 0.27, 44);
            const crY = cr * 0.85;

            const coils = [
              { cx: w * 0.16, cy: midY + breathe },
              { cx: w * 0.48, cy: midY - breathe * 0.7 },
              { cx: w * 0.80, cy: midY + breathe * 0.8 },
            ];

            const TURNS     = 2.3;
            const EXIT_ANG  = Math.PI + TURNS * Math.PI * 2; // 5.6π
            const EXIT_R    = cr * (1 - 0.35);               // 最終半径

            let curX = -20;

            for (let ci = 0; ci < coils.length; ci++) {
              const { cx: co, cy: coY } = coils[ci];
              const phase = ci * 1.1;

              // 波線 → コイル入口手前
              for (let x = curX; x <= co - cr * 1.4; x += 3) {
                pts.push([
                  x,
                  midY + Math.sin((x / w) * Math.PI * 2.5 + t * 0.4 + phase) * h * 0.08,
                ]);
              }

              // コイル: 外→内スパイラル (2.3 回転)
              const steps = 90;
              for (let i = 0; i <= steps; i++) {
                const frac  = i / steps;
                const angle = Math.PI + frac * TURNS * Math.PI * 2;
                const r     = cr * (1 - frac * 0.35);
                pts.push([
                  co + r    * Math.cos(angle),
                  coY + r * crY / cr * Math.sin(angle),
                ]);
              }

              // コイル後の続き
              curX = co + EXIT_R * Math.cos(EXIT_ANG) + 18;
            }

            // 最終波線 → 右端
            const lastPhase = coils.length * 1.1;
            for (let x = curX; x <= w + 20; x += 3) {
              pts.push([
                x,
                midY + Math.sin((x / w) * Math.PI * 2.5 + t * 0.4 + lastPhase) * h * 0.08,
              ]);
            }
          }

          // 全点を一筆書きで描画
          if (pts.length > 1) {
            p.beginShape();
            for (const [x, y] of pts) {
              p.vertex(x, y);
            }
            p.endShape();
          }

          t += 0.007;
        };

        p.windowResized = () => {
          if (!containerRef.current) return;
          w = containerRef.current.offsetWidth;
          p.resizeCanvas(w, h);
        };
      };

      p5Instance = new p5(sketch);
    };

    initP5();
    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, [color, height]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: `${height}px`, overflow: "hidden" }}
    />
  );
}

const ThreadDecoration = dynamic(
  () => Promise.resolve(ThreadDecorationCanvas),
  { ssr: false }
);

export default ThreadDecoration;
