// TODO: add support for new reelShelfRenderer.

import { findValuesByKeys, mergeRuns, parseRawData, transformYtInitialData } from "./util";
import { GridVideoRenderer, ytInitialData } from "./youtube-types";

export interface VideoRenderer {
    id: string;
    title: string;
    status: VideoRendererStatus
}

export function extractGridVideoRenderers(source: ytInitialData): VideoRenderer[]
export function extractGridVideoRenderers(source: string): VideoRenderer[]
export function extractGridVideoRenderers(source: string | ytInitialData): VideoRenderer[]
{
    return transformYtInitialData(source, ["gridVideoRenderer"], extractGridVideoRenderer);
}

export enum VideoRendererStatus {
    Offline = "offline",
    Upcoming = "upcoming",
    Live = "live"
}

// slight optimization
const statusLookupTable = {
    DEFAULT: VideoRendererStatus.Offline,
    SHORTS: VideoRendererStatus.Offline,

    UPCOMING: VideoRendererStatus.Upcoming,

    LIVE: VideoRendererStatus.Live
};

export function extractGridVideoRenderer(source: GridVideoRenderer): VideoRenderer {
    const {videoId, title, thumbnailOverlays} = source;

    const status: VideoRendererStatus = (() => {
        const rawStatus = thumbnailOverlays.find(overlay => overlay.thumbnailOverlayTimeStatusRenderer)?.thumbnailOverlayTimeStatusRenderer?.style;

        if (!rawStatus) {
            throw new TypeError(`Could not find matching status for gridVideoRenderer status ${rawStatus}`);
        }

        return statusLookupTable[rawStatus];
    })();


    return {
        id: videoId,
        title: mergeRuns(title.runs),
        status
    }
}