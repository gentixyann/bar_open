import Image from "next/image";

interface NoteItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

async function fetchNoteArticles(): Promise<NoteItem[]> {
  try {
    const res = await fetch("https://note.com/baropen_sapporo/rss", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items: NoteItem[] = [];
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const match of itemMatches) {
      const item = match[1];

      const title =
        item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ??
        item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ??
        "";

      const link =
        item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ??
        item.match(/<guid>([\s\S]*?)<\/guid>/)?.[1] ??
        "";

      const pubDate =
        item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";

      // サムネイル: media:thumbnail のテキスト内容 → enclosure の url 属性 → description 内 img の順に探す
      const thumbnail =
        item.match(/<media:thumbnail>([\s\S]*?)<\/media:thumbnail>/)?.[1]?.trim() ??
        item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1] ??
        item.match(/<img[^>]+src="([^"]+)"/)?.[1];

      items.push({
        title: title.trim(),
        link: link.trim(),
        pubDate: pubDate.trim(),
        thumbnail,
      });

      if (items.length >= 3) break;
    }

    return items;
  } catch {
    return [];
  }
}

function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return pubDate;
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
}

export default async function NoteSection() {
  const articles = await fetchNoteArticles();

  return (
    <section id="news" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          News
        </h3>
        <div className="max-w-4xl mx-auto">
          {articles.length === 0 ? (
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
              className="inline-block font-motor tracking-widest text-accent hover:text-foreground transition-colors"
            >
              note をもっと見る →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
