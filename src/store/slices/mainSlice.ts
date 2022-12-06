import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMainData } from './../../types/Main';
import { fetchMain } from './../thunks/mainThunk';

interface IMainState {
  data: IMainData;
  isLoading: boolean;
  error: string;
}

const initialState: IMainState = {
  data: {
    waits: 0,
    students: 0,
    teachers: 0,
    courses: 0,
    groups: 0,
    lead: [{ count: 0, lead: '' }],
  },
  isLoading: false,
  error: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMain.fulfilled.type]: (state, action: PayloadAction<IMainData>) => {
      state.data = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchMain.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchMain.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default mainSlice.reducer;
