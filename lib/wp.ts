const base = process.env.WP_API_BASE;

type FetchOptions = RequestInit & { next?: { revalidate?: number } };

function authHeader(): Record<string, string> {
    const u = process.env.WP_USERNAME;
    const p = process.env.WP_APP_PASSWORD;
    if (!u || !p) return {};
    const token = Buffer.from(`${u}:${p}`).toString("base64");
    return { Authorization: `Basic ${token}` };
}

function joinUrl(baseUrl: string, path: string) {
    const b = baseUrl.replace(/\/+$/, ""); // quita slash final
    const p = path.startsWith("/") ? path : `/${path}`; // asegura slash inicial
    return `${b}${p}`;
}

export async function wpFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    if (!base) throw new Error("Missing env WP_API_BASE");

    const url = joinUrl(base, path);

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    const auth = authHeader();
    if (auth.Authorization) headers.set("Authorization", auth.Authorization);

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`WP fetch failed ${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
    }

    return res.json() as Promise<T>;
}
