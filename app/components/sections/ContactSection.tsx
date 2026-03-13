import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-[5] pt-24 pb-8">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          Contact
        </h3>
        <div className="max-w-2xl mx-auto">
          <div>
            <p className="text-center mb-6 text-foreground">
              ご予約・お問い合わせは以下よりお願いいたします
            </p>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg mb-3 text-foreground">Instagram DM</p>
                <a
                  href="https://www.instagram.com/baropen_sapporo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-lg font-bold text-accent transition-colors px-6 py-3 border-2 border-accent rounded-lg hover:bg-gray-100"
                >
                  <Image
                    src="/images/logos/Instagram/Instagram_Glyph_Gradient.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                  <span>@baropen_sapporo</span>
                </a>
              </div>
              <div className="text-center pt-6 border-t border-accent/20">
                <p className="text-sm text-foreground mb-2">
                  お気軽にDMでお問い合わせください
                </p>
                <p className="text-sm text-foreground">初めての方も大歓迎です</p>
                <div className="mt-6 flex justify-center">
                  <Image
                    src="/images/テキストロゴ緑.png"
                    alt="Bar Open"
                    width={200}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
