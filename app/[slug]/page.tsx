export const dynamic = "force-dynamic";
export const revalidate = 0;

type SlugPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
    const { slug } = await params;

    return (
        <main className="flex justify-center items-center h-screen px-4">
            <p className="text-xl text-center">La p&aacute;gina &quot;{slug}&quot; est&aacute; en construcci&oacute;n.</p>
        </main>
    );
}
