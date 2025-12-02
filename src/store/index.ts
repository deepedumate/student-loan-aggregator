import { configureStore } from '@reduxjs/toolkit';
import loanProductReducer from "./slices/loanProductSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    loanProducts: loanProductReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
