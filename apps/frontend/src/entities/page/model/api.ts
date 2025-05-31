import { api } from "@/shared/api";
import type { IPage } from "./types";

export const page = api.injectEndpoints({
    endpoints: (build) => ({
        getPageId: build.query<IPage, string>({
            query: (id) => ({
                url: `pages/${id}/`,
            }),
        }),
    }),
});

export const { useGetPageIdQuery } = page;
