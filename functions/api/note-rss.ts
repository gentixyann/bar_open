interface NoteItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string | null;
  description: string | null;
}

export async function onRequest(): Promise<Response> {
  try {
    const res = await fetch("https://note.com/baropen_sapporo/rss");
    if (!res.ok) {
      return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
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
        item.match(/<img[^>]+src="([^"]+)"/)?.[1] ??
        null;

      const rawDescription =
        item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ??
        item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ??
        null;
      const description = rawDescription
        ? rawDescription.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").replace(/続きをみる$/, "").replace(/続きを見る$/, "").trim()
        : null;

      items.push({
        title: title.trim(),
        link: link.trim(),
        pubDate: pubDate.trim(),
        thumbnail,
        description,
      });

      if (items.length >= 3) break;
    }

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1200",
      },
    });
  } catch {
    return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
