import { configureStore } from "@reduxjs/toolkit";
import shopsSlice from "./slices/shopsSlice";

const store = configureStore({ reducer: shopsSlice });
export default store;
export type AppDispatch = typeof store.dispatch;