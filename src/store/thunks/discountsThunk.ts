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

/* export const fetchFamily = createAsyncThunk(
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
 */
export interface createDiscountProps {
  student_id?: number[] | number | undefined;
  sum?: number;
  start_date?: string | moment.Moment;
  end_date?: string | moment.Moment | null;
  group_id?: number[] | number | null;
  comment?: string;
}

export const createDiscount = createAsyncThunk(
  'discount/createDiscount',
  async (createDiscountsValues: createDiscountProps, thunkAPI) => {
    try {
      const response = await $authHost.post(`discounts`, {
        ...createDiscountsValues,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export interface stopDiscountProps {
  id: number;
}

export const stopDiscount = createAsyncThunk(
  'discount/stopDiscount',
  async ({ id }: stopDiscountProps, thunkAPI) => {
    try {
      const response = await $authHost.delete(`discounts/${id}`);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);
