import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import {
  ACTION,
  ADDRESS,
  BIRTHDAY,
  EDIT,
  FULL_NAME,
  getDeleteName,
  getEditName,
  PHONE,
  ROLE,
  SALARY,
} from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { splitNum } from '../../../helpers/utils/splitSum';
import { employeesSlice } from '../../../store/slices/employeesSlice';
import { IEmployeesData, IEmployeesForm } from '../../../types/Employees';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import EditBtn from '../../Buttons/EditBtn/EditBtn';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';
import { statusSlice } from './../../../store/slices/statusSlice';
import { deleteAdmin } from './../../../store/thunks/employeesThunk';
import { useTranslation } from 'react-i18next';

const EmployeesItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { employees, isLoading } = useAppSelector((state) => state.employeesReducer);
  const { setFormEmployees } = employeesSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;
  const { setCount } = countSlice.actions;

  const onEditEmployee = (obj: IEmployeesForm) => {
    dispatch(setFormEmployees(obj));
    dispatch(setModal(true));
    dispatch(setStatus(EDIT));
  };

  const onDeleteEmployee = async (id: number) => {
    await dispatch(deleteAdmin(id));
    dispatch(setCount(1));
  };

  const columns: ColumnsType<IEmployeesData> = [
    {
      title: translate('fullname'),
      dataIndex: FULL_NAME.eng,
      key: FULL_NAME.eng,
      width: '15%',
    },
    {
      title: translate('phone'),
      dataIndex: PHONE.eng,
      key: PHONE.eng,
      width: '15%',
    },
    {
      title: translate('birthday'),
      dataIndex: BIRTHDAY.eng,
      key: BIRTHDAY.eng,
      width: '15%',
    },
    {
      title: translate('address'),
      dataIndex: ADDRESS.eng,
      key: ADDRESS.eng,
      width: '15%',
    },
    {
      title: translate('salary'),
      dataIndex: SALARY.eng,
      key: SALARY.eng,
      width: '15%',
      render: (_, record) => <div>{splitNum(record.salary)}</div>,
    },
    {
      title: translate('role'),
      dataIndex: ROLE.eng,
      key: ROLE.eng,
      width: '15%',
    },
    {
      title: translate('action'),
      dataIndex: '',
      key: 'x',
      width: '15%',
      render: (_, record) => (
        <div key={record.id}>
          <EditBtn
            onEditBtn={onEditEmployee}
            record={record}
            title={getEditName(translate('employee'))}
          />
          <DeleteBtn
            onDeleteBtn={onDeleteEmployee}
            id={record.id}
            title={getDeleteName(translate('employee'))}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employees}
      pagination={false}
      loading={!!isLoading}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default EmployeesItem;
