"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any;

interface LoopDef {
  worldY: number;
  size:   number;
  side:   1 | -1;
}

interface ThreadDef {
  baseX:        number;
  color:        string;
  weight:       number;
  speed:        number;
  yOffset:      number;
  seed:         number;
  amp:          number;
  loopInterval: number;
  loops:        LoopDef[];
}

function PageBgCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let inst: AnyP5 = null;

    const init = async () => {
      const { default: p5 } = await import("p5");

      const sketch = (p: AnyP5) => {
        let W = 0;
        let H = 0;
        const threads: ThreadDef[] = [];

        // ── ループ（ラッソ型）の座標列を計算 ──────────────────────
        // side=1: 右へ膨らむ / side=-1: 左へ膨らむ
        function buildLoopPts(
          cx: number, cy: number, r: number, side: 1 | -1
        ): [number, number][] {
          const rY      = r * 0.68;
          const circX   = cx + side * r;
          const startA  = side === 1 ? Math.PI : 0;
          const dir     = side === 1 ? -1 : 1;
          const TURNS   = 2.3;
          const pts: [number, number][] = [];
          for (let i = 0; i <= 72; i++) {
            const a = startA + dir * (i / 72) * Math.PI * TURNS;
            pts.push([circX + r * Math.cos(a), cy + rY * Math.sin(a)]);
          }
          return pts;
        }

        // ── ループ位置を事前生成 ──────────────────────────────────
        function generateLoops(seed: number, interval: number): LoopDef[] {
          const result: LoopDef[] = [];
          let y = interval * 0.4 + p.noise(seed) * interval * 0.3;
          for (let i = 0; i < 60; i++) {
            result.push({
              worldY: y,
              size:   22 + p.noise(seed + i * 0.5) * 38,
              side:   i % 2 === 0 ? 1 : -1,
            });
            y += interval + (p.noise(seed + i * 0.3 + 10) - 0.5) * interval * 0.4;
          }
          return result;
        }

        // ── スレッドの描画 ────────────────────────────────────────
        function renderThread(th: ThreadDef) {
          const drawnSet = new Set<LoopDef>();
          const pts: [number, number][] = [];
          let sy = -150;

          while (sy <= H + 150) {
            const wy = sy + th.yOffset;

            // ループ候補を探す（worldY との距離 < 6px）
            const lp = th.loops.find(
              l => !drawnSet.has(l) && Math.abs(l.worldY - wy) < 6
            );

            if (lp) {
              drawnSet.add(lp);
              const nx = (p.noise(wy * 0.005, th.seed) - 0.5) * th.amp;
              const cx = th.baseX + nx;
              for (const pt of buildLoopPts(cx, sy, lp.size, lp.side)) {
                pts.push(pt);
              }
              // ループ後は少し下へ進む
              sy += lp.size * 0.5;
            } else {
              const nx = (p.noise(wy * 0.005, th.seed) - 0.5) * th.amp;
              pts.push([th.baseX + nx, sy]);
              sy += 4;
            }
          }

          if (pts.length < 2) return;

          p.stroke(th.color);
          p.strokeWeight(th.weight);
          p.beginShape();
          for (const [x, y] of pts) p.vertex(x, y);
          p.endShape();

          // 進める（yOffset が大きくなりすぎたらリセット）
          th.yOffset += th.speed;
          if (th.yOffset > 8000) {
            th.yOffset = 0;
            th.loops = generateLoops(th.seed, th.loopInterval);
          }
        }

        // ── セットアップ ──────────────────────────────────────────
        p.setup = () => {
          W = window.innerWidth;
          H = window.innerHeight;
          const canvas = p.createCanvas(W, H);
          if (ref.current) canvas.parent(ref.current);
          p.noFill();
          p.strokeCap(p.ROUND);
          p.strokeJoin(p.ROUND);

          // 緑 3本（左〜中）
          const greenDefs = [
            { baseX: W * 0.06, weight: 13, speed: 0.55, yOffset: 0,    seed: 1.1,  amp: 55,  loopInterval: 520 },
            { baseX: W * 0.22, weight: 10, speed: 0.40, yOffset: 700,  seed: 4.7,  amp: 45,  loopInterval: 640 },
            { baseX: W * 0.42, weight:  8, speed: 0.65, yOffset: 350,  seed: 8.3,  amp: 60,  loopInterval: 480 },
          ];
          for (const d of greenDefs) {
            threads.push({ ...d, color: '#18724B', loops: generateLoops(d.seed, d.loopInterval) });
          }

          // 金 2本（中〜右）
          const yellowDefs = [
            { baseX: W * 0.62, weight: 12, speed: 0.50, yOffset: 200,  seed: 22.1, amp: 55,  loopInterval: 560 },
            { baseX: W * 0.85, weight: 10, speed: 0.70, yOffset: 900,  seed: 28.5, amp: 50,  loopInterval: 500 },
          ];
          for (const d of yellowDefs) {
            threads.push({ ...d, color: '#C89B00', loops: generateLoops(d.seed, d.loopInterval) });
          }
        };

        // ── 毎フレーム描画 ─────────────────────────────────────────
        p.draw = () => {
          p.clear();
          for (const th of threads) renderThread(th);
        };

        p.windowResized = () => {
          W = window.innerWidth;
          H = window.innerHeight;
          p.resizeCanvas(W, H);
          // x 位置を比率で更新
          threads[0].baseX = W * 0.06;
          threads[1].baseX = W * 0.22;
          threads[2].baseX = W * 0.42;
          threads[3].baseX = W * 0.62;
          threads[4].baseX = W * 0.85;
        };
      };

      inst = new p5(sketch);
    };

    init();
    return () => { if (inst) inst.remove(); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}

const PageBackground = dynamic(
  () => Promise.resolve(PageBgCanvas),
  { ssr: false }
);

export default PageBackground;
