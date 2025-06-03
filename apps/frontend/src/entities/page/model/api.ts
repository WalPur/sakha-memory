import { api } from "@/shared/api";
import type { IPage, PagePagination } from "./types";

export const page = api.injectEndpoints({
    endpoints: (build) => ({
        getPageId: build.query<IPage, string>({
            query: (id) => ({
                url: `pages/${id}/`,
            }),
        }),
        searchPages: build.query<PagePagination, { search: string; page: number; page_size?: number }>({
              query: ({ search, page}) => ({
                url: `pages/`,
                params: { search, page},
            }),
        }),
    }),
});

export const { useGetPageIdQuery, useSearchPagesQuery  } = page;
