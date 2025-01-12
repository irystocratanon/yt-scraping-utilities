import { RequireOnlyOne } from "./util";
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
export interface GridVideoRenderer {
    videoId: string;
    thumbnail: GridVideoRendererThumbnail;
    title: Title;
    publishedTimeText: Text;
    viewCountText: Text;
    navigationEndpoint: NavigationEndpoint;
    ownerBadges: OwnerBadge[];
    trackingParams: string;
    shortViewCountText: ShortViewCountTextClass;
    menu: Menu;
    thumbnailOverlays: ThumbnailOverlay[];
}
export interface Menu {
    menuRenderer: MenuRenderer;
}
export interface MenuRenderer {
    items: Item[];
    trackingParams: string;
    accessibility: Accessibility;
}
export interface Accessibility {
    accessibilityData: AccessibilityData;
}
export interface AccessibilityData {
    label: string;
}
export interface Item {
    menuServiceItemRenderer: MenuServiceItemRenderer;
}
export interface MenuServiceItemRenderer {
    text: MenuServiceItemRendererText;
    icon: Icon;
    serviceEndpoint: ServiceEndpoint;
    trackingParams: string;
}
export interface Icon {
    iconType: string;
}
export interface ServiceEndpoint {
    clickTrackingParams: string;
    commandMetadata: ServiceEndpointCommandMetadata;
    signalServiceEndpoint: SignalServiceEndpoint;
}
export interface ServiceEndpointCommandMetadata {
    webCommandMetadata: PurpleWebCommandMetadata;
}
export interface PurpleWebCommandMetadata {
    sendPost: boolean;
}
export interface SignalServiceEndpoint {
    signal: string;
    actions: SignalServiceEndpointAction[];
}
export interface SignalServiceEndpointAction {
    clickTrackingParams: string;
    addToPlaylistCommand: AddToPlaylistCommand;
}
export interface AddToPlaylistCommand {
    openMiniplayer: boolean;
    videoId: string;
    listType: string;
    onCreateListCommand: OnCreateListCommand;
    videoIds: string[];
}
export interface OnCreateListCommand {
    clickTrackingParams: string;
    commandMetadata: OnCreateListCommandCommandMetadata;
    createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}
export interface OnCreateListCommandCommandMetadata {
    webCommandMetadata: FluffyWebCommandMetadata;
}
export interface FluffyWebCommandMetadata {
    sendPost: boolean;
    apiUrl?: string;
}
export interface CreatePlaylistServiceEndpoint {
    videoIds: string[];
    params: string;
}
export interface MenuServiceItemRendererText {
    runs: Run[];
}
export interface Run {
    text: string;
}
export interface NavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: NavigationEndpointCommandMetadata;
    watchEndpoint: WatchEndpoint;
}
export interface NavigationEndpointCommandMetadata {
    webCommandMetadata: TentacledWebCommandMetadata;
}
export interface TentacledWebCommandMetadata {
    url: string;
    webPageType: string;
    rootVe: number;
}
export interface WatchEndpoint {
    videoId: string;
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}
export interface WatchEndpointSupportedOnesieConfig {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}
export interface Html5PlaybackOnesieConfig {
    commonConfig: CommonConfig;
}
export interface CommonConfig {
    url: string;
}
export interface OwnerBadge {
    metadataBadgeRenderer: MetadataBadgeRenderer;
}
export interface MetadataBadgeRenderer {
    icon: Icon;
    style: string;
    tooltip: string;
    trackingParams: string;
    accessibilityData: AccessibilityData;
}
export interface Text {
    simpleText: string;
}
export interface ShortViewCountTextClass {
    accessibility: Accessibility;
    simpleText: string;
}
export interface GridVideoRendererThumbnail {
    thumbnails: ThumbnailElement[];
}
export interface ThumbnailElement {
    url: string;
    width: number;
    height: number;
}
export interface ThumbnailOverlay {
    thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
    thumbnailOverlayToggleButtonRenderer?: ThumbnailOverlayToggleButtonRenderer;
    thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}
export interface ThumbnailOverlayNowPlayingRenderer {
    text: MenuServiceItemRendererText;
}
export interface ThumbnailOverlayTimeStatusRenderer {
    text: ShortViewCountTextClass;
    style: "DEFAULT" | "UPCOMING" | "LIVE" | "SHORTS";
}
export interface ThumbnailOverlayToggleButtonRenderer {
    isToggled?: boolean;
    untoggledIcon: Icon;
    toggledIcon: Icon;
    untoggledTooltip: string;
    toggledTooltip: string;
    untoggledServiceEndpoint: UntoggledServiceEndpoint;
    toggledServiceEndpoint?: ToggledServiceEndpoint;
    untoggledAccessibility: Accessibility;
    toggledAccessibility: Accessibility;
    trackingParams: string;
}
export interface ToggledServiceEndpoint {
    clickTrackingParams: string;
    commandMetadata: OnCreateListCommandCommandMetadata;
    playlistEditEndpoint: ToggledServiceEndpointPlaylistEditEndpoint;
}
export interface ToggledServiceEndpointPlaylistEditEndpoint {
    playlistId: string;
    actions: PurpleAction[];
}
export interface PurpleAction {
    action: string;
    removedVideoId: string;
}
export interface UntoggledServiceEndpoint {
    clickTrackingParams: string;
    commandMetadata: OnCreateListCommandCommandMetadata;
    playlistEditEndpoint?: UntoggledServiceEndpointPlaylistEditEndpoint;
    signalServiceEndpoint?: SignalServiceEndpoint;
}
export interface UntoggledServiceEndpointPlaylistEditEndpoint {
    playlistId: string;
    actions: FluffyAction[];
}
export interface FluffyAction {
    addedVideoId: string;
    action: string;
}
export interface Title {
    runs: Run[];
    accessibility: Accessibility;
}
export interface ReelItemRenderer {
    videoId: string;
    headline: RequireOnlyOne<Headline, "runs" | "simpleText">;
    thumbnail: ReelWatchEndpointThumbnail;
    viewCountText: ViewCountText;
    navigationEndpoint: ReelItemRendererNavigationEndpoint;
    menu: Menu;
    trackingParams: string;
    accessibility: Accessibility;
    style: string;
    videoType: string;
    loggingDirectives: LoggingDirectives;
}
export interface Accessibility {
    accessibilityData: AccessibilityData;
}
export interface AccessibilityData {
    label: string;
}
export interface Headline {
    simpleText?: string;
    runs?: Run[];
}
export interface LoggingDirectives {
    trackingParams: string;
    visibility: Visibility;
    enableDisplayloggerExperiment: boolean;
}
export interface Visibility {
    types: string;
}
export interface Menu {
    menuRenderer: MenuRenderer;
}
export interface MenuRenderer {
    items: Item[];
    trackingParams: string;
    accessibility: Accessibility;
}
export interface Item {
    menuNavigationItemRenderer: MenuNavigationItemRenderer;
}
export interface MenuNavigationItemRenderer {
    text: Text;
    icon: Icon;
    navigationEndpoint: MenuNavigationItemRendererNavigationEndpoint;
    trackingParams: string;
    accessibility: Accessibility;
}
export interface Icon {
    iconType: string;
}
export interface MenuNavigationItemRendererNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: PurpleCommandMetadata;
    userFeedbackEndpoint: UserFeedbackEndpoint;
}
export interface PurpleCommandMetadata {
    webCommandMetadata: PurpleWebCommandMetadata;
}
export interface PurpleWebCommandMetadata {
    ignoreNavigation: boolean;
}
export interface UserFeedbackEndpoint {
    additionalDatas: AdditionalData[];
}
export interface AdditionalData {
    userFeedbackEndpointProductSpecificValueData: UserFeedbackEndpointProductSpecificValueData;
}
export interface UserFeedbackEndpointProductSpecificValueData {
    key: string;
    value: string;
}
export interface Text {
    runs: TextRun[];
}
export interface TextRun {
    text: string;
}
export interface ReelItemRendererNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: ChannelNavigationEndpointCommandMetadata;
    reelWatchEndpoint: ReelWatchEndpoint;
}
export interface ChannelNavigationEndpointCommandMetadata {
    webCommandMetadata: FluffyWebCommandMetadata;
}
export interface FluffyWebCommandMetadata {
    url: string;
    webPageType: string;
    rootVe: number;
    apiUrl?: string;
}
export interface ReelWatchEndpoint {
    videoId: string;
    playerParams: string;
    thumbnail: ReelWatchEndpointThumbnail;
    overlay: Overlay;
    params: string;
    sequenceProvider: string;
    sequenceParams: string;
}
export interface Overlay {
    reelPlayerOverlayRenderer: ReelPlayerOverlayRenderer;
}
export interface ReelPlayerOverlayRenderer {
    reelPlayerHeaderSupportedRenderers: ReelPlayerHeaderSupportedRenderers;
    nextItemButton: ItemButton;
    prevItemButton: ItemButton;
    style: string;
    trackingParams: string;
}
export interface ItemButton {
    buttonRenderer: ButtonRenderer;
}
export interface ButtonRenderer {
    trackingParams: string;
}
export interface ReelPlayerHeaderSupportedRenderers {
    reelPlayerHeaderRenderer: ReelPlayerHeaderRenderer;
}
export interface ReelPlayerHeaderRenderer {
    reelTitleText: ReelTitleText;
    timestampText: RequireOnlyOne<Headline, "runs" | "simpleText">;
    channelNavigationEndpoint: ReelNavigationEndpoint;
    channelTitleText: ChannelTitleText;
    channelThumbnail: ChannelThumbnail;
    trackingParams: string;
    accessibility: Accessibility;
}
export interface ReelNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: ChannelNavigationEndpointCommandMetadata;
    browseEndpoint: BrowseEndpoint;
}
export interface BrowseEndpoint {
    browseId: string;
    canonicalBaseUrl: string;
}
export interface ChannelThumbnail {
    thumbnails: ThumbnailElement[];
}
export interface ThumbnailElement {
    url: string;
    width: number;
    height: number;
}
export interface ChannelTitleText {
    runs: ChannelTitleTextRun[];
}
export interface ChannelTitleTextRun {
    text: string;
    navigationEndpoint: NavigationEndpoint;
}
export interface ReelTitleText {
    runs: ReelTitleTextRun[];
}
export interface ReelTitleTextRun {
    text: string;
    loggingDirectives?: LoggingDirectives;
}
export interface ReelWatchEndpointThumbnail {
    thumbnails: ThumbnailElement[];
    isOriginalAspectRatio: boolean;
}
export interface ViewCountText {
    accessibility: Accessibility;
    simpleText: string;
}
//# sourceMappingURL=youtube-types.d.ts.map