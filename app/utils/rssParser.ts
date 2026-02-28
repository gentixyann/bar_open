export interface NoteItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

/**
 * note.com の RSS フィードから最新記事を取得・解析する。
 * ISR: 1時間ごとに再検証
 */
export async function fetchNoteArticles(limit = 3): Promise<NoteItem[]> {
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

      if (items.length >= limit) break;
    }

    return items;
  } catch {
    return [];
  }
}

/**
 * RSS の pubDate 文字列を日本語表示に変換する。
 * パース失敗時は元の文字列をそのまま返す。
 */
export function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return pubDate;
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
