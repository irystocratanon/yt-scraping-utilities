"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformYtInitialData = exports.getTextOrMergedRuns = exports.getThumbnail = exports.tryParseDate = exports.isValidDate = exports.mergeRuns = exports.sanitizeUrl = exports.getLastItem = exports.findValuesByKeys = exports.findActiveTab = exports.parseRawData = exports.playerResponseRe = exports.initialDataRe = void 0;
/**
 * Tries to match ytInitialData variable on a YouTube page.
 */
exports.initialDataRe = /(?<=var ytInitialData *\= *)\{.*?}(?=\;)(?<![A-z<>])/;
/**
 * Tries to match ytInitialPlayerResponse variable on a YouTube page.
 */
exports.playerResponseRe = /(?<=var ytInitialPlayerResponse *\= *)\{.*?}(?=\;)(?<![A-z<>])/;
/**
 * Extract raw full objects (`ytInitialData` and `ytInitialPlayerResponse`) from a YT page string.
 */
function parseRawData(options) {
    const { source, ytInitialData: extractInitialData, ytInitialPlayerResponse: extractPlayerResponse } = options;
    if (!source)
        throw new TypeError("No source string to search provided.");
    if (!extractInitialData && !extractPlayerResponse)
        throw new TypeError("At least one of ytInitialData and ytInitialPlayerResponse need to be parsed.");
    const ret = {};
    if (extractInitialData) {
        const match = exports.initialDataRe.exec(source);
        match && (ret.ytInitialData = JSON.parse(match[0]));
    }
    if (extractPlayerResponse) {
        const match = exports.playerResponseRe.exec(source);
        match && (ret.ytInitialPlayerResponse = JSON.parse(match[0]));
    }
    return ret;
}
exports.parseRawData = parseRawData;
/**
 * Finds active tab in provided **full** `ytInitialData`.
 * @param ytInitialData
 */
function findActiveTab(ytInitialData) {
    try {
        return ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs.find((tab) => tab.tabRenderer.selected);
    }
    catch (error) {
        throw new Error(`Error accessing initial data: ${error}`);
    }
}
exports.findActiveTab = findActiveTab;
const findValuesByKeys = (object, keys) => {
    const values = [];
    const seenObjects = new WeakSet();
    const find = (object, keys) => {
        Object.keys(object).some((k) => {
            if (keys.includes(k))
                values.push(object[k]);
            // Make this an else since its only use is extracting renderers.
            // The renderers we're interested in are never nested inside each other.
            // For community tabs, reduces # searches by >= 50%. 
            else if (object[k] &&
                !seenObjects.has(object[k]) &&
                typeof object[k] === 'object') {
                find(object[k], keys);
                seenObjects.add(object[k]);
            }
        });
        return values;
    };
    return find(object, keys);
};
exports.findValuesByKeys = findValuesByKeys;
/**
 * Returns the last item in an Array because YouTube *loves* deeply nested objects.
 */
const getLastItem = (input) => input[input.length - 1];
exports.getLastItem = getLastItem;
/**
 * Sanitizes non-standard (YouTube) URL parameters.
 */
const sanitizeUrl = (url, offset = 0) => {
    return url.split("=").slice(0, offset + 1).join("");
};
exports.sanitizeUrl = sanitizeUrl;
/**
 * Merges {@linkcode Run} Arrays into a single text string.
 */
const mergeRuns = (runs) => runs.map(r => r.text).join("");
exports.mergeRuns = mergeRuns;
const isValidDate = (date) => !isNaN(date.getTime());
exports.isValidDate = isValidDate;
const tryParseDate = (timestamp) => {
    const date = new Date(timestamp);
    if (!(0, exports.isValidDate)(date))
        return undefined;
    return date;
};
exports.tryParseDate = tryParseDate;
const getThumbnail = (thumbnails) => (0, exports.sanitizeUrl)((0, exports.getLastItem)(thumbnails).url);
exports.getThumbnail = getThumbnail;
const getTextOrMergedRuns = (source) => source.simpleText ?? (0, exports.mergeRuns)(source.runs);
exports.getTextOrMergedRuns = getTextOrMergedRuns;
/**
 * Utility function used to search ytInitialData for renderers, and transform those into more easily usable types.
 */
function transformYtInitialData(source, searchKeys, transformer) {
    if (typeof source !== "object")
        source = parseRawData({ ytInitialData: true, source }).ytInitialData;
    const items = (0, exports.findValuesByKeys)(source, searchKeys);
    return items.map(transformer);
}
exports.transformYtInitialData = transformYtInitialData;
