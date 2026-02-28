"use client";

import dynamic from "next/dynamic";
import { useP5Sketch } from "../../hooks/useP5Sketch";
import { THREAD_COLORS } from "../../config/colors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any;

// コンポーネント外で定義することで参照が安定し、useP5Sketch の再実行を防ぐ
const sketch = (p: AnyP5, container: HTMLDivElement) => {
  class Thread {
    assignedColor: string;
    pos!: AnyP5;
    angle!: number;
    noiseOffset!: number;
    color!: string;
    thickness!: number;
    history!: AnyP5[];
    maxHistory!: number;
    speed!: number;

    constructor(assignedColor: string) {
      this.assignedColor = assignedColor;
      this.reset();
    }

    reset() {
      this.pos = p.createVector(p.random(-500, -100), p.random(window.innerHeight));
      this.angle = 0;
      this.noiseOffset = p.random(1000);
      this.color = this.assignedColor;
      this.thickness = p.random(10, 12);
      this.history = [];
      this.maxHistory = p.random(500, 600);
      this.speed = p.random(2.5, 3);
    }

    update() {
      const n = p.noise(
        this.pos.x * 0.003,
        this.pos.y * 0.003,
        p.frameCount * 0.005 + this.noiseOffset
      );
      const angleChange = p.map(n, 0, 1, -0.12, 0.12);
      this.angle += angleChange;
      this.angle = p.lerp(this.angle, 0, 0.01);

      this.pos.x += p.cos(this.angle) * this.speed;
      this.pos.y += p.sin(this.angle) * this.speed;

      this.history.push(this.pos.copy());
      if (this.history.length > this.maxHistory) this.history.shift();

      if (this.pos.x > p.width + 300 && this.history[0]?.x > p.width) {
        this.reset();
      }
    }

    show() {
      p.noFill();
      p.stroke(this.color);
      p.strokeWeight(this.thickness);
      p.strokeCap(p.ROUND);
      p.strokeJoin(p.ROUND);
      p.beginShape();
      for (const v of this.history) p.vertex(v.x, v.y);
      p.endShape();
    }
  }

  const threads: Thread[] = [];

  p.setup = () => {
    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);
    p.noFill();
    for (let i = 0; i < 6; i++) {
      threads.push(new Thread(THREAD_COLORS[i % 2]));
    }
  };

  p.draw = () => {
    p.clear();
    for (const t of threads) {
      t.update();
      t.show();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

function PageBgCanvas() {
  const ref = useP5Sketch(sketch);

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
