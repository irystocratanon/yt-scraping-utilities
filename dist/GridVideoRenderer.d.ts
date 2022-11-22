import { GridVideoRenderer, ytInitialData } from "./youtube-types";
export interface VideoRenderer {
    id: string;
    title: string;
    status: VideoRendererStatus;
}
/**
 * Extracts basic information about listed videos.
 * Note: does **not** extract shorts. See {@linkcode extractReelItemRenderers} instead.
 */
export declare function extractGridVideoRenderers(source: ytInitialData): VideoRenderer[];
export declare function extractGridVideoRenderers(source: string): VideoRenderer[];
export declare enum VideoRendererStatus {
    Offline = "offline",
    Upcoming = "upcoming",
    Live = "live"
}
export declare function extractGridVideoRenderer(source: GridVideoRenderer): VideoRenderer;
//# sourceMappingURL=GridVideoRenderer.d.ts.map