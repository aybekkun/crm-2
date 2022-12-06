import { Button, Pagination } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import CourseForm from '../../components/Screens/Courses/CoursesForm';
import CoursesItem from '../../components/Screens/Courses/CoursesItem';
import { CREATE } from '../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { coursesSlice } from '../../store/slices/coursesSlice';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { fetchCourses } from './../../store/thunks/coursesThunk';
import styles from './Courses.module.scss';
import { useTranslation } from 'react-i18next';

const Courses = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { courses, page } = useAppSelector((state) => state.coursesReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setPageCourses } = coursesSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;

  const onHandleCreateCourse = () => {
    dispatch(setModal(true));
    dispatch(setStatus(CREATE));
  };

  const handleChange = (page: number) => {
    dispatch(setPageCourses(page));
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchCourses({ page, cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [page, count, dispatch]);

  return (
    <PageContainer name={translate('courses')}>
      <div className={styles.table}>
        <Button onClick={onHandleCreateCourse} type="primary" style={{ marginTop: 10 }}>
          {translate('addBtn')}
        </Button>

        <CoursesItem />
        <CourseForm />
        <Pagination
          total={courses.total}
          defaultCurrent={page}
          onChange={handleChange}
          pageSize={10}
          className="pagination"
        />
      </div>
    </PageContainer>
  );
};

export default Courses;
