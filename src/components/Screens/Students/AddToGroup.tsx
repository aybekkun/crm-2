import { Button, DatePicker, Drawer, Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CREATE, getCreateName, getEditName, START_DATE } from '../../../helpers/constants/form';
import {
  dateFormat,
  groupConfig,
  startTimeConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { studentsSlice } from '../../../store/slices/studentsSlice';
import { addStudentToGroup } from '../../../store/thunks/studentsThunk';
import { countSlice } from './../../../store/slices/countSlice';

const AddToGroup = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const { addToGroupModal, student } = useAppSelector((state) => state.studentsReducer);
  const { groups } = useAppSelector((state) => state.groupsReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setResetFormStudents, setAddToGroupModal } = studentsSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreate = async (values: {
    group_id: string;
    start_date: string | moment.Moment;
  }) => {
    const sendValues = {
      student_id: student!.id,
      ...values,
      start_date: values.start_date
        ? (values['start_date'] as moment.Moment).format(dateFormat)
        : '',
    };
    await dispatch(addStudentToGroup(sendValues));

    dispatch(setCount(1));
    dispatch(setAddToGroupModal(false));
    dispatch(setResetFormStudents());
  };

  const onClose = () => {
    dispatch(setAddToGroupModal(false));
    dispatch(setResetFormStudents());
  };

  return (
    <Drawer
      visible={addToGroupModal}
      onClose={onClose}
      title={
        status === CREATE ? getCreateName(translate('student')) : getEditName(translate('student'))
      }
      width={500}
    >
      <Form
        form={form}
        name="studentForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreate}
        autoComplete="off"
      >
        <Form.Item name="group_id" label={translate('groups')} {...groupConfig}>
          <Select placeholder="Пожалуйста выберите группу">
            {groups.data.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label={translate('startDate')} name={START_DATE.eng} {...startTimeConfig}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('addBtn')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddToGroup;
