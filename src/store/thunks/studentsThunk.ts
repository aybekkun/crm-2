import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { IStudentData, IStudents, IStudentsForm } from '../../types/Students';

interface SearchStudentProps {
  page?: number | null;
  limit?: number | null;
  name?: string | null;
  phone?: string | null;
  status_id?: string | null;
  time_id?: string | null;
  lead_id?: string | null;
  course_id?: string | null;
  cancelToken?: CancelToken;
}

export const fetchStudents = createAsyncThunk(
  'students/fetchCourses',
  async (searchParams: SearchStudentProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IStudents>(`students`, {
        params: searchParams,
        cancelToken: searchParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить курсов');
    }
  }
);

interface FetchOneStudentParamsProps {
  id: string | undefined;
  cancelToken?: CancelToken;
}

export const fetchOneStudent = createAsyncThunk(
  'students/fetchStudent',
  async (oneStudentParams: FetchOneStudentParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IStudentData>(`students/${oneStudentParams.id}`, {
        cancelToken: oneStudentParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить курсов');
    }
  }
);

export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (
    { name, surname, phone, birthday, address, password, group_ids }: IStudentsForm,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.post(`students`, {
        name,
        surname,
        phone,
        birthday,
        address,
        password,
        group_ids,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface AddStudentToGroupProps {
  group_id: string | undefined;
  student_id: number;
}

export const addStudentToGroup = createAsyncThunk(
  'student/addStudentToGroup',
  async ({ group_id, student_id }: AddStudentToGroupProps, thunkAPI) => {
    try {
      const response = await $authHost.post(`studentgroup`, {
        group_id,
        student_id,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface UpdateStatusProps {
  group_id: string | undefined;
  student_id: number;
  status: 'frozen' | 'active' | 'wait';
  start_date: string | moment.Moment;
}

export const updateStatusStudent = createAsyncThunk(
  'student/addStudentToGroup',
  async ({ group_id, student_id, status, start_date }: UpdateStatusProps, thunkAPI) => {
    try {
      const response = await $authHost.post(`update_status`, {
        group_id,
        student_id,
        status,
        start_date,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async (
    { id, name, surname, phone, birthday, address, password, group_ids }: IStudentsForm,
    thunkAPI
  ) => {
    try {
      const response = await $authHost.put(`students/${id}`, {
        name,
        surname,
        phone,
        birthday,
        address,
        password,
        group_ids,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id: number, thunkAPI) => {
    try {
      const response = await $authHost.delete(`students/${id}`);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать курсов');
    }
  }
);
