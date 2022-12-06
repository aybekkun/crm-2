import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '../../helpers/http';
import { IGroups, IGroupsForm, IOneGroupData } from './../../types/Groups';
import { CancelToken } from 'axios';

interface waitParamsProps {
  page?: number;
  limit?: number;
  name?: string | null;
  teacher_id?: string | null;
  course_id?: string | null;
  cancelToken?: CancelToken;
}

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (fetchParams: waitParamsProps | null, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IGroups>(`groups`, {
        params: fetchParams,
        cancelToken: fetchParams?.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить курсов');
    }
  }
);

interface oneGroupParamsProps {
  id: string | undefined;
  cancelToken?: CancelToken;
  month?: string | null;
}

export const fetchOneGroup = createAsyncThunk(
  'group/fetchOneGroup',
  async ({ id, cancelToken, month }: oneGroupParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IOneGroupData>(`groups/${id}`, {
        params: { month: month },
        cancelToken: cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить курсов');
    }
  }
);

export const createGroup = createAsyncThunk(
  'group/createGroup',
  async ({ name, course_id, teacher_id }: IGroupsForm, thunkAPI) => {
    try {
      const response = await $authHost.post(`groups`, {
        name,
        course_id,
        teacher_id,
      });
    } catch (e) {
      return e;
    }
  }
);

interface ILessons {
  group_id: string | undefined;
  room_id: number;
  start_time: string | moment.Moment;
  end_time: string | moment.Moment;
  start_date: string | moment.Moment;
  type: 'odd' | 'even';
}

export const createLessons = createAsyncThunk(
  'lessons/createLessons',
  async ({ group_id, room_id, start_date, start_time, end_time, type }: ILessons, thunkAPI) => {
    try {
      const response = await $authHost.post(`lessons`, {
        group_id,
        room_id,
        start_date,
        start_time,
        end_time,
        type,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface IJournals {
  student_id: number;
  lesson_id: number;
  check: number;
}

export const createJournals = createAsyncThunk(
  'journals/createJournals',
  async ({ student_id, lesson_id, check }: IJournals, thunkAPI) => {
    try {
      const response = await $authHost.post(`journals`, {
        student_id,
        lesson_id,
        check,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'group/updateGroup',
  async ({ id, name, course_id, teacher_id }: IGroupsForm, thunkAPI) => {
    try {
      const response = await $authHost.put(`groups/${id}`, {
        name,
        course_id,
        teacher_id,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const deleteGroup = createAsyncThunk('group/deleteGroup', async (id: number, thunkAPI) => {
  try {
    const response = await $authHost.delete(`groups/${id}`);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось создать курсов');
  }
});
