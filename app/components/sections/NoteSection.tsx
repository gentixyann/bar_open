"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { type NoteItem, formatDate } from "../../utils/rssParser";
import FadeIn from "../animations/FadeIn";

export default function NoteSection() {
  const [articles, setArticles] = useState<NoteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/note-rss")
      .then((r) => r.json())
      .then((data) => {
        setArticles(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <section id="news" className="relative z-[5] py-24">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          News
        </h3>
        <FadeIn>
        <div className="max-w-4xl mx-auto">
          {!loaded ? (
            <p className="text-center text-foreground/40">読み込み中...</p>
          ) : articles.length === 0 ? (
            <p className="text-center text-foreground">記事を取得できませんでした。</p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-5 items-start border-b border-accent/20 pb-6 hover:opacity-70 transition-opacity"
                >
                  {article.thumbnail && (
                    <div className="relative flex-shrink-0 w-24 h-24 rounded overflow-hidden">
                      <Image
                        src={article.thumbnail}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-foreground/60">{formatDate(article.pubDate)}</p>
                    <p className="text-foreground font-bold leading-snug">{article.title}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <a
              href="https://note.com/baropen_sapporo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-foreground transition-colors"
            >
              <span>noteをもっと見る</span>
            </a>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
