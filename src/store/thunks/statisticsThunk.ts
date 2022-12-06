import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { IStudentsStatistics } from '../../types/Statistics';
import { IFinanceStatistics, ILeadStatistics } from './../../types/Statistics';

interface MainParamsProps {
  date?: string;
  cancelToken?: CancelToken;
}

export const fetchStudnetStatistics = createAsyncThunk(
  'studentStatistics/fetchStudnetStatistics',
  async (mainParams: MainParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IStudentsStatistics[]>(`student_wait`, {
        params: mainParams,
        cancelToken: mainParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const fetchFinanceStatistics = createAsyncThunk(
  'financeStatistics/fetchFinanceStatistics',
  async (mainParams: MainParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IFinanceStatistics[]>(`expense_payment`, {
        params: mainParams,
        cancelToken: mainParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const fetchLeadStatistics = createAsyncThunk(
  'leadStatistics/fetchLeadStatistics',
  async (mainParams: MainParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<ILeadStatistics[]>(`lead`, {
        params: mainParams,
        cancelToken: mainParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);
