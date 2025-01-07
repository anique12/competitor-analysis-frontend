import { createWrapper } from "next-redux-wrapper";
import { configureStore, Store } from "@reduxjs/toolkit";
import project from "./slices/project";

export const getStoreCreator = () => () =>
  configureStore({
    reducer: {
      project,
    },
  });

const storeCreator = getStoreCreator();
export const store = storeCreator();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<Store<RootState>>(storeCreator);
