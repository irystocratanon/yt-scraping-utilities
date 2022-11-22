"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractChannelInfo = void 0;
const util_1 = require("./util");
/**
 * Extracts information about the viewed channel from a YouTube page or already parsed ytInitialData. Mainly uses the `channelMetadataRenderer`, or the `microFormatRenderer` if present.
 * @param source either parsed `ytInitialData` via `parseRawData` or raw page string from a community tab or post.
 */
function extractChannelInfo(source) {
    const ytInitialData = typeof source === "string" ? (0, util_1.parseRawData)({ source, ytInitialData: true }).ytInitialData : source;
    if (!ytInitialData)
        throw new TypeError(`No YT initial data in provided source.`);
    // I'm pretty sure we can throw here; the microFormatDataRenderer should only appear in conjunction with the channelMetadataRenderer.
    const channelMetadataRenderer = ytInitialData.metadata?.channelMetadataRenderer;
    if (!channelMetadataRenderer)
        throw new Error("Could not find channel metadata.");
    const { title: name, description, externalId: id, vanityChannelUrl, avatar, isFamilySafe, keywords: keywordsString } = channelMetadataRenderer;
    const avatarUrl = (0, util_1.getThumbnail)(avatar.thumbnails);
    let tags;
    const microformatDataRenderer = ytInitialData.microformat?.microformatDataRenderer;
    if (microformatDataRenderer) {
        const { tags: channelTags, } = microformatDataRenderer;
        tags = channelTags;
    }
    else {
        tags = keywordsString.split(" "); // naive parsing; will incorrectly split tags that contain spaces.
    }
    const channelInfo = { name, description, id, isFamilySafe, avatarUrl, tags };
    const vanityId = vanityChannelUrl.split("/")[4];
    if (vanityId !== id)
        channelInfo.vanityId = vanityId;
    return channelInfo;
}
exports.extractChannelInfo = extractChannelInfo;
