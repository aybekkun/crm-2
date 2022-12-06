import { Button, Pagination } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import StudentsForm from '../../components/Screens/Students/StudentsFrom';
import StudentsItem from '../../components/Screens/Students/StudentsItem/StudentsItem';
import { CREATE } from '../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { statusSlice } from './../../store/slices/statusSlice';
import { studentsSlice } from './../../store/slices/studentsSlice';
import { fetchStudents } from './../../store/thunks/studentsThunk';
import styles from './Students.module.scss';
import { useTranslation } from 'react-i18next';
import { fetchGroups } from '../../store/thunks/groupsThunk';

const Students = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [limit] = useState<number>(10);
  const { students, page } = useAppSelector((state) => state.studentsReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setPageStudents, setModalStudents } = studentsSlice.actions;
  const { setStatus } = statusSlice.actions;

  const handleChange = (page: number) => {
    dispatch(setPageStudents(page));
  };

  const onHandleCreateStudnets = () => {
    dispatch(setModalStudents(true));
    dispatch(setStatus(CREATE));
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchStudents({ page, limit, cancelToken: cancelToken.token }));
    dispatch(fetchGroups({ cancelToken: cancelToken.token }));
    return () => {
      cancelToken.cancel();
    };
  }, [page, count, dispatch, limit]);

  return (
    <PageContainer name={translate('students')}>
      <Button onClick={onHandleCreateStudnets} type="primary" style={{ marginTop: 10 }}>
        {translate('addBtn')}
      </Button>
      <div className={styles.table}>
        <StudentsItem />
        <StudentsForm />
      </div>
      <Pagination
        total={students.total}
        defaultCurrent={page}
        onChange={handleChange}
        pageSize={10}
        className="pagination"
      />
    </PageContainer>
  );
};

export default Students;
