/**
 * アプリケーションカラー定数
 * CSS変数（Tailwind）で対応できないJSコンテキスト（p5.js canvas等）向け
 * Tailwindクラス（text-accent, text-accent-yellow等）と二重管理になるが、
 * canvas描画では getComputedStyle が使えないため定数として保持する
 */
export const COLORS = {
  // ブランドカラー（globals.css の --accent, --accent-yellow に対応）
  accent: "#4c9e36",
  accentYellow: "#cca300",

  // ベースカラー（globals.css の --background, --foreground に対応）
  background: "#ffffff",
  foreground: "#111111",

  // UIスペシフィック
  heroCream: "#eeead7", // ヒーローセクションのロゴテキスト
} as const;

/** p5.js スレッドアニメーションで交互に使うカラーペア */
export const THREAD_COLORS = [COLORS.accent, COLORS.accentYellow] as const;

export type ColorKey = keyof typeof COLORS;
