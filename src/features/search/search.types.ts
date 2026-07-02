export type SearchReleaseResult = {
    id: string;
    title: string;
    artist: string;
    mediaType: "VINYL" | "CD" | "DIGITAL";
    lotCount: number;
};