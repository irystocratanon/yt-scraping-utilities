"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPlayerInfo = exports.Playability = void 0;
const util_1 = require("./util");
var Playability;
(function (Playability) {
    Playability["OK"] = "OK";
    Playability["Unplayable"] = "UNPLAYABLE";
})(Playability = exports.Playability || (exports.Playability = {}));
function extractPlayerInfo(source) {
    const playerResponse = typeof source === "string" ? (0, util_1.parseRawData)({ source, ytInitialPlayerResponse: true }).ytInititalPlayerRespone : source;
    if (!playerResponse)
        throw new TypeError(`No player response in provided source! Make sure the source is from /watch or a youtu.be link!`);
    const { playabilityStatus, streamingData, videoDetails, microformat } = playerResponse;
    const { videoId, lengthSeconds: length, keywords, channelId, thumbnail: thumbnailRaw, viewCount: viewers, author: channelName, isLiveContent, allowRatings: ratable } = videoDetails;
    const thumbnail = (0, util_1.sanitizeUrl)((0, util_1.getLastItem)(thumbnailRaw.thumbnails).url);
    const { status, playableInEmbed: embeddable, miniplayer, errorScreen } = playabilityStatus;
    const { title: rawTitle, description, isFamilySafe: familySafe, isUnlisted: unlisted, liveBroadcastDetails } = microformat.playerMicroformatRenderer;
    const playerInfo = {
        videoId,
        channelId,
        channelName,
        description: description?.simpleText || '',
        thumbnail,
        viewers,
        ratable,
        title: rawTitle.simpleText,
        length,
        keywords,
        playability: status,
        unlisted,
        familySafe,
        membersOnly: false,
        embeddable,
        isStream: isLiveContent,
        live: false,
        hasEnded: false
    };
    if (streamingData) {
        const { formats } = streamingData;
        if (formats) {
            playerInfo.formats = formats.map((format) => ({
                url: format.url,
                mimeType: format.mimeType,
                label: format.qualityLabel,
                bitrate: format.bitrate,
                video: {
                    width: format.width,
                    height: format.height,
                    fps: format.fps,
                },
                audio: {
                    sampleRate: Number(format.sampleRate),
                    channels: format.channels
                }
            }));
        }
    }
    if (errorScreen?.playerLegacyDesktopYpcOfferRenderer) {
        const { playerLegacyDesktopYpcOfferRenderer: offer } = errorScreen;
        switch (offer.offerId) {
            case "sponsors_only_video":
                playerInfo.membersOnly = true;
                break;
        }
    }
    if (liveBroadcastDetails) {
        const { isLiveNow, startTimestamp, endTimestamp } = liveBroadcastDetails;
        playerInfo.live = isLiveNow;
        playerInfo.startTime = (0, util_1.tryParseDate)(startTimestamp);
        playerInfo.endTime = (0, util_1.tryParseDate)(endTimestamp);
        if (playerInfo.endTime)
            playerInfo.hasEnded = true;
        if (streamingData) {
            var { dashManifestUrl: dash, hlsManifestUrl: hls } = streamingData;
            const manifests = {};
            dash && (manifests.dash = dash);
            hls && (manifests.hls = hls);
            playerInfo.manifests = manifests;
        }
    }
    return playerInfo;
}
exports.extractPlayerInfo = extractPlayerInfo;
