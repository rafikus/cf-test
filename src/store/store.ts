import { configureStore } from "@reduxjs/toolkit";
import { binanceAPI } from "../api/binance";

export const store = configureStore({
  reducer: {
    [binanceAPI.reducerPath]: binanceAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(binanceAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
