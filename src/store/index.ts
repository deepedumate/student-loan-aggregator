import { configureStore } from '@reduxjs/toolkit';
import loanProductReducer from "./slices/loanProductSlice";
import chatReducer from './slices/chatSlice';
import contactAuthReducer from "./slices/contactAuthSlice";
import lendersReducer from "./slices/lenderSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    loanProducts: loanProductReducer,
    chat: chatReducer,
    contactAuth: contactAuthReducer,
    lenders: lendersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
