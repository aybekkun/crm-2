import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPayments } from '../../types/Payments';
import { IPaymentsForm } from './../../types/Payments';
import { fetchPayments } from './../thunks/paymentsThunk';

export interface IPaymentsState {
  payments: IPayments;
  page: number;
  form: IPaymentsForm;
  isLoading: boolean;
  error: string;
}

const initialState: IPaymentsState = {
  payments: {
    total: 0,
    total_sum: 0,
    data: [],
  },
  form: {
    student_id: 0,
    student_name: '',
    group_id: 0,
    group_name: '',
    sum: 0,
    date: '',
    type: '',
    comment: '',
  },
  page: 1,
  isLoading: false,
  error: '',
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPagePayments(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormPayments(state, action: PayloadAction<IPaymentsForm>) {
      state.form = action.payload;
    },
    setResetFormPayments(state) {
      state.form = {
        student_id: 0,
        student_name: '',
        group_id: 0,
        group_name: '',
        sum: 0,
        date: '',
        type: '',
        comment: '',
      };
    },
  },
  extraReducers: {
    [fetchPayments.fulfilled.type]: (state, action: PayloadAction<IPayments>) => {
      state.payments = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchPayments.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPayments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default paymentsSlice.reducer;
