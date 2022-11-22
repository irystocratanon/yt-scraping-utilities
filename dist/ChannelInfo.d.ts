import type { ytInitialData } from "./youtube-types";
export interface ChannelInfo {
    id: string;
    name: string;
    description: string;
    vanityId?: string;
    isFamilySafe: boolean;
    avatarUrl: string;
    tags: string[];
}
/**
 * Extracts information about the viewed channel from a YouTube page or already parsed ytInitialData. Mainly uses the `channelMetadataRenderer`, or the `microFormatRenderer` if present.
 * @param source either parsed `ytInitialData` via `parseRawData` or raw page string from a community tab or post.
 */
export declare function extractChannelInfo(source: ytInitialData | string): ChannelInfo;
//# sourceMappingURL=ChannelInfo.d.ts.map