"use client";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = ["About", "Menu", "Access", "Contact"];

  const handleMenuClick = (item: string) => {
    onClose();
    // スムーススクロール
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* メニュー */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-accent/30 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 閉じるボタン */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-foreground hover:text-accent transition-colors"
              aria-label="メニューを閉じる"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* メニュー項目 */}
          <nav className="flex-1 px-6">
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="font-motor tracking-widest block w-full text-left text-xl text-foreground hover:text-accent transition-colors py-3"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* フッター */}
          <div className="p-6 border-t border-accent/30">
            <p className="text-sm text-foreground text-center">
              バー・オープン
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
