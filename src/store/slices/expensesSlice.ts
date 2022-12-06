import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpenses, IExpensesForm } from '../../types/Expenses';
import { fetchExpenses } from '../thunks/expensesThunk';

export interface IExpensesState {
  expenses: IExpenses;
  form: IExpensesForm;
  page: number;
  isLoading: boolean;
  error: string;
}

const initialState: IExpensesState = {
  expenses: {
    total: 0,
    total_sum: 0,
    data: [],
  },
  form: {
    name: '',
    title: '',
    sum: 0,
    date: null,
    user_id: 0,
  },
  page: 1,
  isLoading: false,
  error: '',
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setPageExpenses(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormExpenses(state, action: PayloadAction<IExpensesForm>) {
      state.form = action.payload;
    },
    setResetFormExpenses(state) {
      state.form = {
        name: '',
        title: '',
        sum: 0,
        date: null,
        user_id: 0,
      };
    },
  },
  extraReducers: {
    [fetchExpenses.fulfilled.type]: (state, action: PayloadAction<IExpenses>) => {
      state.expenses = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchExpenses.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchExpenses.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default expensesSlice.reducer;
