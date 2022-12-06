import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDiscounts, IDiscountsData } from '../../types/Discounts';
import { fetchDiscounts } from '../thunks/discountsThunk';

interface IDiscountsState {
  discounts: IDiscounts;
  modal: boolean;
  count: number;
  error: string;
  isLoading: boolean;
}

const initialState: IDiscountsState = {
  discounts: { data: [], total: 1 },
  modal: false,
  count: 0,
  error: '',
  isLoading: false,
};

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setDiscountModal(state, action: PayloadAction<boolean>) {
      state.modal = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = state.count + action.payload;
    },
  },
  extraReducers: {
    [fetchDiscounts.fulfilled.type]: (state, action: PayloadAction<IDiscounts>) => {
      state.discounts = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchDiscounts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchDiscounts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default discountsSlice.reducer;
