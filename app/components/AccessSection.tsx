export default function AccessSection() {
  return (
    <section id="access" className="py-24 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          Access
        </h3>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">住所</h4>
                <p>北海道札幌市 すすきの</p>
                <p className="text-sm text-gray-400 mt-1">
                  ※詳細な住所はお問い合わせください
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">営業時間</h4>
                <p>※お問い合わせください</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">定休日</h4>
                <p>※お問い合わせください</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Instagram</h4>
                <a
                  href="https://www.instagram.com/baropen_sapporo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8224e3] hover:text-white transition-colors"
                >
                  @baropen_sapporo
                </a>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Note</h4>
                <a
                  href="https://note.com/baropen_sapporo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8224e3] hover:text-white transition-colors"
                >
                  baropen_sapporo
                </a>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  アクセス
                </h4>
                <p>すすきの駅より徒歩圏内</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
