import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployeeSalary, IRolesData } from '../../types/Employees';
import { IEmployeesData, IEmployeesForm } from '../../types/Employees';
import { fetchEmployees, fetchRoles } from '../thunks/employeesThunk';
import { fetchAdmins, updateAdmin } from './../thunks/employeesThunk';

export interface IEmployeesState {
  employees: IEmployeesData[];
  employeesSalary: IEmployeeSalary[];
  roles: IRolesData[];
  form: IEmployeesForm;
  page: number;
  isLoading: boolean;
  error: string;
}

const initialState: IEmployeesState = {
  employees: [],
  employeesSalary: [],
  roles: [],
  form: {
    name: '',
    surname: '',
    phone: '',
    birthday: '',
    address: '',
    password: '',
    salary: 0,
    role_id: 0,
    role: '',
  },
  page: 1,
  isLoading: false,
  error: '',
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setPageEmployees(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormEmployees(state, action: PayloadAction<IEmployeesForm>) {
      state.form = action.payload;
    },
    setResetFormEmployees(state) {
      state.form = {
        name: '',
        surname: '',
        phone: '',
        birthday: '',
        address: '',
        password: '',
        salary: 0,
        role_id: 0,
        role: '',
      };
    },
  },
  extraReducers: {
    [fetchAdmins.fulfilled.type]: (state, action: PayloadAction<IEmployeesData[]>) => {
      state.employees = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchAdmins.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAdmins.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [fetchRoles.fulfilled.type]: (state, action: PayloadAction<IRolesData[]>) => {
      state.roles = action.payload;
    },
    [fetchEmployees.fulfilled.type]: (state, action: PayloadAction<IEmployeeSalary[]>) => {
      state.employeesSalary = action.payload;
      state.error = '';
      state.isLoading = false;
    },
  },
});

export default employeesSlice.reducer;
