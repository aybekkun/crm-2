import { Col, Row } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardGroup from '../../components/Card/CardGroups/CardGroups';
import CardInfo from '../../components/Card/CardInfo/CardInfo';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import TeachersForm from '../../components/Screens/Teachers/TeachersForm';
import { EDIT } from '../../helpers/constants/form';
import { TEACHERS } from '../../helpers/constants/routes';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { teachersSlice } from '../../store/slices/teachersSlice';
import { deleteTeacher, fetchOneTeacher } from '../../store/thunks/teachersThunk';
import ExpensesItem from './../../components/Screens/Expenses/ExpensesItem';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { ITeacherOneData, ITeachersForm } from './../../types/Teachers';
import styles from './TeacherDetail.module.scss';
import { useTranslation } from 'react-i18next';

const TeacherDetail = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { teacher, page, isLoading } = useAppSelector((state) => state.teachersReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setFormTeachers } = teachersSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setStatus } = statusSlice.actions;

  const onEditStudent = (obj: ITeachersForm) => {
    dispatch(setFormTeachers(obj));
    dispatch(setModal(true));
    dispatch(setStatus(EDIT));
  };

  const onDeleteStudent = (id: number) => {
    dispatch(deleteTeacher(id));
    navigate(TEACHERS);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchOneTeacher({ id, cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [page, count, dispatch, id]);

  return (
    <PageContainer name={teacher?.name}>
      <Row className={styles.row}>
        <Col span={7}>
          <CardInfo
            data={teacher as ITeacherOneData}
            onDelete={onDeleteStudent}
            onEdit={onEditStudent}
            isLoading={isLoading}
          />
          <CardGroup title={translate('groups')} isLoading={isLoading} data={teacher?.groups} />
        </Col>
        <Col span={17}>
          <div>
            <ExpensesItem expenses={teacher?.salaries} isLoading={isLoading} />
          </div>
        </Col>
      </Row>
      <TeachersForm />
    </PageContainer>
  );
};

export default TeacherDetail;
