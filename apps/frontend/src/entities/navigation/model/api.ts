import { api } from "@/shared/api";
import type { INavigation } from "./types";

export const navigation = api.injectEndpoints({
    endpoints: (build) => ({
        getNavigation: build.query<INavigation[], void>({
            query: () => ({
                url: "pages/navigation/",
            }),
        }),
    }),
});

export const { useGetNavigationQuery } = navigation;
