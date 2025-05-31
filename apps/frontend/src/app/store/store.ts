import { api } from "@/shared/api/typecode/base";
import { configureStore } from "@reduxjs/toolkit";

export const setupStore = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([api.middleware]),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
