import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourses } from '../../types/Courses';
import { ICoursesForm } from '../../types/Courses';
import { fetchCourses } from '../thunks/coursesThunk';

export interface ICoursesState {
  courses: ICourses;
  form: ICoursesForm;
  page: number;
  isLoading: boolean;
  error: string;
}

const initialState: ICoursesState = {
  courses: {
    total: 1,
    data: [],
  },
  form: {
    name: '',
    price: 0,
    duration: 0,
  },
  page: 1,
  isLoading: false,
  error: '',
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setPageCourses(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormCourses(state, action: PayloadAction<ICoursesForm>) {
      state.form = action.payload;
    },
    setResetFormCourses(state) {
      state.form = {
        name: '',
        price: 0,
        duration: 0,
      };
    },
  },
  extraReducers: {
    [fetchCourses.fulfilled.type]: (state, action: PayloadAction<ICourses>) => {
      state.courses = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchCourses.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCourses.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default coursesSlice.reducer;
