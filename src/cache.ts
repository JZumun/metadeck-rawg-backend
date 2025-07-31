const EXPIRE_MS = Number.parseInt(Deno.env.get("CACHE_DURATION")) ?? 0;

export const cache = await Deno.openKv();

export async function getOrMap<T>(key: Deno.KvKey, getter: () => Promise<T>, requestId: string): Promise<T> {
    const cached = await cache.get<T>(key);
    if (cached.value) {
        console.log(`[${requestId}] Retrieving from cache`, key);
        return cached.value;
    }

    console.log(`[${requestId}] Retrieving from source`, key);
    const value = await getter();
    await cache.set(key, value, { expireIn: EXPIRE_MS });
    return value;
}