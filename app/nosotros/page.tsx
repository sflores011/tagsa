import { notFound } from "next/navigation";
import Hero from "@/components/nosotros/Hero";
import Elegirnos from "@/components/nosotros/Elegirnos";
import { getPageDataBySlug } from "@/lib/data";
import { Block, PageData } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const getBlockContent = (blocks: Block[], blockType: string): Block | undefined => {
    return blocks.find((block) => block.type === blockType);
};

export default async function NosotrosPage() {
    const pageData: PageData | null = await getPageDataBySlug("nosotros");

    if (!pageData) {
        notFound();
    }

    const heroGroup = pageData.gutenberg_structure.find(
        (block) => block.type === "core/group" && block.attributes?.metadata?.name === "nosotros_hero"
    );

    let heroData = {
        backgroundImageUrl: "",
        title: "",
        description: ""
    };

    if (heroGroup?.blocks) {
        const imageBlock = getBlockContent(heroGroup.blocks, "core/image");
        const headingBlock = getBlockContent(heroGroup.blocks, "core/heading");
        const paragraphBlock = getBlockContent(heroGroup.blocks, "core/paragraph");

        heroData = {
            backgroundImageUrl: imageBlock?.url || "",
            title: headingBlock?.content || "",
            description: paragraphBlock?.content || ""
        };
    }

    const chooseGroup = pageData.gutenberg_structure.find(
        (block) => block.type === "core/group" && block.attributes?.metadata?.name === "Elegirnos"
    );

    const chooseData = {
        title: "",
        backgroundImage: "",
        features: [] as { iconUrl: string; title: string; description: string; name: string }[]
    };

    if (chooseGroup?.blocks) {
        const bgImageBlock = chooseGroup.blocks.find((block) => block.type === "core/image");
        chooseData.backgroundImage = bgImageBlock?.url || "";

        const headingBlock = getBlockContent(chooseGroup.blocks, "core/heading");
        chooseData.title = headingBlock?.content || "";

        const featureGroups = chooseGroup.blocks.filter((block) => block.type === "core/group");
        chooseData.features = featureGroups.map((group) => {
            const name = group.attributes?.metadata?.name || "";

            if (!group.blocks) {
                return { iconUrl: "", title: "", description: "", name };
            }

            return {
                iconUrl: getBlockContent(group.blocks, "core/image")?.url || "",
                title: getBlockContent(group.blocks, "core/heading")?.content || "",
                description: getBlockContent(group.blocks, "core/paragraph")?.content || "",
                name
            };
        });
    }

    return (
        <main>
            <Hero {...heroData} />
            <Elegirnos {...chooseData} />
        </main>
    );
}
