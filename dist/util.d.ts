import type { ytInitialData, ytInitialPlayerResponse, Thumbnail, Run } from "./youtube-types";
/**
 * Tries to match ytInitialData variable on a YouTube page.
 */
export declare const initialDataRe: RegExp;
/**
 * Tries to match ytInitialPlayerResponse variable on a YouTube page.
 */
export declare const playerResponseRe: RegExp;
interface ParseRawOptions<D extends boolean, P extends boolean> {
    /**
     * the YouTube page body as string.
     */
    source: string;
    /**
     * whether or not to parse and return ytInitialData.
     */
    ytInitialData?: D;
    /**
     * whether or not to parse and return ytInitialPlayerResponse (only present on /watch and youtu.be pages).
     */
    ytInitialPlayerResponse?: P;
}
interface ParseRawReturn<D extends boolean, P extends boolean> {
    ytInitialData?: D extends true ? ytInitialData : never;
    ytInitialPlayerResponse?: P extends true ? ytInitialPlayerResponse : never;
}
/**
 * Extract raw full objects (`ytInitialData` and `ytInitialPlayerResponse`) from a YT page string.
 */
export declare function parseRawData<D extends boolean = false, P extends boolean = false>(options: ParseRawOptions<D, P>): ParseRawReturn<D, P>;
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
 * Merges {@linkcode Run} Arrays into a single text string.
 */
export declare const mergeRuns: (runs: Run[]) => string;
export declare const isValidDate: (date: Date) => boolean;
export declare const tryParseDate: (timestamp: string) => Date | undefined;
export declare const getThumbnail: (thumbnails: Thumbnail[]) => string;
export declare const getTextOrMergedRuns: (source: RequireOnlyOne<{
    runs: Run[];
    simpleText: string;
}, "runs" | "simpleText">) => string;
/**
 * Utility function used to search ytInitialData for renderers, and transform those into more easily usable types.
 */
export declare function transformYtInitialData<T, U>(source: ytInitialData | string, searchKeys: string[], transformer: (sourceItem: U) => T): T[];
/**
 * utility types taken from KPD's answer at https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
 */
export declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
export declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
export {};
//# sourceMappingURL=util.d.ts.map