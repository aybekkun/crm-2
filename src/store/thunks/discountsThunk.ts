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

export interface createDiscountProps {
  name: string | 'multigroup' | 'simple' | 'family';
  student_id?: number;
  price?: number;
  percent?: number;
  start_date: string | moment.Moment;
  end_date: string | moment.Moment;
  course_ids: number[] | number;
  comment?: string;
}

export const createDiscount = createAsyncThunk(
  'discount/createDiscount',
  async (
    {
      name,
      student_id,
      price,
      percent,
      start_date,
      end_date,
      course_ids,
      comment,
    }: createDiscountProps,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.post(`discounts`, {
        name,
        student_id,
        price,
        percent,
        start_date,
        end_date,
        course_ids,
        comment,
      });
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
