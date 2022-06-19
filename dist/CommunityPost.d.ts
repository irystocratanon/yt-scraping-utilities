import type { ytInitialData } from "./youtube-types";
export declare enum AttachmentType {
    Image = "IMAGE",
    Poll = "POLL",
    Video = "VIDEO",
    Playlist = "PLAYLIST",
    None = "NONE"
}
export interface PollChoice {
    text: string;
    imageUrl?: string;
}
export interface CommunityPost {
    id: string;
    /**
     * To display just the text content of a post, use `content.map(({text}) => text).join("");`.
     */
    content?: {
        text: string;
        url?: string;
    }[];
    attachmentType: AttachmentType;
    approximatePostDate: Date;
    images?: string[];
    choices?: PollChoice[];
    video?: {
        id?: string;
        title: string;
        descriptionSnippet?: string;
        thumbnail: string;
        membersOnly: boolean;
    };
    playlist?: {
        /**
         * If ID is undefined, the playlist is no longer available.
         */
        id?: string;
        title: string;
        thumbail: string;
    };
    sharedPost?: CommunityPost;
}
/**
 * Extracts a simplified community post from a `backstagePostRenderer` or a `sharedPostRenderer`.
 */
export declare function extractPost(rawPost: Record<string, any>): CommunityPost;
/**
 * Extracts community posts from a YouTube page or already parsed ytInitialData.
 * @param source - either parsed `ytInitialData` via `parseRawData` or raw page string from a community tab or post.
 */
export declare function extractCommunityPosts(source: ytInitialData): CommunityPost[];
export declare function extractCommunityPosts(source: string): CommunityPost[];
//# sourceMappingURL=CommunityPost.d.ts.map