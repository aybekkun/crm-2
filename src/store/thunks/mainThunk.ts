import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { IMainData } from './../../types/Main';

interface MainParamsProps {
  cancelToken?: CancelToken;
}

export const fetchMain = createAsyncThunk(
  'main/fetchMain',
  async (mainParams: MainParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IMainData>(`home`, {
        params: mainParams,
        cancelToken: mainParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);
