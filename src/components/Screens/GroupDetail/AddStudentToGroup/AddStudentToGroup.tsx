import { Button, DatePicker, Drawer, Form, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { START_DATE } from '../../../../helpers/constants/form';
import {
  dateFormat,
  startTimeConfig,
  studentsConfig,
} from '../../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../../helpers/hooks/redux';
import { countSlice } from '../../../../store/slices/countSlice';
import { studentsSlice } from '../../../../store/slices/studentsSlice';
import { addStudentToGroup } from '../../../../store/thunks/studentsThunk';
import { IStudentData } from '../../../../types/Students';
import { fetchStudents } from './../../../../store/thunks/studentsThunk';

const AddStudentToGroup = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { form: studentForm, modal } = useAppSelector((state) => state.studentsReducer);
  const { students } = useAppSelector((state) => state.studentsReducer);
  const { setModalStudents, setResetFormStudents } = studentsSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreate = async (values: {
    student_id: number;
    start_date: string | moment.Moment;
  }) => {
    const sendValues = {
      group_id: id,
      ...values,
      // start_date: values.start_date
      //   ? (values['start_date'] as moment.Moment).format(dateFormat)
      //   : '',
    };

    await dispatch(addStudentToGroup(sendValues));
    dispatch(setCount(1));
    dispatch(setModalStudents(false));
    dispatch(setResetFormStudents());
  };

  const onClose = () => {
    dispatch(setModalStudents(false));
    dispatch(setResetFormStudents());
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchStudents({ cancelToken: cancelToken.token }));
    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <Drawer visible={modal} onClose={onClose} title="Добавить студента" width={500}>
      <Form
        form={form}
        name="studentForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreate}
        autoComplete="off"
      >
        <Form.Item name="student_id" label={translate('student')} {...studentsConfig}>
          <Select placeholder="Пожалуйста выберите учитель">
            {students.data.map((item: IStudentData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {/* <Form.Item label={translate('startDate')} name={START_DATE.eng} {...startTimeConfig}>
          <DatePicker format={dateFormat} />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('addBtn')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddStudentToGroup;
