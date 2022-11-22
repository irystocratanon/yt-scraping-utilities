import { VideoRenderer } from "./GridVideoRenderer";
import { ReelItemRenderer, ytInitialData } from "./youtube-types";
/**
 * Extracts basic information from reels (aka shorts).
 */
export declare function extractReelItemRenderers(source: ytInitialData): VideoRenderer[];
export declare function extractReelItemRenderers(source: string): VideoRenderer[];
export declare function extractReelVideoRenderer(source: ReelItemRenderer): VideoRenderer;
//# sourceMappingURL=ReelItemRenderer.d.ts.map