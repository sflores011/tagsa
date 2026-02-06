// lib/wp.ts
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

// WP core REST (posts/pages estándar)
export function wpV2<T>(path: string, options: FetchOptions = {}) {
    if (!site) throw new Error("Missing env WP_SITE_URL");
    const url = joinUrl(`${site}/wp-json/wp/v2`, path);
    return fetchJson<T>(url, options);
}

// Endpoint custom (gutenberg-api)
export function gutenbergApi<T>(path: string, options: FetchOptions = {}) {
    if (!site) throw new Error("Missing env WP_SITE_URL");
    const url = joinUrl(`${site}/wp-json/gutenberg-api/v1`, path);
    return fetchJson<T>(url, options);
}
