import { Button, Pagination } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import TeachersForm from '../../components/Screens/Teachers/TeachersForm';
import TeachersItem from '../../components/Screens/Teachers/TeachersItem';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { teachersSlice } from '../../store/slices/teachersSlice';
import { fetchTeachers } from './../../store/thunks/teachersThunk';
import styles from './Teachers.module.scss';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { CREATE } from '../../helpers/constants/form';
import { useTranslation } from 'react-i18next';
import { fetchCourses } from '../../store/thunks/coursesThunk';

const Teachers = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { teachers, page, error } = useAppSelector((state) => state.teachersReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setPageTeachers } = teachersSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;

  const onHandleCreateCourse = () => {
    dispatch(setModal(true));
    dispatch(setStatus(CREATE));
  };

  const handleChange = (page: number) => {
    dispatch(setPageTeachers(page));
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchTeachers({ page, cancelToken: cancelToken.token }));
    dispatch(fetchCourses({ page, cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [page, count, dispatch]);

  return (
    <PageContainer name={translate('teachers')}>
      <div className={styles.table}>
        <Button onClick={onHandleCreateCourse} type="primary" style={{ marginTop: 10 }}>
          {translate('addBtn')}
        </Button>
        <TeachersItem />
        <TeachersForm />
      </div>
      <Pagination
        total={teachers.total}
        defaultCurrent={page}
        onChange={handleChange}
        pageSize={10}
        className="pagination"
      />
    </PageContainer>
  );
};

export default Teachers;
