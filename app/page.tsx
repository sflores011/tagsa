import { wpV2 } from "@/lib/wp";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

export default async function Home() {
  // revalidate: 60 => ISR cada 60s
  const posts = await wpV2<WPPost[]>(`/posts?per_page=10`);

  return (
    <main style={{ padding: 24 }}>
      <h1>Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id} style={{ marginBottom: 16 }}>
            <a href={`/post/${p.slug}`}>
              <strong dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
            </a>
            <div dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
