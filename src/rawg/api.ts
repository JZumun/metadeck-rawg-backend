const API_KEY = Deno.env.get('API_KEY')!
const BASE_URL = Deno.env.get('API_URL')!

export interface RawgSearchResult {
    results: SimpleRawgGameDetails[];
}

export interface SimpleRawgGameDetails {
    id: number;
    slug: string;
    name: string;
    release: string; // 2025-07-29
}

export interface FullRawgGameDetails {
    id: number;
    slug: string;
    name: string;
    released: string;
    description: string;
    developers: RawgEntity[]
    publishers: RawgEntity[]
    tags: RawgEntity[]
}

export interface RawgEntity {
    id: number;
    name: string;
    slug: string;
}




export async function search(query: string): Promise<RawgSearchResult> {
    const response = await fetch(`${BASE_URL}/games?` + new URLSearchParams({
        key: API_KEY,
        search: query,
        search_exact: "true"
    }))
    return await response.json()
}

export async function get(id: number): Promise<FullRawgGameDetails> {
    const response = await fetch(`${BASE_URL}/games/${id}?` + new URLSearchParams({
        key: API_KEY
    }))
    return await response.json()
}