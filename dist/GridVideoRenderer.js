"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGridVideoRenderer = exports.VideoRendererStatus = exports.extractGridVideoRenderers = void 0;
const util_1 = require("./util");
function extractGridVideoRenderers(source) {
    return (0, util_1.transformYtInitialData)(source, ["gridVideoRenderer"], extractGridVideoRenderer);
}
exports.extractGridVideoRenderers = extractGridVideoRenderers;
var VideoRendererStatus;
(function (VideoRendererStatus) {
    VideoRendererStatus["Offline"] = "offline";
    VideoRendererStatus["Upcoming"] = "upcoming";
    VideoRendererStatus["Live"] = "live";
})(VideoRendererStatus = exports.VideoRendererStatus || (exports.VideoRendererStatus = {}));
// slight optimization
const statusLookupTable = {
    DEFAULT: VideoRendererStatus.Offline,
    SHORTS: VideoRendererStatus.Offline,
    UPCOMING: VideoRendererStatus.Upcoming,
    LIVE: VideoRendererStatus.Live
};
function extractGridVideoRenderer(source) {
    const { videoId, title, thumbnailOverlays } = source;
    const status = (() => {
        const rawStatus = thumbnailOverlays.find(overlay => overlay.thumbnailOverlayTimeStatusRenderer)?.thumbnailOverlayTimeStatusRenderer?.style;
        if (!rawStatus) {
            throw new TypeError(`Could not find matching status for gridVideoRenderer status ${rawStatus}`);
        }
        return statusLookupTable[rawStatus];
    })();
    return {
        id: videoId,
        title: (0, util_1.mergeRuns)(title.runs),
        status
    };
}
exports.extractGridVideoRenderer = extractGridVideoRenderer;
