import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin } from '../../types/Login';
import { fetchLogin } from '../thunks/loginThunk';
import { checkLogin } from './../thunks/loginThunk';

interface ILoginState {
  user: ILogin | null;
  token: string | null | undefined;
  isUserLogin: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ILoginState = {
  user: null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  isUserLogin: false,
  isLoading: false,
  error: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.isUserLogin = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [fetchLogin.fulfilled.type]: (state, action: PayloadAction<ILogin>) => {
      state.user = action.payload;
      state.isUserLogin = true;
      state.error = '';
      state.isLoading = false;
    },
    [fetchLogin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [checkLogin.fulfilled.type]: (state, action: PayloadAction<ILogin>) => {
      state.user = action.payload;
      state.isUserLogin = true;
      state.error = '';
      state.isLoading = false;
    },
  },
});

export default loginSlice.reducer;
