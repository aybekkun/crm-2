import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '../../helpers/http';
import { ICourses } from '../../types/Courses';
import { CancelToken } from 'axios';

interface courseParamsProps {
  page?: number;
  limit?: number;
  cancelToken?: CancelToken;
}

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (courseParams: courseParamsProps | null, thunkAPI) => {
    try {
      const { data } = await $authHost.get<ICourses>(`courses`, {
        params: courseParams,
        cancelToken: courseParams?.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e as Error);
    }
  }
);

interface ICourseProps {
  id?: number;
  name: string;
  price: number;
  duration: number;
}

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async ({ name, price, duration }: ICourseProps, thunkAPI) => {
    try {
      const response = await $authHost.post(`courses`, {
        name,
        price,
        duration,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async ({ id, name, price, duration }: ICourseProps, thunkAPI) => {
    try {
      const response = await $authHost.put(`courses/${id}`, {
        name,
        price,
        duration,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id: number, thunkAPI) => {
    try {
      const response = await $authHost.delete(`courses/${id}`);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);
