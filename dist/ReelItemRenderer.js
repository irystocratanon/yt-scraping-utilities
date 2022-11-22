"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractReelVideoRenderer = exports.extractReelItemRenderers = void 0;
const GridVideoRenderer_1 = require("./GridVideoRenderer");
const util_1 = require("./util");
function extractReelItemRenderers(source) {
    return (0, util_1.transformYtInitialData)(source, ["reelItemRenderer"], extractReelVideoRenderer);
}
exports.extractReelItemRenderers = extractReelItemRenderers;
function extractReelVideoRenderer(source) {
    const { videoId, headline } = source;
    return {
        id: videoId,
        title: (0, util_1.getTextOrMergedRuns)(headline),
        status: GridVideoRenderer_1.VideoRendererStatus.Offline, // as far as I'm aware, you can only upload shorts, not schedule them. So this should be fine.
    };
}
exports.extractReelVideoRenderer = extractReelVideoRenderer;
