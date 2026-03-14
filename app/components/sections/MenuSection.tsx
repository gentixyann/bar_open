'use client';

import { useEffect, useRef, useState } from 'react';

const MENU_BLOCKS = [
  'note',
  'charge',
  'items',
  'nomihodai',
] as const;

export default function MenuSection() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers = MENU_BLOCKS.map((key, i) => {
      const el = refs.current[key];
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible((prev) => ({ ...prev, [key]: true })), i * 150);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const fadeClass = (key: string) =>
    `transition-all duration-[1600ms] ease-in-out ${visible[key] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`;

  return (
    <section id="menu" className="relative z-[5] py-24">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          Menu
        </h3>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 text-center">
            {/* 注釈 */}
            <div
              ref={(el) => { refs.current['note'] = el; }}
              className={`text-center pb-8 border-b border-accent/20 ${fadeClass('note')}`}
            >
              <div className="text-base text-foreground leading-relaxed">
                <p className="mb-3">
                  みんなが飲む王道は大体あります。
                </p>
                <p>ただし</p>
                <p>
                  食事、お酒、ノンアル、アルアル、おつまみ、人々、得意不得意、これら含めオープンではメニューも日々変化しています。その日だからこその出会いと発見をお楽しみください。
                </p>
              </div>
            </div>

            {/* チャージ */}
            <div
              ref={(el) => { refs.current['charge'] = el; }}
              className={`pb-8 border-b border-accent/20 ${fadeClass('charge')}`}
            >
              <h4 className="text-2xl font-bold text-foreground mb-4">チャージ</h4>
              <p className="text-3xl text-accent font-bold">500円</p>
            </div>

            {/* 単品メニュー */}
            <div
              ref={(el) => { refs.current['items'] = el; }}
              className={`pb-8 border-b border-accent/20 ${fadeClass('items')}`}
            >
              <h4 className="text-2xl font-bold text-foreground mb-6">単品メニュー</h4>
              <div className="space-y-2 text-left max-w-xs mx-auto">
                {[
                  { name: "ビール", price: "700円~" },
                  { name: "ハイボール", price: "720円~" },
                  { name: "カクテル", price: "720円~" },
                  { name: "ウイスキー", price: "720円~" },
                  { name: "焼酎各種", price: "750円~" },
                  { name: "ソフトドリンク・紅茶など", price: "各種あり" },
                ].map(({ name, price }) => (
                  <div key={name} className="flex justify-between text-foreground border-b border-accent/10 pb-2">
                    <span className="font-bold">{name}</span>
                    <span>{price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 飲み放題 */}
            <div
              ref={(el) => { refs.current['nomihodai'] = el; }}
              className={fadeClass('nomihodai')}
            >
              <h4 className="text-2xl font-bold text-foreground mb-4">飲み放題</h4>
              <p className="text-3xl text-accent font-bold">3,000円</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
