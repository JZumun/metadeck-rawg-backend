import { MetadeckGameDetails, STEAM_COMPAT, STEAM_STORE_CATEGORIES } from "../metadeck.ts";
import * as rawg from "./api.ts";
import { getOrMap } from "../cache.ts";

export function search(query: string) {
    return getOrMap(["rawg", "search", query], () =>
        rawg.search(query).then(r =>
            Promise.all(r.results.map(g => get(g.id)))
        )
    );
}

export function get(id: number) {
    return getOrMap(["rawg", "get", id], () => rawg.get(id).then(toMetadeck));
}


function toMetadeck(game: rawg.FullRawgGameDetails): MetadeckGameDetails {
    return {
        title: game.name,
        id: game.id,
        description: game.description,
        developers: game.developers.map(d => ({ name: d.name })),
        publishers: game.publishers.map(p => ({ name: p.name })),
        release_date: new Date(game.released).valueOf(),
        compat_category: STEAM_COMPAT.UNKNOWN,
        compat_notes: '',
        store_categories: [...new Set(game.tags.map(t => RAWG_TAGS_MAPPING[t.name]).filter(Boolean))]
    }
}

const RAWG_TAGS_MAPPING: Record<string, number> = {
    "Singleplayer": STEAM_STORE_CATEGORIES.SinglePlayer,
    "Multiplayer": STEAM_STORE_CATEGORIES.MultiPlayer,
    "Full controller support": STEAM_STORE_CATEGORIES.FullController,
    "Co-op": STEAM_STORE_CATEGORIES.CoOp,
    "cooperative": STEAM_STORE_CATEGORIES.CoOp,
    "Partial Controller Support": STEAM_STORE_CATEGORIES.PartialController,
    "Online Co-Op": STEAM_STORE_CATEGORIES.OnlineCoOp,
    "Online multiplayer": STEAM_STORE_CATEGORIES.OnlineMultiPlayer,
    "Split Screen": STEAM_STORE_CATEGORIES.SplitScreen,
    "Local Co-Op": STEAM_STORE_CATEGORIES.LocalCoOp,
    "Controller": STEAM_STORE_CATEGORIES.FullController,
    "Local Multiplayer": STEAM_STORE_CATEGORIES.LocalMultiPlayer,
    "Cross-Platform Multiplayer": STEAM_STORE_CATEGORIES.CrossPlatformMultiPlayer,
    "controller support": STEAM_STORE_CATEGORIES.FullController,
    "Online PvP": STEAM_STORE_CATEGORIES.OnlineMultiPlayer,
    "mmo": STEAM_STORE_CATEGORIES.MMO,
    "MMORPG": STEAM_STORE_CATEGORIES.MMO,
    "4 Player Local": STEAM_STORE_CATEGORIES.LocalMultiPlayer,
}