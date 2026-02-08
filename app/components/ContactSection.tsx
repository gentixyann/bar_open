export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          Contact
        </h3>
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
            <p className="text-center mb-6">
              ご予約・お問い合わせは以下よりお願いいたします
            </p>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg mb-3">Instagram DM</p>
                <a
                  href="https://www.instagram.com/baropen_sapporo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-lg font-bold text-[#8224e3] hover:text-white transition-colors px-6 py-3 border-2 border-[#8224e3] rounded-lg hover:bg-[#8224e3]/20"
                >
                  @baropen_sapporo
                </a>
              </div>
              <div className="text-center pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">
                  お気軽にDMでお問い合わせください
                </p>
                <p className="text-sm text-gray-400">初めての方も大歓迎です</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
