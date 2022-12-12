import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '../../helpers/http';

export const fetchDiscounts = createAsyncThunk(
  'discount/fetchDiscount',
  async (student_id: number, thunkAPI) => {
    try {
      const response = await $authHost.get(`discounts_student/${student_id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const fetchFamily = createAsyncThunk(
  'discount/fetchDiscount',
  async (surname: string, thunkAPI) => {
    try {
      const response = await $authHost.post(`family_d_search`, {
        surname,
      });
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export interface createDiscountProps {
  name: string | 'multigroup' | 'simple' | 'family';
  student_id?: number[] | number | undefined;
  price?: number;
  start_date?: string | moment.Moment;
  end_date?: string | moment.Moment | null;
  group_id?: number[] | number | null;
  comment?: string;
  relative?: number[];
}

export const createDiscount = createAsyncThunk(
  'discount/createDiscount',
  async (createDiscountsValues: createDiscountProps, thunkAPI) => {
    console.log('wrong ' + createDiscountsValues);
    try {
      const response = await $authHost.post(`discounts`, {
        ...createDiscountsValues,
      });
      console.log(createDiscountsValues);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export interface stopDiscountProps {
  id: number;
  end_date: string | moment.Moment;
}

export const stopDiscount = createAsyncThunk(
  'discount/stopDiscount',
  async ({ id, end_date }: stopDiscountProps, thunkAPI) => {
    try {
      const response = await $authHost.put(`discounts_stop/${id}`, { end_date });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);
