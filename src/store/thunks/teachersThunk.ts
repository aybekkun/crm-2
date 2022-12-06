import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '../../helpers/http';
import { ITeachers, ITeachersForm } from '../../types/Teachers';
import { ITeacherOneData } from './../../types/Teachers';
import { CancelToken } from 'axios';

interface teachersParamsProps {
  page?: number;
  limit?: number;
  name?: string | null;
  phone?: string | null;
  cancelToken?: CancelToken;
}

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (teacherParams: teachersParamsProps | null, thunkAPI) => {
    try {
      const { data } = await $authHost.get<ITeachers>(`teachers`, {
        params: teacherParams,
        cancelToken: teacherParams?.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить курсов');
    }
  }
);

interface oneTeacherParamsProps {
  id: string | undefined;
  cancelToken: CancelToken;
}

export const fetchOneTeacher = createAsyncThunk(
  'teacher/fetchOneTeacher',
  async (oneTeacherParams: oneTeacherParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<ITeacherOneData>(`teachers/${oneTeacherParams.id}`, {
        cancelToken: oneTeacherParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить курсов');
    }
  }
);

export const createTeacher = createAsyncThunk(
  'teacher/createTeacher',
  async (
    { name, surname, phone, birthday, address, course_ids, password, percent }: ITeachersForm,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.post(`teachers`, {
        name,
        surname,
        phone,
        birthday,
        address,
        course_ids,
        password,
        percent,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  'teacher/updateTeacher',
  async (
    { id, name, surname, phone, birthday, address, course_ids, password, percent }: ITeachersForm,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.put(`teachers/${id}`, {
        name,
        surname,
        phone,
        birthday,
        address,
        course_ids,
        password,
        percent,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  'teacher/deleteTeacher',
  async (id: number, thunkAPI) => {
    try {
      const response = await $authHost.delete(`teachers/${id}`);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
