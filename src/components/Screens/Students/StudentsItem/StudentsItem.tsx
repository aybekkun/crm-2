import { InputRef, Table } from 'antd';
import {
  ColumnsType,
  FilterConfirmProps,
  FilterValue,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BALANCE,
  FULL_NAME,
  GROUPS,
  PHONE,
  STATUS,
  STUDENTS,
} from '../../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../../helpers/hooks/redux';
import { getColumnSearchStudent } from '../../../../helpers/utils/columnSearch/getColumnSeacrhStudent';
import { fetchStudents } from '../../../../store/thunks/studentsThunk';
import { IStudentData } from '../../../../types/Students';
import styles from './StudentsItem.module.scss';
import { useTranslation } from 'react-i18next';

type DataIndex = keyof IStudentData;

const StudentsItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { students, isLoading } = useAppSelector((state) => state.studentsReducer);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    dispatch(
      fetchStudents({
        name: dataIndex === FULL_NAME.eng ? selectedKeys[0] : null,
        phone: dataIndex === PHONE.eng ? selectedKeys[0] : null,
      })
    );
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns: ColumnsType<IStudentData> = [
    {
      title: translate('fullname'),
      dataIndex: FULL_NAME.eng,
      key: FULL_NAME.eng,
      width: '30%',
      ...getColumnSearchStudent({
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
      key: PHONE.rus,
      width: '30%',
      ...getColumnSearchStudent({
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
      title: translate('groups'),
      dataIndex: GROUPS.eng,
      key: GROUPS.rus,
      width: '15%',
      render: (_, record) => (
        <div>
          {record.groups.map((group) => (
            <li key={group.id}>{group.name}</li>
          ))}
        </div>
      ),
    },
    {
      title: translate('balance'),
      dataIndex: BALANCE.eng,
      key: BALANCE.rus,
      width: '15%',
      render: (_, record) => <div>{record.debt}</div>,
    },
    {
      title: translate('status'),
      dataIndex: STATUS.eng,
      key: STATUS.eng,
      width: '10%',
      filterMultiple: false,
      filters: [
        { text: 'Оплатил', value: true },
        { text: 'Не оплатил', value: false },
      ],
      render: (_, record) => (
        <div className={styles.status}>
          {record.status ? (
            <div className={styles.true}></div>
          ) : (
            <div className={styles.false}></div>
          )}
        </div>
      ),
    },
  ];

  const handleTableChange = (
    _: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    dispatch(
      fetchStudents({
        status_id: String(filters.status?.[0]),
      })
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={students.data}
      pagination={false}
      onChange={handleTableChange}
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

export default StudentsItem;
