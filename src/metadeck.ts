export interface MetadeckGameDetails {
    title: string;
    id: number;
    description: string;
    developers: GameCompany[];
    publishers: GameCompany[];
    release_date: number;
    compat_category: number;
    compat_notes: string;
    store_categories: number[];
}

export interface GameCompany {
    name: string;
    url?: string;
}

export const STEAM_COMPAT = {
    UNKNOWN: 0,
    UNSUPPORTED: 1,
    PLAYABLE: 2,
    VERIFIED: 3
}

export const STEAM_STORE_CATEGORIES = {
    MultiPlayer: 1,
    SinglePlayer: 2,
    CoOp: 9,
    PartialController: 18,
    MMO: 20,
    Achievements: 22,
    SteamCloud: 23,
    SplitScreen: 24,
    CrossPlatformMultiPlayer: 27,
    FullController: 28,
    TradingCards: 29,
    Workshop: 30,
    VRSupport: 31,
    OnlineMultiPlayer: 36,
    LocalMultiPlayer: 37,
    OnlineCoOp: 38,
    LocalCoOp: 392,
    RemotePlayTogether: 44,
    HighQualitySoundtrackAudio: 50
}