"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

export default function ShopCardAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const sketch = (p: p5) => {
      let rot = 0;
      let t = 0;

      // 浮遊パーティクル
      interface Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
        alpha: number;
      }
      const particles: Particle[] = [];

      p.setup = () => {
        const rect = el.getBoundingClientRect();
        const canvas = p.createCanvas(rect.width, rect.height);
        canvas.parent(el);

        // パーティクル初期化
        for (let i = 0; i < 28; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.3, 0.3),
            vy: p.random(-0.5, -0.1),
            r: p.random(2, 5),
            alpha: p.random(60, 160),
          });
        }
      };

      // 浮遊パーティクル更新・描画
      const drawParticles = () => {
        for (const pt of particles) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          // 画面外に出たらリセット
          if (pt.y < -10) {
            pt.y = p.height + 10;
            pt.x = p.random(p.width);
          }
          if (pt.x < -10) pt.x = p.width + 10;
          if (pt.x > p.width + 10) pt.x = -10;

          p.noStroke();
          p.fill(255, 255, 255, pt.alpha * (0.6 + 0.4 * Math.sin(t + pt.x)));
          p.circle(pt.x, pt.y, pt.r);
        }
      };

      // 背景の流れるリボン曲線
      const drawCurves = () => {
        const w = p.width, h = p.height;
        p.noFill();
        p.strokeCap(p.ROUND);
        p.stroke(6, 60, 40);
        p.strokeWeight(w * 0.13);

        const wave1 = Math.sin(t * 0.4) * h * 0.02;
        p.bezier(
          w * 0.25, -h * 0.05 + wave1,
          w * 0.48,  h * 0.08 + wave1,
          w * 0.85,  h * 0.3  + wave1,
          w * 1.25,  h * 0.54 + wave1
        );

        const wave2 = Math.sin(t * 0.4 + 1.6) * h * 0.02;
        p.bezier(
          -w * 0.2,  h * 0.54 + wave2,
           w * 0.08, h * 0.68 + wave2,
           w * 0.45, h * 0.9  + wave2,
           w * 0.9,  h * 1.15 + wave2
        );
      };

      // カメラ絞りアパーチャー（呼吸する開閉アニメーション付き）
      const drawAperture = (cx: number, cy: number, r: number) => {
        // innerRadiusが呼吸するように変化（絞りの開閉）
        const breathe = Math.sin(t * 0.6) * 0.06;
        const innerR = r * (0.22 + breathe);
        const n = 6;

        // 外円（ベージュ）
        p.fill(210, 195, 155);
        p.noStroke();
        p.circle(cx, cy, r * 2);

        // 絞り羽根 × 6（ゆっくり回転）
        p.fill(8, 90, 58);
        p.noStroke();
        for (let i = 0; i < n; i++) {
          const a0 = rot + (i / n) * p.TWO_PI;
          const a1 = a0 + (p.TWO_PI / n) * 0.72;

          p.beginShape();
          for (let a = a0; a <= a1 + 0.01; a += 0.04) {
            p.vertex(cx + Math.cos(a) * innerR, cy + Math.sin(a) * innerR);
          }
          for (let a = a1; a >= a0 - 0.01; a -= 0.04) {
            p.vertex(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
          }
          p.endShape(p.CLOSE);
        }

        // 中心ベージュ円
        p.fill(210, 195, 155);
        p.noStroke();
        p.circle(cx, cy, innerR * 3.0);

        // 「オープン」テキスト（フェード＋微縮）
        const textScale = 1 + Math.sin(t * 0.8) * 0.03;
        p.fill(20, 70, 45);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont("serif");
        p.textStyle(p.NORMAL);
        p.textSize(innerR * 0.9 * textScale);
        p.text("オープン", cx, cy);
      };

      // アウトライン（白縁）テキスト（パルスアニメーション付き）
      const drawOutlineText = (
        txt: string,
        x: number,
        y: number,
        baseSz: number,
        angle: number,
        phase: number
      ) => {
        // サイズが微妙にパルス
        const pulse = 1 + Math.sin(t * 0.7 + phase) * 0.025;
        const sz = baseSz * pulse;

        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.textFont("sans-serif");
        p.textStyle(p.BOLD);
        p.textSize(sz);
        p.textAlign(p.LEFT, p.TOP);
        p.strokeWeight(sz * 0.04);
        // アルファもわずかに脈動
        const alpha = 200 + Math.sin(t * 0.7 + phase) * 40;
        p.stroke(255, 255, 255, alpha);
        p.noFill();
        p.text(txt, 0, 0);
        p.pop();
      };

      p.draw = () => {
        const w = p.width, h = p.height;
        t += 0.02;
        rot += 0.004;

        p.background(10, 113, 78);

        drawCurves();
        drawParticles();

        drawAperture(w * 0.48, h * 0.44, w * 0.3);

        // BAR（左上・大きく）
        drawOutlineText("BAR", w * -0.08, h * 0.02, w * 0.43, -0.22, 0);

        // SAPPORO（右下）
        drawOutlineText("SAPPORO", w * 0.04, h * 0.71, w * 0.195, -0.22, 1.5);
      };

      p.windowResized = () => {
        const rect = el.getBoundingClientRect();
        p.resizeCanvas(rect.width, rect.height);
      };
    };

    p5Ref.current = new p5(sketch);
    return () => {
      p5Ref.current?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-xl shadow-2xl overflow-hidden w-64 md:w-80 h-96 md:h-[480px]"
    />
  );
}
