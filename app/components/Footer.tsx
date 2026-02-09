import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-accent/30 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm">
            © 2026 Bar オープン. All rights reserved.
          </p>
          <p className="text-xs mt-2">北海道札幌市 大通公園すぐそば</p>
          <div className="mt-4 flex justify-center items-center gap-6">
            <a
              href="https://www.instagram.com/baropen_sapporo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Image
                src="/images/logos/Instagram/Instagram_Glyph_Gradient.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="hover:opacity-80 transition-opacity"
              />
            </a>
            <a
              href="https://note.com/baropen_sapporo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent transition-colors"
              aria-label="Note"
            >
              <Image
                src="/images/logos/note/logo.svg"
                alt="Note"
                width={24}
                height={24}
                className="hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
