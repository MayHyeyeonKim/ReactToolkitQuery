import { configureStore } from "@reduxjs/toolkit";
import { counterApi } from "../services/counterApi";
import counterReducer from "../features/counterSlice";

export const store = configureStore({
  reducer: {
    [counterApi.reducerPath]: counterApi.reducer, // RTK Query 리듀서
    counter: counterReducer, // slice 리듀서 추가
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterApi.middleware),
});
