export declare const setupStore: import("@reduxjs/toolkit").EnhancedStore<{
    splitApi: import("@reduxjs/toolkit/query").CombinedState<{}, never, "splitApi">;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        splitApi: import("@reduxjs/toolkit/query").CombinedState<{}, never, "splitApi">;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
