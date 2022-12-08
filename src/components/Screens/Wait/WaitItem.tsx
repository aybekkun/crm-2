import { InputRef, Table } from 'antd';
import {
  ColumnsType,
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CREATE,
  EDIT,
  FULL_NAME,
  getDeleteName,
  getEditName,
  NAME,
  PHONE,
} from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { getColumnSearchWait } from '../../../helpers/utils/columnSearch/getColumnSearchWait';
import { countSlice } from '../../../store/slices/countSlice';
import { modalSlice } from '../../../store/slices/modalSlice';
import { statusSlice } from '../../../store/slices/statusSlice';
import { studentsSlice } from '../../../store/slices/studentsSlice';
import { waitSlice } from '../../../store/slices/waitSlice';
import { deleteWait, fetchWait } from '../../../store/thunks/waitThunk';
import { IWaitData, IWaitForm } from '../../../types/Wait';
import CommentBtn from './CommentBtn/CommentBtn';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import EditBtn from '../../Buttons/EditBtn/EditBtn';
import StudentAddBtn, { RecordProps } from '../../Buttons/StudentAddBtn/StudentAddBtn';

type DataIndex = keyof IWaitData;

const WaitItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { waits, isLoading } = useAppSelector((state) => state.waitReducer);
  const { time } = useAppSelector((state) => state.timeReducer);
  const { lead } = useAppSelector((state) => state.leadReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { setFormWait } = waitSlice.actions;
  const { setFormStudents, setModalStudents } = studentsSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;
  const { setStatus } = statusSlice.actions;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    dispatch(
      fetchWait({
        name: dataIndex === NAME.eng ? selectedKeys[0] : null,
        phone: dataIndex === PHONE.eng ? selectedKeys[0] : null,
      })
    );
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const onHandleCreateStudent = ({ id, name, surname, phone, group_ids }: RecordProps) => {
    dispatch(
      setFormStudents({
        id: id,
        name: name,
        surname: surname,
        phone: phone,
        group_ids: group_ids,
      })
    );
    dispatch(setModalStudents(true));
    dispatch(setStatus(CREATE));
  };

  const onEditWait = (obj: IWaitForm) => {
    dispatch(setFormWait(obj));
    dispatch(setModal(true));
    dispatch(setStatus(EDIT));
  };

  const onDeleteWait = async (id: number) => {
    await dispatch(deleteWait(id));
    dispatch(setCount(1));
  };

  const columns: ColumnsType<IWaitData> = [
    {
      title: translate('fullname'),
      dataIndex: FULL_NAME.eng,
      key: FULL_NAME.eng,
      width: '20%',
      ...getColumnSearchWait({
        dataIndex: 'name',
        searchInput,
        handleSearch,
        handleReset,
        setSearchText,
        setSearchedColumn,
        searchText,
        searchedColumn,
      }),
    },
    {
      title: translate('phone'),
      dataIndex: PHONE.eng,
      key: PHONE.eng,
      width: '15%',
      ...getColumnSearchWait({
        dataIndex: 'phone',
        searchInput,
        handleSearch,
        handleReset,
        setSearchText,
        setSearchedColumn,
        searchText,
        searchedColumn,
      }),
    },
    {
      title: translate('courses'),
      dataIndex: 'course',
      key: 'course',
      width: '10%',
      filterMultiple: false,
      filters: courses.data.map((item) => {
        return { text: item.name, value: item.id };
      }),
    },
    {
      title: translate('time'),
      dataIndex: 'time',
      key: 'time',
      width: '10%',
      filterMultiple: false,
      filters: time?.data.map((item) => {
        return { text: item.name, value: item.id };
      }),
    },
    {
      title: translate('lead'),
      dataIndex: 'lead',
      key: 'lead',
      width: '10%',
      filterMultiple: false,
      filters: lead?.data.map((item) => {
        return { text: item.name, value: item.id };
      }),
    },
    {
      title: translate('gender'),
      dataIndex: 'gender',
      key: 'gender',
      width: '5%',
      render: (_, record) => <div key={record.id}>{record.gender === 'male' ? 'М' : 'Ж'}</div>,
    },
    {
      title: translate('comment'),
      dataIndex: 'comment',
      key: 'comment',
      width: '5%',
      // render: (_, record) => <div key={record.id}>{record.gender === 'male' ? 'М' : 'Ж'}</div>,
    },
    {
      title: translate('from'),
      dataIndex: 'from',
      key: 'from',
      width: '10%',
    },
    {
      title: translate('action'),
      dataIndex: '',
      key: 'x',
      width: '15%',
      render: (_, record) => (
        <div key={record.id}>
          <StudentAddBtn onHandleCreateStudent={onHandleCreateStudent} record={record} />
          <EditBtn onEditBtn={onEditWait} record={record} title={getEditName(translate('wait'))} />
          <DeleteBtn
            onDeleteBtn={onDeleteWait}
            id={record.id}
            title={getDeleteName(translate('wait'))}
          />
          <CommentBtn id={record.id} />
        </div>
      ),
    },
  ];

  const handleTableChange = (
    _: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    dispatch(
      fetchWait({
        time_id: filters.time ? String(filters.time[0]) : null,
        lead_id: filters.lead ? String(filters.lead[0]) : null,
        course_id: filters.course ? String(filters.course[0]) : null,
      })
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={waits.data}
      pagination={false}
      onChange={handleTableChange}
      loading={!!isLoading}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default WaitItem;
