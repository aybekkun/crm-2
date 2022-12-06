import { Button, Drawer, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { CREATE, getEditName, NAME, TEACHER_ID } from '../../../helpers/constants/form';
import {
  courseConfig,
  nameConfig,
  teacherConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { groupsSlice } from '../../../store/slices/groupsSlice';
import { createGroup, updateGroup } from '../../../store/thunks/groupsThunk';
import { ICourseData } from '../../../types/Courses';
import { IGroupsForm } from '../../../types/Groups';
import { ITeacherData } from '../../../types/Teachers';
import { getCreateName, COURSE_ID } from '../../../helpers/constants/form';
import { modalSlice } from './../../../store/slices/modalSlice';
import { countSlice } from './../../../store/slices/countSlice';
import { useTranslation } from 'react-i18next';

const GroupsForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { form: groupForm } = useAppSelector((state) => state.groupsReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { teachers } = useAppSelector((state) => state.teachersReducer);
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setResetFormGroups } = groupsSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreate = async (values: IGroupsForm) => {
    dispatch(setModal(false));
    if (status === CREATE) {
      await dispatch(createGroup(values));
    } else {
      await dispatch(
        updateGroup({
          id: groupForm.id,
          ...values,
        })
      );
    }
    dispatch(setCount(1));
    dispatch(setResetFormGroups());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormGroups());
  };

  useEffect(() => {
    form.setFieldsValue({
      name: groupForm.name,
      course_id: groupForm.course_id,
      teacher_id: groupForm.teacher_id,
    });
  }, [form, groupForm]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={
        status === 'CREATE' ? getCreateName(translate('group')) : getEditName(translate('group'))
      }
      width={500}
    >
      <Form
        form={form}
        name="groupForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreate}
        autoComplete="off"
      >
        <Form.Item label={translate('name')} name={NAME.eng} {...nameConfig}>
          <Input />
        </Form.Item>

        <Form.Item name={TEACHER_ID.eng} label={translate('teacher')} {...teacherConfig}>
          <Select placeholder="Пожалуйста выберите учитель">
            {teachers.data.map((item: ITeacherData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name={COURSE_ID.eng} label={translate('course')} {...courseConfig}>
          <Select placeholder="Пожалуйста выберите курс">
            {courses.data.map((item: ICourseData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
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

export default GroupsForm;
