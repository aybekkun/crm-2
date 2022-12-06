import { Button, Pagination } from 'antd';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import GroupsForm from '../../components/Screens/Groups/GroupsForm';
import GroupsItem from '../../components/Screens/Groups/GroupsItem';
import { CREATE } from '../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { groupsSlice } from './../../store/slices/groupsSlice';
import { fetchCourses } from './../../store/thunks/coursesThunk';
import { fetchGroups } from './../../store/thunks/groupsThunk';
import { fetchTeachers } from './../../store/thunks/teachersThunk';
import styles from './Groups.module.scss';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { useTranslation } from 'react-i18next';

const Groups = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { groups, page } = useAppSelector((state) => state.groupsReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setPageGroups } = groupsSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;

  const handleChange = (page: number) => {
    dispatch(setPageGroups(page));
  };

  const onHandleCreateGroup = () => {
    dispatch(setModal(true));
    dispatch(setStatus(CREATE));
  };

  console.log(groups);

  useEffect(() => {
    dispatch(fetchGroups({ page }));
  }, [page, count, dispatch]);

  useEffect(() => {
    dispatch(fetchCourses(null));
    dispatch(fetchTeachers(null));
  }, [dispatch]);

  return (
    <PageContainer name={translate('groups')}>
      <div className={styles.table}>
        <Button onClick={onHandleCreateGroup} type="primary" style={{ marginTop: 10 }}>
          {translate('addBtn')}
        </Button>
        <GroupsItem />
        <GroupsForm />
      </div>
      <Pagination
        total={groups.total}
        defaultCurrent={page}
        onChange={handleChange}
        pageSize={10}
        className="pagination"
      />
    </PageContainer>
  );
};

export default Groups;
