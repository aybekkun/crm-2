import { Button, Col, Row, Tabs } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardGroup from '../../components/Card/CardGroups/CardGroups';
import CardStudent from '../../components/Card/CardInfo/CardInfo';
import PaymentsForm from '../../components/Screens/Payments/PaymentsForm';
import PaymentsItem from '../../components/Screens/Payments/PaymentsItem';
import StudentsForm from '../../components/Screens/Students/StudentsFrom';
import { paymentsSlice } from '../../store/slices/paymentsSlice';
import { studentsSlice } from '../../store/slices/studentsSlice';
import { fetchOneStudent } from '../../store/thunks/studentsThunk';
import { IPaymentsForm } from '../../types/Payments';
import { IStudentData, IStudentsForm } from '../../types/Students';
import { CREATE, EDIT } from '../../helpers/constants/form';
import { STUDENTS } from '../../helpers/constants/routes';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import PageContainer from './../../components/commons/PageContainer/PageContainer';
import { modalSlice } from './../../store/slices/modalSlice';
import { statusSlice } from './../../store/slices/statusSlice';
import { deleteStudent } from './../../store/thunks/studentsThunk';
import styles from './StudentsDetail.module.scss';
import { useTranslation } from 'react-i18next';
import AddToGroup from '../../components/Screens/Students/AddToGroup';
import DiscountsForm from '../../components/Screens/Discounts/DiscountsForm';
import { discountsSlice } from '../../store/slices/discountsSlice';
import DiscountsItem from '../../components/Screens/Discounts/DiscountsItem';

const StudentsDetail = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { student, page, isLoading } = useAppSelector((state) => state.studentsReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setFormStudents, setModalStudents } = studentsSlice.actions;
  const { setFormPayments } = paymentsSlice.actions;
  const { setStatus } = statusSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setDiscountModal } = discountsSlice.actions;

  const onHandleCreatePayment = () => {
    dispatch(setModal(true));
    dispatch(setStatus(CREATE));
  };

  const onHandleCreateDiscounts = () => {
    dispatch(setDiscountModal(true));
  };

  const onReturnPayment = (obj: IPaymentsForm) => {
    dispatch(setFormPayments(obj));
    dispatch(setModal(true));
    dispatch(setStatus(EDIT));
  };

  const onEditStudent = (obj: IStudentsForm) => {
    dispatch(setFormStudents(obj));
    dispatch(setModalStudents(true));
    dispatch(setStatus(EDIT));
  };

  const onDeleteStudent = (id: number) => {
    dispatch(deleteStudent(id));
    navigate(STUDENTS);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchOneStudent({ id: id as string, cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [page, count, dispatch, id]);

  return (
    <PageContainer name={`${student?.name}`}>
      <Row className={styles.row}>
        <Col span={7}>
          <CardStudent
            data={student as IStudentData}
            isLoading={isLoading}
            onDelete={onDeleteStudent}
            onEdit={onEditStudent}
          />
          <CardGroup data={student?.groups} title={translate('groups')} isLoading={isLoading} />
        </Col>
        <Col span={17}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Оплата" key="1">
              <Button
                onClick={onHandleCreatePayment}
                className={styles.paymentBtn}
                type="primary"
                size="large"
              >
                {translate('paymentBtn')}
              </Button>
              <PaymentsItem
                item={student?.payments}
                isLoading={isLoading}
                onReturnPayment={onReturnPayment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Скидка" key="2">
              <Button onClick={onHandleCreateDiscounts} type="primary" size="large">
                {translate('discountBtn')}
              </Button>
              <DiscountsItem id={student?.id} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
      <PaymentsForm student_id={student?.id} groups={student?.groups} />
      <DiscountsForm student_id={student?.id} />
      <StudentsForm />
      <AddToGroup />
    </PageContainer>
  );
};

export default StudentsDetail;
