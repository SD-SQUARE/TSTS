import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: { id: string, email: string } | null; 
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: AuthState['user'] }>) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    },

    loginFailure(state, action: PayloadAction<string>) {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload; 
        state.user = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
     
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;