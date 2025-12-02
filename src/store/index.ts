import { configureStore } from '@reduxjs/toolkit';
import loanReducer from './slices/loanSlice';
import chatReducer from './slices/chatSlice';
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    loan: loanReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
