"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any;

function AboutBackgroundCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let inst: AnyP5 = null;

    const init = async () => {
      const { default: p5 } = await import("p5");

      const sketch = (p: AnyP5) => {
        let w = 0;
        let h = 0;
        let greenOffset  = 0;
        let yellowOffset = 100;

        p.setup = () => {
          if (!ref.current) return;
          w = ref.current.offsetWidth;
          h = ref.current.offsetHeight;
          const canvas = p.createCanvas(w, h);
          canvas.parent(ref.current);
          p.noFill();
          p.strokeCap(p.ROUND);
          p.strokeJoin(p.ROUND);
        };

        p.draw = () => {
          p.clear();

          // ── 緑の糸: 左端を「上→下」へ流れる
          // y を上から下へ走査、x は左端(0)付近でノイズによりうねる
          p.stroke('#18724B');
          p.strokeWeight(28);
          p.beginShape();
          for (let y = -120; y <= h + 120; y += 4) {
            const n = p.noise(y * 0.007 - greenOffset, 0.5);
            // x: map で -60(画面外左) ～ 110(110px 内側) にマッピング
            const x = p.map(n, 0, 1, -60, 110);
            p.vertex(x, y);
          }
          p.endShape();

          // ── 黄の糸: 右端を「下→上」へ流れる
          // y を下から上へ走査（逆順）、x は右端(w)付近でノイズによりうねる
          p.stroke('#C89B00');
          p.strokeWeight(32);
          p.beginShape();
          for (let y = h + 120; y >= -120; y -= 4) {
            const n = p.noise(y * 0.007 + yellowOffset, 50.5);
            // x: 右端から内側へ最大 110px
            const x = w - p.map(n, 0, 1, -60, 110);
            p.vertex(x, y);
          }
          p.endShape();

          // 流れる速度（小さいほど遅い）
          greenOffset  += 0.002;
          yellowOffset += 0.002;
        };

        p.windowResized = () => {
          if (!ref.current) return;
          w = ref.current.offsetWidth;
          h = ref.current.offsetHeight;
          p.resizeCanvas(w, h);
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
      style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}
    />
  );
}

const AboutBackground = dynamic(
  () => Promise.resolve(AboutBackgroundCanvas),
  { ssr: false }
);

export default AboutBackground;
