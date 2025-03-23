import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SafeUser } from "../../types/user.types";

/**
 * Interface for the Account reducer.
 *
 * - `currentUser`: the SafeUser that is currently logged in. Null if no user logged in.
 */
interface AccountState {
  currentUser: SafeUser | null;
}

/**
 * Initial state for the Account reducer has no current user, indicating no users have logged in.
 */
const initialState: AccountState = {
  currentUser: null,
};

/**
 * Account Slice that manages the current user state.
 */
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    /**
     * Sets the current user from the action payload.
     */
    setCurrentUser: (state, action: PayloadAction<SafeUser | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
