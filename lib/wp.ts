const base = process.env.WP_API_BASE!;

type FetchOptions = RequestInit & { next?: { revalidate?: number } };

function authHeader() {
    const u = process.env.WP_USERNAME;
    const p = process.env.WP_APP_PASSWORD;
    if (!u || !p) return {};
    const token = Buffer.from(`${u}:${p}`).toString("base64");
    return { Authorization: `Basic ${token}` };
}

export async function wpFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const url = `${base}${path}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`WP fetch failed ${res.status} ${res.statusText}: ${text}`);
    }

    return res.json() as Promise<T>;
}
