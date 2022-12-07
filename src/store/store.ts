import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import countReducer from './slices/countSlice';
import coursesReducer from './slices/coursesSlice';
import discountsReducer from './slices/discountsSlice';
import employeesReducer from './slices/employeesSlice';
import expensesReducer from './slices/expensesSlice';
import groupsReducer from './slices/groupsSlice';
import internationalisationReducer from './slices/internationalisationSlice';
import leadReducer from './slices/leadSlice';
import lessonsReducer from './slices/lessonsSlice';
import loginReducer from './slices/loginSlice';
import mainReducer from './slices/mainSlice';
import modalReducer from './slices/modalSlice';
import paymentsReducer from './slices/paymentsSlice';
import roomsReducer from './slices/roomsSlice';
import statisticsReducer from './slices/statisticsSlice';
import statusReducer from './slices/statusSlice';
import studentsReducer from './slices/studentsSlice';
import teachersReducer from './slices/teachersSlice';
import timeReducer from './slices/timeSlice';
import waitReducer from './slices/waitSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = persistReducer(persistConfig, loginReducer);
const store = configureStore({
  reducer: {
    loginReducer: rootReducer,
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
    lessonsReducer,
    mainReducer,
    statisticsReducer,
    statusReducer,
    modalReducer,
    countReducer,
    discountsReducer,
    internationalisationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export let persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
