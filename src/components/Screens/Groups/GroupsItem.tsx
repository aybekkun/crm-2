import { InputRef, Table } from 'antd';
import { ColumnsType, FilterConfirmProps } from 'antd/lib/table/interface';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { COURSE_NAME, CURRENT_LESSON, NAME, TEACHER_NAME } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { getColumnSearchGroup } from '../../../helpers/utils/columnSearch/getColumnSearchGroup';
import { fetchGroups } from '../../../store/thunks/groupsThunk';
import { IGroupData } from '../../../types/Groups';

type DataIndex = keyof IGroupData;

const GroupsItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { teachers } = useAppSelector((state) => state.teachersReducer);
  const { groups, isLoading } = useAppSelector((state) => state.groupsReducer);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    dispatch(
      fetchGroups({
        name: dataIndex === 'name' ? selectedKeys[0] : null,
      })
    );
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns: ColumnsType<IGroupData> = [
    {
      title: translate('name'),
      dataIndex: NAME.eng,
      key: NAME.eng,
      width: '30%',
      ...getColumnSearchGroup({
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
      title: translate('course'),
      dataIndex: COURSE_NAME.eng,
      key: COURSE_NAME.eng,
      width: '30%',
      filterMultiple: false,
      filters: courses.data.map((item) => {
        return { text: item.name, value: item.id };
      }),
    },
    {
      title: translate('teacher'),
      dataIndex: TEACHER_NAME.eng,
      key: TEACHER_NAME.eng,
      width: '25%',
      filterMultiple: false,
      filters: teachers.data.map((item) => {
        return { text: item.name, value: item.id };
      }),
    },
    {
      title: translate('currentLesson'),
      dataIndex: CURRENT_LESSON.eng,
      key: CURRENT_LESSON.eng,
      width: '15%',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={groups.data}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`${record.id}`);
          },
        };
      }}
      loading={!!isLoading}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default GroupsItem;
