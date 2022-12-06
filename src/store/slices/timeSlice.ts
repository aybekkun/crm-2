import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITimeData } from './../../types/Time';
import { fetchTime } from './../thunks/timeThunk';

interface ITimeState {
  time: ITimeData | null;
  isLoading: boolean;
  error: string;
}

const initialState: ITimeState = {
  time: null,
  isLoading: false,
  error: '',
};

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTime.fulfilled.type]: (state, action: PayloadAction<ITimeData>) => {
      state.time = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchTime.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTime.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default timeSlice.reducer;
