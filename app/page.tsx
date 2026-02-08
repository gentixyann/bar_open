"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-gray-300">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/95 shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">BAR OPEN</h1>
            <ul className="flex gap-8">
              {["About", "Menu", "Access", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-white hover:bg-[#8224e3] px-4 py-2 rounded transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="relative z-10 text-center">
          <h2 className="text-6xl font-bold text-white mb-6">BAR OPEN</h2>
          <p className="text-2xl text-gray-300 mb-4">大人の隠れ家バー</p>
          <p className="text-lg text-gray-400">
            落ち着いた雰囲気の中で、こだわりのお酒とお料理を
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            About
          </h3>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed mb-6">
              BAR
              OPENは、都会の喧騒を忘れさせる大人の隠れ家です。熟練のバーテンダーが織りなす極上のカクテルと、厳選された料理でおもてなしいたします。
            </p>
            <p className="text-lg leading-relaxed">
              落ち着いた空間で、大切な人との特別なひとときをお過ごしください。
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-white text-center mb-12">
            Menu
          </h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Cocktails */}
            <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6">Cocktails</h4>
              <ul className="space-y-4">
                {[
                  { name: "マティーニ", price: "¥1,500" },
                  { name: "マンハッタン", price: "¥1,500" },
                  { name: "オールドファッションド", price: "¥1,400" },
                  { name: "モヒート", price: "¥1,300" },
                  { name: "ネグローニ", price: "¥1,400" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#8224e3] font-bold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Whisky & Spirits */}
            <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6">
                Whisky & Spirits
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "山崎 12年", price: "¥2,500" },
                  { name: "響 ジャパニーズハーモニー", price: "¥2,000" },
                  { name: "マッカラン 12年", price: "¥2,200" },
                  { name: "ジンビーム", price: "¥1,000" },
                  { name: "グレンフィディック 12年", price: "¥1,800" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#8224e3] font-bold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Food */}
            <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6">Food</h4>
              <ul className="space-y-4">
                {[
                  { name: "チーズ盛り合わせ", price: "¥1,800" },
                  { name: "生ハムとオリーブ", price: "¥1,500" },
                  { name: "ナッツミックス", price: "¥800" },
                  { name: "アヒージョ", price: "¥1,200" },
                  { name: "カルパッチョ", price: "¥1,600" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#8224e3] font-bold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soft Drinks */}
            <div className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6">
                Soft Drinks
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "コーヒー", price: "¥600" },
                  { name: "紅茶", price: "¥600" },
                  { name: "ジンジャーエール", price: "¥500" },
                  { name: "オレンジジュース", price: "¥500" },
                  { name: "ウーロン茶", price: "¥400" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#8224e3] font-bold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section */}
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
                  <p>〒100-0001 東京都千代田区千代田1-1-1</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    営業時間
                  </h4>
                  <p>18:00 - 翌2:00</p>
                  <p className="text-sm text-gray-400 mt-1">
                    ラストオーダー 翌1:30
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">定休日</h4>
                  <p>日曜日・祝日</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">電話</h4>
                  <p>03-1234-5678</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    アクセス
                  </h4>
                  <p>東京駅 徒歩5分</p>
                  <p className="text-sm text-gray-400 mt-1">
                    丸ノ内線 大手町駅より徒歩3分
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-lg mb-2">お電話でのご予約</p>
                  <a
                    href="tel:03-1234-5678"
                    className="text-2xl font-bold text-[#8224e3] hover:text-white transition-colors"
                  >
                    03-1234-5678
                  </a>
                </div>
                <div className="text-center pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    営業時間内にお電話ください
                  </p>
                  <p className="text-sm text-gray-400">18:00 - 翌2:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2026 BAR OPEN. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              〒100-0001 東京都千代田区千代田1-1-1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
