"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  alpha: number;
}

export default function LiberationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: Particle[] = [];
    const maxParticles = 100; // パーティクル数を削減
    let time = 0;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.noStroke();
      };

      p.draw = () => {
        // 背景を徐々にフェードアウトさせる
        p.background(0, 0, 0, 0.1);

        time += 0.01;

        // パーティクルの生成
        if (particles.length < maxParticles && p.frameCount % 2 === 0) {
          const centerX = p.width / 2;
          const centerY = p.height / 2;

          // 「解放」を表現：中心から放射状に広がる
          const angle = p.random(p.TWO_PI);
          const speed = p.random(0.5, 3);
          const distance = p.random(0, 50);

          particles.push({
            x: centerX + p.cos(angle) * distance,
            y: centerY + p.sin(angle) * distance,
            vx: p.cos(angle) * speed,
            vy: p.sin(angle) * speed,
            life: 0,
            maxLife: p.random(100, 300),
            size: p.random(2, 8),
            hue: p.random(0, 30), // オレンジ・コーラル系の色
            alpha: 0.8,
          });
        }

        // 時々大きな爆発を起こす
        if (p.frameCount % 180 === 0) {
          const burstX = p.width / 2 + p.random(-100, 100);
          const burstY = p.height / 2 + p.random(-100, 100);

          for (let i = 0; i < 30; i++) {
            const angle = p.random(p.TWO_PI);
            const speed = p.random(2, 6);

            particles.push({
              x: burstX,
              y: burstY,
              vx: p.cos(angle) * speed,
              vy: p.sin(angle) * speed,
              life: 0,
              maxLife: p.random(80, 200),
              size: p.random(3, 12),
              hue: p.random(5, 25),
              alpha: 1,
            });
          }
        }

        // パーティクルの更新と描画
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];

          // 速度に揺らぎを加える（有機的な動き）
          particle.vx += p.noise(particle.x * 0.01, particle.y * 0.01, time) * 0.1 - 0.05;
          particle.vy += p.noise(particle.y * 0.01, particle.x * 0.01, time + 1000) * 0.1 - 0.05;

          // 重力の影響（わずかに上昇）
          particle.vy -= 0.02;

          // 位置の更新
          particle.x += particle.vx;
          particle.y += particle.vy;

          // ライフの更新
          particle.life++;
          const lifeRatio = particle.life / particle.maxLife;

          // アルファ値の計算（フェードアウト）
          particle.alpha = 1 - lifeRatio;

          // 色の変化（暗い紫から明るい紫/ピンクへ）
          const currentHue = particle.hue + lifeRatio * 20;
          const brightness = 50 + lifeRatio * 50;

          // 描画
          p.fill(currentHue, 80, brightness, particle.alpha);
          p.circle(particle.x, particle.y, particle.size * (1 - lifeRatio * 0.5));

          // グロー効果
          p.fill(currentHue, 60, brightness, particle.alpha * 0.3);
          p.circle(particle.x, particle.y, particle.size * 2 * (1 - lifeRatio * 0.5));

          // ライフが尽きたら削除
          if (particle.life >= particle.maxLife || particle.y < -50) {
            particles.splice(i, 1);
          }
        }

        // 接続線を描画（パフォーマンス最適化版：一部のパーティクルのみ）
        if (particles.length > 10 && p.frameCount % 2 === 0) {
          // 2フレームに1回のみ描画
          p.stroke(15, 70, 90, 0.15);
          p.strokeWeight(0.5);

          // 最大30個のパーティクルのみチェック
          const maxCheck = Math.min(particles.length, 30);
          for (let i = 0; i < maxCheck; i++) {
            for (let j = i + 1; j < maxCheck && j < i + 5; j++) {
              // 近くの5個のみチェック
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 80) {
                const alpha = (1 - dist / 80) * 0.2;
                p.stroke(15, 70, 90, alpha * particles[i].alpha * particles[j].alpha);
                p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
              }
            }
          }
          p.noStroke();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
