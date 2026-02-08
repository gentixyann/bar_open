export default function AccessSection() {
  return (
    <section id="access" className="py-24 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          Access
        </h3>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 店舗情報 */}
            <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">住所</h4>
                  <p>北海道札幌市 大通公園すぐそば</p>
                  <p className="text-sm mt-1">
                    大通駅はなんかいっぱい出口あってわからない、って人のために。まずは32番出口を探しましょう。
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    営業時間
                  </h4>
                  <p>19:00 - 24:00</p>
                  <p className="text-sm text-gray-400 mt-1">
                    ラストオーダー 23:30
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">定休日</h4>
                  <p>日曜日・水曜日</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    アクセス
                  </h4>
                  <p>すすきの駅より徒歩圏内</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-gray-900/50 p-4 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.769!2d141.3565286!3d43.0597237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29d3a8ce7877%3A0x2a776b483c994a15!2sBar%20%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3!5e0!3m2!1sja!2sjp!4v1707384000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px", borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bar オープン 地図"
              ></iframe>
            </div>
          </div>

          {/* Google Mapsへのリンク */}
          <div className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/hoecGKVfWnC58JnW6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent hover:text-white transition-colors"
            >
              Google Mapsで開く →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
