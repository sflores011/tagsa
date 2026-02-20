import { HeaderData, PageData, FooterData } from "@/types";

const site = process.env.WP_SITE_URL;

type FetchOptions = RequestInit & { next?: { revalidate?: number } };

function joinUrl(baseUrl: string, path: string) {
    const b = baseUrl.replace(/\/+$/, "");
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${b}${p}`;
}

async function fetchJson<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`WP fetch failed ${res.status} ${res.statusText}: ${text.slice(0, 250)}`);
    }

    return res.json() as Promise<T>;
}

// Base Helpers
export function wpV2<T>(path: string, options: FetchOptions = {}) {
    if (!site) throw new Error("Missing env WP_SITE_URL");
    const url = joinUrl(`${site}/wp-json/wp/v2`, path);
    return fetchJson<T>(url, options);
}

export function gutenbergApi<T>(path: string, options: FetchOptions = {}) {
    if (!site) throw new Error("Missing env WP_SITE_URL");
    const url = joinUrl(`${site}/wp-json/gutenberg-api/v1`, path);
    return fetchJson<T>(url, options);
}

// Concrete Data Fetching Methods
export async function getHeaderData(): Promise<HeaderData | null> {
    try {
        return await gutenbergApi<HeaderData>("/header", {
            next: { revalidate: 3600 }
        });
    } catch (error) {
        console.error("Error fetching header data:", error);
        return null;
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

export async function getFooterData(): Promise<FooterData | null> {
    try {
        return await gutenbergApi<FooterData>("/footer", {
            next: { revalidate: 3600 }
        });
    } catch (error) {
        console.error("Error fetching footer data:", error);
        return null;
    }
}

export async function getPageDataBySlug(slug: string): Promise<PageData | null> {
    try {
        return await gutenbergApi<PageData>(`/pages/${slug}`, {
            next: { revalidate: 3600 }
        });
    } catch (error) {
        console.error(`Error fetching page data for slug "${slug}":`, error);
        return null;
    }
}
