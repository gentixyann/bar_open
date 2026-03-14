import Image from "next/image";
import FadeIn from "../animations/FadeIn";

export default function AccessSection() {
  return (
    <section id="access" className="relative z-[5] py-24">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          Access
        </h3>
        <FadeIn>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 店舗情報 */}
            <div className="relative bg-bg-section p-8 rounded-lg border border-accent/15 transition-all duration-300">
              <Image
                src="/images/terebitou_01.png"
                alt=""
                width={40}
                height={40}
                aria-hidden="true"
                className="absolute object-contain pointer-events-none"
                style={{ top: "-50px", right: "12px", transform: "rotate(12deg)" }}
              />
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2 border-l-4 border-accent pl-3">住所</h4>
                  <p className="text-foreground">北海道札幌市中央区南１条西１丁目３ 板谷ビル 8階</p>
                  <p className="text-sm text-foreground mt-1">
                    大通駅はなんかいっぱい出口あってわからない、って人のために。まずは32番出口を探しましょう。
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2 border-l-4 border-accent pl-3">
                    営業時間
                  </h4>
                  <p className="text-foreground">19:00 - 24:00</p>
                  <p className="text-sm text-foreground mt-1">
                    ラストオーダー 23:30
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2 border-l-4 border-accent pl-3">定休日</h4>
                  <p className="text-foreground">月曜日・火曜日</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2 border-l-4 border-accent pl-3">
                    アクセス
                  </h4>
                  <p className="text-foreground">すすきの駅より徒歩圏内</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.769!2d141.3565286!3d43.0597237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29d3a8ce7877%3A0x2a776b483c994a15!2sBar%20%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3!5e0!3m2!1sja!2sjp!4v1707384000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px", borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="バー・オープン 地図"
              ></iframe>
            </div>
          </div>

          {/* Google Mapsへのリンク */}
          <div className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/hoecGKVfWnC58JnW6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-foreground transition-colors"
            >
              <span>GoogleMapsで開く</span>
            </a>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
