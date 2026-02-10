import { gutenbergApi } from "@/lib/wp";
import { HeaderData, PageData } from "@/types";

export async function getHeaderData(): Promise<HeaderData | null> {
    try {
        return await gutenbergApi<HeaderData>("/header", {
            next: { revalidate: 3600 }
        });
    } catch (error) {
        console.error("Error fetching header data:", error);
        return null; // Return null so the component can handle empty state or fallback
    }
}

export async function getHomePageData(): Promise<PageData | null> {
    try {
        return await gutenbergApi<PageData>("/pages/inicio", {
            next: { revalidate: 3600 }
        });
    } catch (error) {
        console.error("Error fetching home page data:", error);
        return null;
    }
}
