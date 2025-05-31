import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../config";

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        headers.set("Origin", "http://localhost:3000/");
        headers.set("Referer", "http://localhost:3000");
        // headers.set("Mode", `no-cors`);
        return headers;
    },
});

export const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQuery,
    tagTypes: [],
    endpoints: () => ({}),
});
