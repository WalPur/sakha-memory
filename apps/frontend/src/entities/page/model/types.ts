// import { SubscriptionPlanLiteral } from "@/shared/api";

export interface IPage {
    id: Int16Array,
    children: Page[];
    type: PageTypeLiteral;
    name: string;
    content: string;
    original_url: string;
    files: FileType[];
    breadcrumb: BreadCrumbType[];
}

export type PageTypeLiteral =
    | "PAGE"
    | "CATEGORY"
    | "GALLERY_CATEGORY"
    | "GALLERY"
    | "VIDEO_CATEGORY"
    | "VIDEO"
    | "BOOK_CATEGORY"
    | "BOOK";

export type Page = {
    id: number;
    type: PageTypeLiteral,
    name: string,
    content: string,
    original_url: string
};

export type FileType = {
    id: number;
    file: string;
    page: number;
};

export type BreadCrumbType = {
    id: number;
    title: string;
};
