import { Button, Pagination } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import StudentsForm from '../../components/Screens/Students/StudentsFrom';
import WaitForm from '../../components/Screens/Wait/WaitForm';
import WaitItem from '../../components/Screens/Wait/WaitItem';
import { CREATE } from '../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { waitSlice } from '../../store/slices/waitSlice';
import { fetchCourses } from '../../store/thunks/coursesThunk';
import { fetchLead } from '../../store/thunks/leadThunk';
import { fetchTime } from '../../store/thunks/timeThunk';
import { fetchWait } from '../../store/thunks/waitThunk';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { fetchGroups } from './../../store/thunks/groupsThunk';
import styles from './Wait.module.scss';
import { useTranslation } from 'react-i18next';
import AddComment from '../../components/Screens/Wait/AddComment';

const Wait = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { waits, page } = useAppSelector((state) => state.waitReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setPageWait } = waitSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;

  const handleChange = (page: number) => {
    dispatch(setPageWait(page));
  };

  const onHandleCreateWait = () => {
    dispatch(setModal(true));
    dispatch(setStatus(CREATE));
  };

  useEffect(() => {
    dispatch(fetchWait({ page: page }));
  }, [page, count, dispatch]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchTime({ cancelToken: cancelToken.token }));
    dispatch(fetchLead({ cancelToken: cancelToken.token }));
    dispatch(fetchCourses({ cancelToken: cancelToken.token }));
    dispatch(fetchGroups({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <PageContainer name={translate('wait')}>
      <div className={styles.table}>
        <Button onClick={onHandleCreateWait} type="primary" style={{ marginTop: 10 }}>
          {translate('addBtn')}
        </Button>
        <WaitItem />
        <WaitForm />
        <StudentsForm />
        <AddComment />
      </div>
      <Pagination
        total={waits.total}
        defaultCurrent={page}
        onChange={handleChange}
        pageSize={10}
        className="pagination"
      />
    </PageContainer>
  );
};

export default Wait;
