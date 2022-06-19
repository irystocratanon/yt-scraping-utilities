"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCommunityPosts = exports.extractPost = exports.AttachmentType = void 0;
const util_1 = require("./util");
const date_fns_1 = require("date-fns");
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["Image"] = "IMAGE";
    AttachmentType["Poll"] = "POLL";
    AttachmentType["Video"] = "VIDEO";
    AttachmentType["Playlist"] = "PLAYLIST";
    AttachmentType["None"] = "NONE";
})(AttachmentType = exports.AttachmentType || (exports.AttachmentType = {}));
// NOTE: the order here is important, otherwise the sharedPostRenderer and its original post would appear in separate results.
const communityPostKeys = ["sharedPostRenderer", "backstagePostRenderer"];
/**
 * Extracts a simplified community post from a `backstagePostRenderer` or a `sharedPostRenderer`.
 */
function extractPost(rawPost) {
    const { postId: id, contentText: text, backstageAttachment: attachment, originalPost } = rawPost;
    let attachmentType;
    switch (true) {
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
        // TODO: proper YouTube typings for easier development because ytInitialData is a mess.
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
    const content = text?.runs && text.runs.map((run) => {
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
    });
    // YouTube Community posts do not reveal the actual post date so we need to approximate it from the friendly text they give us
    let approximatePostDate = new Date();
    const post = { id, attachmentType, approximatePostDate };
    let postDate = rawPost.publishedTimeText.runs[0].text.split(' ');
    let postDateN = Number.parseInt(postDate[0]);
    //console.log(postDate)
    //console.log(postDateN)
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
    // avoid ugly {content: undefined}s
    if (content)
        post.content = content;
    if (images)
        post.images = images;
    if (choices)
        post.choices = choices;
    if (video)
        post.video = video;
    if (playlist)
        post.playlist = playlist;
    if (approximatePostDate)
        post.approximatePostDate = approximatePostDate;
    if (originalPost)
        post.sharedPost = extractPost(originalPost.backstagePostRenderer);
    return post;
}
exports.extractPost = extractPost;
function extractCommunityPosts(source) {
    const ytInitialData = typeof source === "string" ? (0, util_1.parseRawData)({ source, ytInitialData: true }).ytInitialData : source;
    if (!ytInitialData)
        throw new TypeError(`No YT initial data in provided source.`);
    // Slight optimization to skip unused tabs and meta tags.
    const rawPosts = (0, util_1.findValuesByKeys)((0, util_1.findActiveTab)(ytInitialData), communityPostKeys);
    return rawPosts.map(post => extractPost(post));
}
exports.extractCommunityPosts = extractCommunityPosts;
