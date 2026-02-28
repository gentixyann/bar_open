import Image from "next/image";
import { fetchNoteArticles, formatDate } from "../../utils/rssParser";

export default async function NoteSection() {
  const articles = await fetchNoteArticles();

  return (
    <section id="news" className="relative z-[5] py-24">
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
