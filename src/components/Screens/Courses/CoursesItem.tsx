import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useTranslation } from 'react-i18next';
import {
  DURATION,
  EDIT,
  getDeleteName,
  getEditName,
  NAME,
  PRICE,
} from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { splitNum } from '../../../helpers/utils/splitSum';
import { coursesSlice } from '../../../store/slices/coursesSlice';
import { deleteCourse } from '../../../store/thunks/coursesThunk';
import { ICourseData, ICoursesForm } from '../../../types/Courses';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import EditBtn from '../../Buttons/EditBtn/EditBtn';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';
import { statusSlice } from './../../../store/slices/statusSlice';

const CoursesItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { setFormCourses } = coursesSlice.actions;
  const { setStatus } = statusSlice.actions;
  const { setCount } = countSlice.actions;
  const { setModal } = modalSlice.actions;
  const { courses, isLoading } = useAppSelector((state) => state.coursesReducer);

  const onEditCourse = (obj: ICoursesForm) => {
    dispatch(setFormCourses(obj));
    dispatch(setModal(true));
    dispatch(setStatus(EDIT));
  };

  const onDeleteCourse = async (id: number) => {
    await dispatch(deleteCourse(id));
    dispatch(setCount(1));
  };

  const columns: ColumnsType<ICourseData> = [
    {
      title: translate('name'),
      dataIndex: NAME.eng,
      key: NAME.eng,
      width: '20%',
    },
    {
      title: translate('price'),
      dataIndex: PRICE.eng,
      key: PRICE.eng,
      width: '15%',
      render: (_, record) => <div>{splitNum(record.price)}</div>,
    },
    {
      title: translate('duration'),
      dataIndex: DURATION.eng,
      key: DURATION.eng,
      width: '15%',
    },
    {
      title: translate('action'),
      dataIndex: '',
      key: 'x',
      width: '15%',
      render: (_, record) => (
        <>
          <EditBtn onEditBtn={onEditCourse} record={record} title={getEditName('курса')} />
          <DeleteBtn onDeleteBtn={onDeleteCourse} id={record.id} title={getDeleteName('курс')} />
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses.data}
      pagination={false}
      loading={isLoading ? true : false}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default CoursesItem;
