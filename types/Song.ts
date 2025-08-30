export type Song = {
    id: string; // UUID
    videoId: string;
    title: string;
    description?: string;
    channelTitle: string;
    publishedAt: string;
    mediumThumbnailUrl?: string | "";
    highThumbnailUrl?: string | "";
}