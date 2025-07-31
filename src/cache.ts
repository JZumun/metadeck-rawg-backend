const EXPIRE_MS = Number.parseInt(Deno.env.get("CACHE_DURATION")) ?? 0;

export const cache = await Deno.openKv();

export async function getOrMap<T>(key: Deno.KvKey, getter: () => Promise<T>): Promise<T> {
    const cached = await cache.get<T>(key);
    if (cached.value) {
        return cached.value;
    }

    const value = await getter();
    await cache.set(key, value, { expireIn: EXPIRE_MS });
    return value;
}