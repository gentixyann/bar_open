import Image from "next/image";
import FadeIn from "../animations/FadeIn";

export default function Footer() {
  return (
    <footer className="relative z-[5] border-t border-accent/20 py-8">
      <div className="container mx-auto px-6">
        <FadeIn>
        <div className="text-center">
          <p className="text-sm text-foreground">
            © 2026 バー・オープン. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-foreground">北海道札幌市中央区南１条西１丁目３ 板谷ビル 8階</p>
          <div className="mt-4 flex justify-center items-center gap-6">
            <a
              href="https://www.instagram.com/baropen_sapporo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <Image
                src="/images/logos/Instagram/Instagram_Glyph_Gradient.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://note.com/baropen_sapporo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Note"
            >
              <Image
                src="/images/logos/note/square.svg"
                alt="Note"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
        </FadeIn>
      </div>
    </footer>
  );
}
