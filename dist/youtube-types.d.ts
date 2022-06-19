export declare type ytInitialData = Record<string, any>;
export declare type ytInitialPlayerResponse = Record<string, any>;
export interface YTInitialDataChannelTab {
    tabRenderer: {
        endpoint: {
            clickTrackingParams: string;
            commandMetadata: {
                webCommandMetadata: {
                    url: string;
                    webPageType: string;
                    rootVe: number;
                    apiUrl: string;
                };
            };
            browseEndpoint: {
                browseId: string;
                params: string;
                canonicalBaseUrl: string;
            };
        };
        title: string;
        selected: boolean;
        trackingParams: string;
    };
}
export interface ChannelMetadataRenderer {
    title: string;
    description: string;
    rssUrl: string;
    externalId: string;
    keywords: string;
    ownerUrls: string[];
    avatar: Avatar;
    channelUrl: string;
    isFamilySafe: boolean;
    availableCountryCodes: string[];
    androidDeepLink: string;
    androidAppindexingLink: string;
    iosAppindexingLink: string;
    vanityChannelUrl: string;
}
export interface Avatar {
    thumbnails: Thumbnail[];
}
export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}
export interface MicroformatDataRenderer {
    urlCanonical: string;
    title: string;
    description: string;
    thumbnail: MicroformatRendererThumbnail;
    siteName: string;
    appName: string;
    androidPackage: string;
    iosAppStoreId: string;
    iosAppArguments: string;
    ogType: string;
    urlApplinksWeb: string;
    urlApplinksIos: string;
    urlApplinksAndroid: string;
    urlTwitterIos: string;
    urlTwitterAndroid: string;
    twitterCardType: string;
    twitterSiteHandle: string;
    schemaDotOrgType: string;
    noindex: boolean;
    unlisted: boolean;
    familySafe: boolean;
    tags: string[];
    availableCountries: string[];
    linkAlternates: LinkAlternate[];
}
export interface LinkAlternate {
    hrefUrl: string;
}
export interface MicroformatRendererThumbnail {
    thumbnails: Thumbnail[];
}
//# sourceMappingURL=youtube-types.d.ts.map