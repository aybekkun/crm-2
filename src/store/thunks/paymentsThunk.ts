import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '../../helpers/http';
import { IPayments } from './../../types/Payments';
import { CancelToken } from 'axios';

export interface FetchPaymentsProps {
  page?: number;
  limit?: number;
  start_date?: string;
  end_date?: string;
  cancelToken?: CancelToken;
}

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (fetchParams: FetchPaymentsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IPayments>(`payments`, {
        params: fetchParams,
        cancelToken: fetchParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e as Error);
    }
  }
);

interface IPaymentProps {
  id?: number;
  student_id?: number;
  group_id: number;
  sum: number;
  date: string;
  type: string;
  comment: string;
}

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async ({ student_id, group_id, sum, date, type, comment }: IPaymentProps, thunkAPI) => {
    try {
      const response = await $authHost.post(`payments`, {
        student_id,
        group_id,
        sum,
        date,
        type,
        comment,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, student_id, group_id, sum, date, type, comment }: IPaymentProps, thunkAPI) => {
    try {
      const response = await $authHost.put(`payments/${id}`, {
        student_id,
        group_id,
        sum,
        date,
        type,
        comment,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (id: number, thunkAPI) => {
    try {
      const response = await $authHost.delete(`payments/${id}`);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);
