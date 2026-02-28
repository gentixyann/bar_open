import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景画像 */}
      <Image
        src="/images/top_image.jpg"
        alt="Bar オープン 店内"
        fill
        priority
        className="object-cover"
      />

      {/* 暗めのオーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 中央ロゴ（回転アニメーション）＋テキスト */}
      <div className="relative z-10 flex items-center justify-center" style={{ width: 300, height: 300 }}>
        {/* 回転するロゴ */}
        <Image
          src="/images/open_logo_top.png"
          alt="Bar オープン"
          width={300}
          height={300}
          priority
          className="animate-spin absolute inset-0"
          style={{ animationDuration: "12s", animationTimingFunction: "linear" }}
        />
        {/* 中央テキスト（回転しない） */}
        <span
          className="relative text-3xl tracking-widest"
          style={{ color: "#eeead7" }}
        >
          オープン
        </span>
      </div>
    </section>
  );
}
