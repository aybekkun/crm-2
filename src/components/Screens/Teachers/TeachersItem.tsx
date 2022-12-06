import { InputRef, Table } from 'antd';
import { ColumnsType, FilterConfirmProps } from 'antd/lib/table/interface';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADDRESS, BIRTHDAY, FULL_NAME, PERCENT, PHONE } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { getColumnSearchTeacher } from '../../../helpers/utils/columnSearch/getColumnSearchTeacher';
import { ITeacherData } from '../../../types/Teachers';
import { fetchTeachers } from './../../../store/thunks/teachersThunk';
import { useTranslation } from 'react-i18next';

type DataIndex = keyof ITeacherData;

const TeachersItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { teachers, isLoading } = useAppSelector((state) => state.teachersReducer);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    dispatch(
      fetchTeachers({
        name: dataIndex === FULL_NAME.eng ? selectedKeys[0] : null,
        phone: dataIndex === PHONE.eng ? selectedKeys[0] : null,
      })
    );
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns: ColumnsType<ITeacherData> = [
    {
      title: translate('fullname'),
      dataIndex: FULL_NAME.eng,
      key: FULL_NAME.eng,
      width: '25%',
      ...getColumnSearchTeacher({
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
      width: '20%',
      ...getColumnSearchTeacher({
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
      title: translate('birthday'),
      dataIndex: BIRTHDAY.eng,
      key: BIRTHDAY.eng,
      width: '20%',
    },
    {
      title: translate('address'),
      dataIndex: ADDRESS.eng,
      key: ADDRESS.eng,
      width: '20%',
    },
    {
      title: translate('percent'),
      dataIndex: PERCENT.eng,
      key: PERCENT.eng,
      width: '15%',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={teachers.data}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`${record.id}`);
          },
        };
      }}
      loading={isLoading ? true : false}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default TeachersItem;
