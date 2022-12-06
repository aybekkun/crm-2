import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFinanceStatistics, ILeadStatistics, IStudentsStatistics } from '../../types/Statistics';
import {
  fetchFinanceStatistics,
  fetchLeadStatistics,
  fetchStudnetStatistics,
} from '../thunks/statisticsThunk';

interface IStatisticState {
  students: IStudentsStatistics[];
  finance: IFinanceStatistics[];
  lead: ILeadStatistics[];
  isLoading: boolean;
  error: string;
}

const initialState: IStatisticState = {
  students: [{ date: '', student: 0, wait: 0 }],
  finance: [{ date: '', expenses: 0, payments: 0 }],
  lead: [{ lead: '', count: 0 }],
  isLoading: false,
  error: '',
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStudnetStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<IStudentsStatistics[]>
    ) => {
      state.students = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchStudnetStatistics.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchStudnetStatistics.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchFinanceStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<IFinanceStatistics[]>
    ) => {
      state.finance = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchLeadStatistics.fulfilled.type]: (state, action: PayloadAction<ILeadStatistics[]>) => {
      state.lead = action.payload;
      state.error = '';
      state.isLoading = false;
    },
  },
});

export default statisticsSlice.reducer;
