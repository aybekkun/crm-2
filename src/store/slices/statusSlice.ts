import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStatusState {
  status: string;
}

const initialState: IStatusState = {
  status: '',
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

export default statusSlice.reducer;
