import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStudentData, IStudents } from '../../types/Students';
import { IStudentsForm } from './../../types/Students';
import { fetchOneStudent, fetchStudents } from './../thunks/studentsThunk';

interface IStudentsState {
  student: IStudentData | null;
  students: IStudents;
  form: IStudentsForm;
  page: number;
  modal: boolean;
  returnModal: boolean;
  addToGroupModal: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: IStudentsState = {
  student: null,
  students: {
    total: 0,
    data: [],
  },
  form: {
    name: '',
    surname: '',
    phone: '',
    birthday: '',
    address: '',
    password: '',
    group_ids: [],
  },
  modal: false,
  returnModal: false,
  addToGroupModal: false,
  page: 1,
  isLoading: false,
  error: '',
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setPageStudents(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormStudents(state, action: PayloadAction<IStudentsForm>) {
      state.form = action.payload;
    },
    setModalStudents(state, action: PayloadAction<boolean>) {
      state.modal = action.payload;
    },
    setAddToGroupModal(state, action: PayloadAction<boolean>) {
      state.addToGroupModal = action.payload;
    },
    setReturnModalStudents(state, action: PayloadAction<boolean>) {
      state.returnModal = action.payload;
    },
    setResetFormStudents(state) {
      state.form = {
        name: '',
        surname: '',
        phone: '',
        birthday: '',
        address: '',
        password: '',
        group_ids: [],
      };
    },
  },
  extraReducers: {
    [fetchStudents.fulfilled.type]: (state, action: PayloadAction<IStudents>) => {
      state.students = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchStudents.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchStudents.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchOneStudent.fulfilled.type]: (state, action: PayloadAction<IStudentData>) => {
      state.student = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchOneStudent.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchOneStudent.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default studentsSlice.reducer;
