import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/account.reducer";

/**
 * Redux store for managing application-wide state.
 */
const store = configureStore({
  reducer: {
    accountReducer,
  },
});

export default store;
