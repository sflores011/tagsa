import { wpFetch } from "@/lib/wp";

type WPPost = {
    id: number;
    slug?: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
};

export const dynamic = "force-dynamic"; // 👈 evita prerender en build si WP falla

export default async function Home() {
    const posts = await wpFetch<WPPost[]>(`/posts?per_page=10`);

    return (
        <main style={{ padding: 24 }}>
            <h1>Blog</h1>

            {(!posts || posts.length === 0) ? (
                <p>No hay posts publicados todavía.</p>
            ) : (
                <ul>
                    {posts.map((p) => {
                        const title = p?.title?.rendered ?? "(Sin título)";
                        const excerpt = p?.excerpt?.rendered ?? "";
                        const href = p?.slug ? `/post/${p.slug}` : "#";

                        return (
                            <li key={p.id} style={{ marginBottom: 16 }}>
                                <a href={href}>
                                    <strong dangerouslySetInnerHTML={{ __html: title }} />
                                </a>

                                {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </main>
    );
}
