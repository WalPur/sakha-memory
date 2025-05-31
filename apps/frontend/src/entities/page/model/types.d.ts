export interface IPage {
    type: PageTypeLiteral;
    name: string;
    content: string;
    original_url: string;
    files: FileType[];
    breadcrumb: BreadCrumbType[];
}
export type PageTypeLiteral = "PAGE" | "CATEGORY" | "GALLERY_CATEGORY" | "GALLERY" | "VIDEO_CATEGORY" | "VIDEO" | "BOOK_CATEGORY" | "BOOK";
export type FileType = {
    id: number;
    file: string;
    page: number;
};
export type BreadCrumbType = {
    id: number;
    title: string;
};
