import { Button } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import EmployeesForm from '../../components/Screens/Employees/EmployeesForm';
import EmployeesItem from '../../components/Screens/Employees/EmployeesItem';
import { CREATE } from '../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { fetchRoles, fetchAdmins } from './../../store/thunks/employeesThunk';
import { useTranslation } from 'react-i18next';

const Employees = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.countReducer);
  const { error } = useAppSelector((state) => state.employeesReducer);
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;

  const onHandleCreateEmployee = () => {
    dispatch(setModal(true));
    dispatch(setStatus(CREATE));
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchAdmins({ cancelToken: cancelToken.token }));
    dispatch(fetchRoles(cancelToken.token));

    return () => {
      cancelToken.cancel();
    };
  }, [count, dispatch]);

  return (
    <PageContainer name={translate('employees')}>
      <Button onClick={onHandleCreateEmployee} type="primary" style={{ marginTop: 10 }}>
        {translate('addBtn')}
      </Button>
      <EmployeesItem />
      <EmployeesForm />
    </PageContainer>
  );
};

export default Employees;
