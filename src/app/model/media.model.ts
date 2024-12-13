import { MediaType } from "./media-type.enum";

export interface Media {
    id: string;
    type: MediaType;
    name: string;
    path?: string;
    thumbnail?: string;
    link?: string;
} 