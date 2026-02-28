export default function AboutSection() {
  return (
    <section id="about" className="relative z-[5] py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          About
        </h3>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed mb-6 text-foreground">
            札幌で"開放と解放"をテーマに、人と文化がゆるやかにつながる空間を目指すバーです。
          </p>
          <p className="text-lg leading-relaxed mb-6 text-foreground">
            すすきので長年バーを営んできた店長・木村をはじめ個性豊かなスタッフたちが、初心者の方から常連の方まで、すべてのお客様に楽しんでいただける開放世界を作りました。
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            飲みに来る、展示を見る、誰かと話す、何もしない。どれでも大丈夫です。それぞれの空間で自分らしく解放しましょう。
          </p>
        </div>
      </div>
    </section>
  );
}
