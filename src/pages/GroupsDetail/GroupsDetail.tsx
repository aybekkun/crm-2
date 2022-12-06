import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormGroup from '../../components/Screens/GroupDetail/FormGroup/FormGroup';
import Group from '../../components/Screens/GroupDetail/Group/Group';
import GroupsForm from '../../components/Screens/Groups/GroupsForm';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import PageContainer from './../../components/commons/PageContainer/PageContainer';
import { fetchOneGroup } from './../../store/thunks/groupsThunk';

const GroupsDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { group, currentMonth, isLoading } = useAppSelector((state) => state.groupsReducer);
  const { count } = useAppSelector((state) => state.countReducer);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(
      fetchOneGroup({
        id,
        month: currentMonth ? currentMonth : null,
        cancelToken: cancelToken.token,
      })
    );
    return () => {
      cancelToken.cancel();
    };
  }, [dispatch, id, count, currentMonth]);

  return (
    <PageContainer name={group.group_name}>
      {group?.months.length > 0 ? (
        <Group id={id} group={group} isLoading={isLoading} />
      ) : (
        <FormGroup id={id} />
      )}
      <GroupsForm />
    </PageContainer>
  );
};

export default GroupsDetail;
