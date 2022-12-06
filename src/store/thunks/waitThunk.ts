import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { IWait } from './../../types/Wait';

interface FetchWaitProps {
  page?: number | null;
  name?: string | null;
  phone?: string | null;
  status_id?: string | null;
  time_id?: string | null;
  lead_id?: string | null;
  course_id?: string | null;
  cancelToken?: CancelToken;
}

export const fetchWait = createAsyncThunk(
  'wait/fetchWait',
  async (waitParams: FetchWaitProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IWait>(`waits`, {
        params: waitParams,
        cancelToken: waitParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface IWaitProps {
  id?: number;
  name?: string;
  surname?: string;
  phone?: string;
  gender?: string;
  time_id?: number;
  lead_id?: number;
  course_id?: number;
  from?: string;
  comment?: string;
}

export const createWait = createAsyncThunk(
  'wait/createWait',
  async (
    { name, surname, phone, gender, time_id, lead_id, course_id, from }: IWaitProps,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.post(`waits`, {
        name,
        surname,
        phone,
        gender,
        time_id,
        lead_id,
        course_id,
        from,
      });

      return response.statusText;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateWait = createAsyncThunk(
  'wait/updateWait',
  async (
    { id, name, surname, phone, gender, time_id, lead_id, course_id, from, comment }: IWaitProps,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.put(`waits/${id}`, {
        name,
        surname,
        phone,
        gender,
        time_id,
        lead_id,
        course_id,
        from,
        comment,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteWait = createAsyncThunk('wait/deleteWait', async (id: number, thunkAPI) => {
  try {
    const response = await $authHost.delete(`waits/${id}`);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось создать студента');
  }
});
