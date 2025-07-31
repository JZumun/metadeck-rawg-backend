
import TurndownService from "turndown";

export function mdConverter(): TurndownService {
    const md = new TurndownService();
    md.addRule("full breaks", {
        filter: "br",
        replacement: (content, node, options) => "\n\n"
    })
    return md;
}

export type { TurndownService };