import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  modal: boolean;
}

const initialState: IModalState = {
  modal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal(state, action: PayloadAction<boolean>) {
      state.modal = action.payload;
    },
  },
});

export default modalSlice.reducer;
