import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { IExpenseData, IExpenses } from '../../types/Expenses';

interface FetchExpensesProps {
  page?: number;
  limit?: number;
  start_date?: string;
  end_date?: string;
  cancelToken?: CancelToken;
}

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (fetchParams: FetchExpensesProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IExpenses>(`expenses`, {
        params: fetchParams,
        cancelToken: fetchParams?.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e as Error);
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async ({ name, title, sum, type, date, user_id }: IExpenseData, thunkAPI) => {
    try {
      const response = await $authHost.post(`expenses`, {
        name,
        title,
        type,
        sum,
        date,
        user_id,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e as Error);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, name, title, sum, date, user_id }: IExpenseData, thunkAPI) => {
    try {
      const response = await $authHost.put(`expenses/${id}`, {
        id,
        name,
        title,
        sum,
        date,
        user_id,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: number, thunkAPI) => {
    try {
      const response = await $authHost.delete(`expenses/${id}`);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);
