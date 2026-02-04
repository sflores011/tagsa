import { wpFetch } from "@/lib/wp";
import { notFound } from "next/navigation";

type WPPost = {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
};

export default async function PostPage({ params }: { params: { slug: string } }) {
    const data = await wpFetch<WPPost[]>(`/posts?slug=${params.slug}`, { next: { revalidate: 60 } });
    const post = data?.[0];
    if (!post) return notFound();

    return (
        <main style={{ padding: 24 }}>
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </main>
    );
}
