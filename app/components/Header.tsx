"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 shadow-sm" : "bg-white/80"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/open_logo.png"
                alt="Bar オープン"
                width={50}
                height={50}
                priority
                className="h-auto"
              />
            </div>

            {/* デスクトップメニュー */}
            <DesktopMenu />

            {/* ハンバーガーボタン（モバイルのみ） */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-foreground p-2"
              aria-label="メニューを開く"
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
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* モバイルメニュー */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
