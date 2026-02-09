import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[var(--bg-section)]/40">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          About
        </h3>
        <div className="max-w-3xl mx-auto text-center">
          {/* About画像 */}
          <div className="mb-8">
            <Image
              src="/images/about.png"
              alt="Bar オープン About"
              width={600}
              height={848}
              className="rounded-lg mx-auto"
            />
          </div>
          <p className="text-lg leading-relaxed mb-6">
            Bar
            オープンは、表面的にはおしゃれな空間を楽しみつつ、表面的にはカジュアルな雰囲気で気軽に立ち寄れるバーです。
          </p>
          <p className="text-lg leading-relaxed mb-6">
            すすきので長年バーを営んできた店長・木村をはじめ個性豊かなスタッフたちが、初心者の方から常連の方まで、すべてのお客様に楽しんでいただける開放世界を作りました。
          </p>
          <p className="text-lg leading-relaxed">
            「オープン」とは「開放と解放」を意味し、この世のしがらみ、窮屈さを解き放ち、全国のあらゆるモノと人が交わる札幌のスクランブル交差点にすることを誰かに目指し名付けられました。
          </p>
          <p className="text-lg leading-relaxed">
            飲みに来る、展示を見る、誰かと話す、何もしない。どれでも大丈夫です。それぞれの空間で自分らしく解放しましょう。
          </p>
        </div>
      </div>
    </section>
  );
}
