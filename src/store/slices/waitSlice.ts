import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWait } from '../thunks/waitThunk';
import { IWaitForm, IWait } from '../../types/Wait';

interface IWaitState {
  waits: IWait;
  form: IWaitForm;
  idWait: number | undefined;
  page: number;
  isLoading: boolean;
  commentModal: boolean;
  error: string;
}

const initialState: IWaitState = {
  waits: {
    total: 0,
    data: [],
  },
  form: {
    name: '',
    phone: '+998',
    course_id: 0,
    gender: '',
    time_id: 0,
    lead_id: 0,
  },
  idWait: 0,
  page: 1,
  commentModal: false,
  isLoading: false,
  error: '',
};

export const waitSlice = createSlice({
  name: 'wait',
  initialState,
  reducers: {
    setPageWait(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFormWait(state, action: PayloadAction<IWaitForm>) {
      state.form = action.payload;
    },
    setIdWait(state, action: PayloadAction<number | undefined>) {
      state.idWait = action.payload;
    },
    setCommentModal(state, action: PayloadAction<boolean>) {
      state.commentModal = action.payload;
    },
    setResetFormWait(state) {
      state.form = {
        name: '',
        phone: '+998',
        course_id: 0,
        gender: '',
        time_id: 0,
        lead_id: 0,
      };
    },
  },
  extraReducers: {
    [fetchWait.fulfilled.type]: (state, action: PayloadAction<IWait>) => {
      state.waits = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    [fetchWait.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWait.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default waitSlice.reducer;
