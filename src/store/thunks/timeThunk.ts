import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { ITime } from './../../types/Time';

interface TimeParamsProps {
  page?: number;
  limit?: number;
  cancelToken?: CancelToken;
}

export const fetchTime = createAsyncThunk(
  'time/fetchTime',
  async (timeParams: TimeParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<ITime>(`times`, {
        params: timeParams,
        cancelToken: timeParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const createTime = createAsyncThunk('time/createTime', async (name: string, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`times`, { name });
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});

export const updateTime = createAsyncThunk('time/updateTime', async (id: number, thunkAPI) => {
  try {
    const { data } = await $authHost.put(`times/${id}`);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});

export const deleteTime = createAsyncThunk('time/deleteTime', async (id: number, thunkAPI) => {
  try {
    const { data } = await $authHost.delete(`times/${id}`);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});
