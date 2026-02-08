export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © 2026 Bar オープン. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2">北海道札幌市 すすきの</p>
          <div className="mt-4 flex justify-center gap-6">
            <a
              href="https://www.instagram.com/baropen_sapporo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#8224e3] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://note.com/baropen_sapporo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#8224e3] transition-colors"
            >
              Note
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
