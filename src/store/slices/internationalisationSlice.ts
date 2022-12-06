import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInternationalisationState {
  language: boolean;
}

const initialState: IInternationalisationState = {
  language: true,
};

export const internationalisationSlice = createSlice({
  name: 'internationalisation',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<boolean>) {
      state.language = action.payload;
    },
  },
});

export default internationalisationSlice.reducer;
