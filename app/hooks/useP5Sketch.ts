"use client";

import { useEffect, useRef } from "react";

// p5.js を動的 import するため any 型を使用
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any;

/**
 * p5.js スケッチを指定した div コンテナにマウントする汎用フック。
 *
 * - p5.js を動的 import（SSR 回避）
 * - アンマウント時に p5 インスタンスを確実に破棄
 * - コンポーネント側は sketch 関数の定義に集中できる
 *
 * 使用例:
 *   const ref = useP5Sketch((p, container) => {
 *     p.setup = () => {
 *       const canvas = p.createCanvas(800, 600);
 *       canvas.parent(container);
 *     };
 *     p.draw = () => { ... };
 *   });
 *   return <div ref={ref} />;
 */
export function useP5Sketch(
  sketch: (p: AnyP5, container: HTMLDivElement) => void
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let inst: AnyP5 = null;

    const init = async () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const { default: p5 } = await import("p5");
      inst = new p5((p: AnyP5) => sketch(p, container));
    };

    init();

    return () => {
      if (inst) inst.remove();
    };
    // sketch はコンポーネント外の定数として定義することを推奨（参照が変わらない）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
