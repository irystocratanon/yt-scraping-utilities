import type { ytInitialData, ytInitialPlayerResponse, Thumbnail } from "./youtube-types";
/**
 * Tries to match ytInitialData variable on a YouTube page.
 */
export declare const initialDataRe: RegExp;
/**
 * Tries to match ytInitialPlayerResponse variable on a YouTube page.
 */
export declare const playerResponseRe: RegExp;
interface ParseRawOptions {
    source: string;
    ytInitialData?: boolean;
    ytInitialPlayerResponse?: boolean;
}
/**
 * Extract raw full objects (`ytInitialData` and `ytInitialPlayerResponse`) from a YT page string.
 * @param options.source - the YouTube page body as string.
 * @param options.ytInitialData - whether or not to parse and return ytInitialData.
 * @param options.ytInitialPlayerResponse - whether or not to parse and return ytInitialPlayerResponse (only present on /watch and youtu.be pages).
 */
export declare function parseRawData(options: ParseRawOptions): {
    ytInitialData?: ytInitialData | undefined;
    ytInititalPlayerRespone?: ytInitialPlayerResponse | undefined;
};
/**
 * Finds active tab in provided **full** `ytInitialData`.
 * @param ytInitialData
 */
export declare function findActiveTab(ytInitialData: ytInitialData): any;
export declare const findValuesByKeys: (object: Record<string, any>, keys: string[]) => any[];
/**
 * Returns the last item in an Array because YouTube *loves* deeply nested objects.
 */
export declare const getLastItem: (input: Array<any>) => any;
/**
 * Sanitizes non-standard (YouTube) URL parameters.
 */
export declare const sanitizeUrl: (url: string, offset?: number) => string;
/**
 * Merges runs Arrays into a single text string.
 */
export declare const mergeRuns: (runs: {
    text: string;
}[]) => string;
export declare const isValidDate: (date: Date) => boolean;
export declare const tryParseDate: (timestamp: string) => Date | undefined;
export declare const getThumbnail: (thumbnails: Thumbnail[]) => string;
export {};
//# sourceMappingURL=util.d.ts.map