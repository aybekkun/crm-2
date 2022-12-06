import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroups } from '../../types/Groups';
import { IGroupsForm, IOneGroupData } from '../../types/Groups';
import { fetchGroups, fetchOneGroup } from '../thunks/groupsThunk';

interface IGroupsState {
  group: IOneGroupData;
  groups: IGroups;
  form: IGroupsForm;
  currentMonth: string | null;
  page: number;
  isLoading: boolean;
  error: string;
}

const initialState: IGroupsState = {
  group: {
    group_id: 1,
    group_name: '',
    duration: 1,
    course_id: 1,
    course_name: '',
    price: 0,
    room_name: '',
    teacher_id: 1,
    teacher_name: '',
    start_lesson: '',
    end_lesson: '',
    start_time: '',
    end_time: '',
    months: [],
    students: [],
  },
  groups: {
    total: 0,
    data: [],
  },
  form: {
    name: '',
    course_id: 0,
    teacher_id: 0,
  },
  currentMonth: '',
  page: 1,
  isLoading: false,
  error: '',
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setPageGroups(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormGroups(state, action: PayloadAction<IGroupsForm>) {
      state.form = action.payload;
    },
    setResetFormGroups(state) {
      state.form = {
        name: '',
        course_id: 0,
        teacher_id: 0,
      };
    },
    setCurrentMonth(state, action: PayloadAction<string>) {
      state.currentMonth = action.payload;
    },
  },
  extraReducers: {
    [fetchGroups.fulfilled.type]: (state, action: PayloadAction<IGroups>) => {
      state.groups = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchGroups.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGroups.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchOneGroup.fulfilled.type]: (state, action: PayloadAction<IOneGroupData>) => {
      state.group = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchOneGroup.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchOneGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default groupsSlice.reducer;
