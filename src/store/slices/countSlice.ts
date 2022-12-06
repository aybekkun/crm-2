import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICountState {
  count: number;
}

const initialState: ICountState = {
  count: 1,
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count = state.count + action.payload;
    },
  },
});

export default countSlice.reducer;
