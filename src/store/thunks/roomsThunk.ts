import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '../../helpers/http';
import { IRooms } from '../../types/Rooms';
import { CancelToken } from 'axios';

interface roomsParamsProps {
  page?: number;
  limit?: number;
  cancelToken?: CancelToken;
}

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (roomsParams: roomsParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IRooms>(`rooms`, {
        params: roomsParams,
        cancelToken: roomsParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const createRoom = createAsyncThunk('rooms/createRoom', async (name: string, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`rooms`, { name });
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (id: number, thunkAPI) => {
  try {
    const { data } = await $authHost.put(`rooms/${id}`);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: number, thunkAPI) => {
  try {
    const { data } = await $authHost.delete(`rooms/${id}`);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});
