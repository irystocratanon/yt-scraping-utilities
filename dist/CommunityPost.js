"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCommunityPosts = exports.extractPost = exports.AttachmentType = void 0;
const util_1 = require("./util");
const date_fns_1 = require("date-fns");
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["Image"] = "Image";
    AttachmentType["Poll"] = "Poll";
    AttachmentType["Video"] = "Video";
    AttachmentType["Playlist"] = "Playlist";
    AttachmentType["SharedPost"] = "SharedPost";
    AttachmentType["None"] = "None";
})(AttachmentType = exports.AttachmentType || (exports.AttachmentType = {}));
// NOTE: the order here is important, otherwise the sharedPostRenderer and its original post would appear in separate results.
const communityPostKeys = ["sharedPostRenderer", "backstagePostRenderer"];
/**
 * Extracts a simplified community post from a `backstagePostRenderer` or a `sharedPostRenderer`.
 */
function extractPost(rawPost) {
    // normal posts store text in `contentText`, quote posts store them in `content`.
    const { postId: id, contentText, backstageAttachment: attachment, originalPost, content: sharedPostContent } = rawPost;
    let approximatePostDate = new Date();
    let postDate = rawPost.publishedTimeText.runs[0].text.split(' ');
    let postDateN = Number.parseInt(postDate[0]);
    switch (postDate[1]) {
        case 'second':
        case 'seconds':
            approximatePostDate = (0, date_fns_1.subSeconds)(approximatePostDate, postDateN);
            break;
        case 'minute':
        case 'minutes':
            approximatePostDate = (0, date_fns_1.subMinutes)(approximatePostDate, postDateN);
            break;
        case 'hour':
        case 'hours':
            approximatePostDate = (0, date_fns_1.subHours)(approximatePostDate, postDateN);
            break;
        case 'day':
        case 'days':
            approximatePostDate = (0, date_fns_1.subDays)(approximatePostDate, postDateN);
            break;
        case 'week':
        case 'weeks':
            approximatePostDate = (0, date_fns_1.subWeeks)(approximatePostDate, postDateN);
            break;
        case 'month':
        case 'months':
            approximatePostDate = (0, date_fns_1.subMonths)(approximatePostDate, postDateN);
            break;
        case 'year':
        case 'years':
            approximatePostDate = (0, date_fns_1.subYears)(approximatePostDate, postDateN);
            break;
        default:
            break;
    }
    let attachmentType;
    switch (true) {
        case originalPost?.backstagePostRenderer !== undefined:
            attachmentType = AttachmentType.SharedPost;
            break;
        case !attachment:
            attachmentType = AttachmentType.None;
            break;
        case attachment.backstageImageRenderer != undefined || attachment.postMultiImageRenderer != undefined:
            attachmentType = AttachmentType.Image;
            break;
        case attachment.pollRenderer != undefined:
            attachmentType = AttachmentType.Poll;
            break;
        case attachment.videoRenderer != undefined:
            attachmentType = AttachmentType.Video;
            break;
        case attachment.playlistRenderer != undefined:
            attachmentType = AttachmentType.Playlist;
            break;
        default: attachmentType = "INVALID";
    }
    if (attachmentType === "INVALID") {
        throw new Error(`Could not resolve attachmentType in ${JSON.stringify(attachment)}! Please open an issue with this error!`);
    }
    const content = (() => {
        const runMapper = (run) => {
            const { text, navigationEndpoint } = run;
            if (navigationEndpoint) {
                const { commandMetadata } = navigationEndpoint;
                let url;
                const { url: parsedUrl } = commandMetadata.webCommandMetadata;
                const initialUrl = new URL(commandMetadata.webCommandMetadata.url, parsedUrl.startsWith("http") ? undefined : "https://youtube.com/");
                // q parameter is the redirect target for /redirect links
                if (initialUrl.searchParams.has("q")) {
                    url = initialUrl.searchParams.get("q");
                    // if &q is not present, it's a YouTube-internal link.
                }
                else {
                    url = initialUrl.toString();
                }
                if (!url)
                    throw new Error(`Could not find URL in ${JSON.stringify(navigationEndpoint)}! Please open an issue with this error message!`);
                return {
                    text,
                    url
                };
            }
            return { text };
        };
        // this is a mess.
        return (contentText?.runs?.map(runMapper) ?? (contentText?.simpleText ? { text: contentText.simpleText } : undefined) ??
            sharedPostContent?.runs?.map(runMapper) ?? (sharedPostContent?.simpleText ? { text: sharedPostContent.simpleText } : undefined));
    })();
    const post = { id, content, attachmentType, approximatePostDate };
    const images = (() => {
        if (attachmentType !== AttachmentType.Image)
            return;
        const images = [];
        const addToImages = (imageRenderer) => {
            images.push((0, util_1.getThumbnail)(imageRenderer.image.thumbnails));
        };
        if (attachment.backstageImageRenderer)
            addToImages(attachment.backstageImageRenderer);
        else {
            for (const { backstageImageRenderer } of attachment.postMultiImageRenderer.images) {
                addToImages(backstageImageRenderer);
            }
        }
        return images;
    })();
    const choices = (() => {
        if (attachmentType !== AttachmentType.Poll)
            return;
        const { choices: rawChoices } = attachment.pollRenderer;
        return rawChoices.map((rawChoice) => {
            const text = (0, util_1.mergeRuns)(rawChoice.text.runs);
            const choice = { text };
            if (rawChoice.image)
                choice.imageUrl = (0, util_1.getThumbnail)(rawChoice.image.thumbnails);
            return choice;
        });
    })();
    const video = (() => {
        if (attachmentType !== AttachmentType.Video)
            return;
        const { videoId: id, thumbnail: thumbnails, title: titleRaw, descriptionSnippet: descriptionSnippetRaw, badges } = attachment.videoRenderer;
        // ? Is this even required? https://i.ytimg.com/vi/[id]/maxresdefault.jpg is a thing.
        const thumbnail = (0, util_1.getThumbnail)(thumbnails.thumbnails);
        const title = titleRaw.simpleText ?? (0, util_1.mergeRuns)(titleRaw.runs);
        const descriptionSnippet = descriptionSnippetRaw ? (0, util_1.mergeRuns)(descriptionSnippetRaw.runs) : undefined;
        const membersOnly = (badges && badges.some(({ metadataBadgeRenderer }) => metadataBadgeRenderer?.style == "BADGE_STYLE_TYPE_MEMBERS_ONLY")) ?? false;
        return {
            id,
            title,
            descriptionSnippet,
            thumbnail,
            membersOnly
        };
    })();
    const playlist = (() => {
        // TODO: find a members only playlist shared in a post to find out if that's even a thing that'd be displayed.
        if (attachmentType !== AttachmentType.Playlist)
            return;
        const { title: titleRenderer, thumbnailRenderer, playlistId: id } = attachment.playlistRenderer;
        const title = titleRenderer.simpleText ?? (0, util_1.mergeRuns)(titleRenderer.text.runs);
        const thumbail = (0, util_1.getThumbnail)(thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails);
        return {
            id, title, thumbail
        };
    })();
    // avoid ugly {content: undefined}s
    if (post.attachmentType === AttachmentType.Image)
        post.images = images;
    else if (post.attachmentType === AttachmentType.Poll)
        post.choices = choices;
    else if (post.attachmentType === AttachmentType.Video)
        post.video = video;
    else if (post.attachmentType === AttachmentType.Playlist)
        post.playlist = playlist;
    else if (post.attachmentType === AttachmentType.SharedPost)
        post.sharedPost = extractPost(originalPost.backstagePostRenderer);
    // this is really inelegant.
    return post;
}
exports.extractPost = extractPost;
function extractCommunityPosts(source) {
    return (0, util_1.transformYtInitialData)(source, communityPostKeys, extractPost);
}
exports.extractCommunityPosts = extractCommunityPosts;
