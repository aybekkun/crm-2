import { combineReducers, configureStore } from '@reduxjs/toolkit';
import waitReducer from './slices/waitSlice';
import roomsReducer from './slices/roomsSlice';
import timeReducer from './slices/timeSlice';
import leadReducer from './slices/leadSlice';
import coursesReducer from './slices/coursesSlice';
import teachersReducer from './slices/teachersSlice';
import groupsReducer from './slices/groupsSlice';
import studentsReducer from './slices/studentsSlice';
import paymentsReducer from './slices/paymentsSlice';
import expensesReducer from './slices/expensesSlice';
import employeesReducer from './slices/employeesSlice';
import loginReducer from './slices/loginSlice';
import lessonsReducer from './slices/lessonsSlice';
import mainReducer from './slices/mainSlice';
import statisticsReducer from './slices/statisticsSlice';
import statusReducer from './slices/statusSlice';
import modalReducer from './slices/modalSlice';
import countReducer from './slices/countSlice';
import discountsReducer from './slices/discountsSlice';
import internationalisationReducer from './slices/internationalisationSlice';

const rootReducer = combineReducers({
  waitReducer,
  roomsReducer,
  timeReducer,
  leadReducer,
  coursesReducer,
  teachersReducer,
  groupsReducer,
  studentsReducer,
  paymentsReducer,
  expensesReducer,
  employeesReducer,
  loginReducer,
  lessonsReducer,
  mainReducer,
  statisticsReducer,
  statusReducer,
  modalReducer,
  countReducer,
  discountsReducer,
  internationalisationReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
