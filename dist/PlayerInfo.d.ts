import { ytInitialPlayerResponse } from "./youtube-types";
export declare enum Playability {
    Ok = "Ok",
    Unplayable = "Unplayable"
}
export interface VideoFormat {
    url: string;
    mimeType: string;
    label: string;
    bitrate: number;
    video: {
        width: number;
        height: number;
        fps: number;
    };
    audio: {
        sampleRate: number;
        channels: number;
    };
}
export interface PlayerInfo {
    videoId: string;
    channelId: string;
    channelName: string;
    description: string;
    thumbnail: string;
    /**
     * For live streams, represents concurrent viewers.
     * For past streams and uploads, represents total views.
     */
    viewers: number;
    ratable: boolean;
    title: string;
    length: number;
    keywords: string[];
    playability: Playability;
    unlisted: boolean;
    familySafe: boolean;
    /**
     * Whether the video is playable outside of YouTube.
     */
    embeddable: boolean;
    /**
     * Whether this video is or was a stream or premiere.
     */
    isStream: boolean;
    /**
     * Whether the stream is live right now.
     */
    live: boolean;
    /**
     * Whether this is a past stream.
     */
    hasEnded: boolean;
    startTime?: Date;
    endTime?: Date;
    /**
     * Only present if playability is OK
     */
    manifests?: {
        dash?: string;
        hls?: string;
    };
    formats?: VideoFormat[];
    membersOnly: boolean;
}
/**
 * Extracts info from the player renderer from a `/watch` page or a `youtu.be`.
 * @param source either parsed `ytPlayerInitialResponse` (via `parseRawData`) or page source string from a player page.
 */
export declare function extractPlayerInfo(source: ytInitialPlayerResponse): PlayerInfo;
export declare function extractPlayerInfo(source: string): PlayerInfo;
//# sourceMappingURL=PlayerInfo.d.ts.map