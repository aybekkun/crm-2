import { createAsyncThunk } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { $authHost } from '../../helpers/http';
import { IEmployeeSalary, IEmployeesData, IEmployeesForm, IRolesData } from '../../types/Employees';

interface AdminParamsProps {
  page?: number;
  limit?: number;
  cancelToken?: CancelToken;
}

export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async (timeParams: AdminParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IEmployeesData[]>(`admins`, {
        params: timeParams,
        cancelToken: timeParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (timeParams: AdminParamsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IEmployeeSalary[]>(`employees`, {
        params: timeParams,
        cancelToken: timeParams.cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (cancelToken: CancelToken, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IRolesData[]>(`roles`, {
        cancelToken: cancelToken,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
    }
  }
);

export const createAdmin = createAsyncThunk(
  'admins/createAdmin',
  async (obj: IEmployeesForm, thunkAPI) => {
    try {
      const { data } = await $authHost.post(`admins`, obj);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  'admins/updateAdmin',
  async (
    { id, name, surname, phone, birthday, address, salary, role_id }: IEmployeesForm,
    thunkAPI
  ) => {
    try {
      const { data } = await $authHost.put(`admins/${id}`, {
        name,
        surname,
        phone,
        birthday,
        address,
        salary,
        role_id,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteAdmin = createAsyncThunk('admins/deleteAdmin', async (id: number, thunkAPI) => {
  try {
    const { data } = await $authHost.delete(`admins/${id}`);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить ожидающих');
  }
});
