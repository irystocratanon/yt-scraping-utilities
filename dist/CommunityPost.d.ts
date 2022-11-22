import type { ytInitialData } from "./youtube-types";
export declare enum AttachmentType {
    Image = "Image",
    Poll = "Poll",
    Video = "Video",
    Playlist = "Playlist",
    SharedPost = "SharedPost",
    None = "None"
}
export interface PollChoice {
    text: string;
    imageUrl?: string;
}
interface BaseCommunityPost {
    id: string;
    content?: {
        text: string;
        url?: string;
    }[];
    attachmentType: AttachmentType;
    approximatePostDate: Date;
}
export interface TextOnlyCommunityPost extends BaseCommunityPost {
    attachmentType: AttachmentType.None;
    content: {
        text: string;
        url?: string;
    }[];
}
export interface ImageCommunityPost extends BaseCommunityPost {
    attachmentType: AttachmentType.Image;
    images: string[];
}
export interface PollCommunityPost extends BaseCommunityPost {
    attachmentType: AttachmentType.Poll;
    choices: PollChoice[];
}
export interface VideoCommunityPost extends BaseCommunityPost {
    attachmentType: AttachmentType.Video;
    video: {
        id?: string;
        title: string;
        descriptionSnippet?: string;
        thumbnail: string;
        membersOnly: boolean;
    };
}
export interface PlaylistCommunityPost extends BaseCommunityPost {
    attachmentType: AttachmentType.Playlist;
    playlist: {
        /**
         * If ID is undefined, the playlist is no longer available.
         */
        id?: string;
        title: string;
        thumbail: string;
    };
}
export interface SharedPostCommunityPost extends BaseCommunityPost {
    attachmentType: AttachmentType.SharedPost;
    sharedPost: CommunityPost;
}
/**
 * Represents a community post. Type can be narrowed by checking the post's {@linkcode AttachmentType}.
 */
export declare type CommunityPost = SharedPostCommunityPost | ImageCommunityPost | PollCommunityPost | VideoCommunityPost | PlaylistCommunityPost | TextOnlyCommunityPost;
/**
 * Extracts a simplified community post from a `backstagePostRenderer` or a `sharedPostRenderer`.
 */
export declare function extractPost(rawPost: Record<string, any>): CommunityPost;
/**
 * Extracts community posts from a YouTube page or already parsed ytInitialData.
 * @param source either parsed `ytInitialData` via `parseRawData` or raw page string from a community tab or post.
 */
export declare function extractCommunityPosts(source: ytInitialData): CommunityPost[];
export declare function extractCommunityPosts(source: string): CommunityPost[];
export {};
//# sourceMappingURL=CommunityPost.d.ts.map