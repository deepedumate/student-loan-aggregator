import { configureStore } from '@reduxjs/toolkit';
import loanProductReducer from "./slices/loanProductSlice";
import chatReducer from './slices/chatSlice';
<<<<<<< Updated upstream
=======
import contactAuthReducer from './slices/contactAuthSlice';
import lendersReducer from "./slices/lenderSlice";
>>>>>>> Stashed changes
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    loanProducts: loanProductReducer,
    chat: chatReducer,
<<<<<<< Updated upstream
=======
    contactAuth: contactAuthReducer,
    lenders: lendersReducer,
>>>>>>> Stashed changes
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
