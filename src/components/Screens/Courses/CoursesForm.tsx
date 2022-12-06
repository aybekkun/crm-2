import { Button, Drawer, Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CREATE,
  DURATION,
  getCreateName,
  getEditName,
  NAME,
  PRICE,
} from '../../../helpers/constants/form';
import {
  durationConfig,
  nameConfig,
  priceConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { coursesSlice } from '../../../store/slices/coursesSlice';
import { createCourse, updateCourse } from '../../../store/thunks/coursesThunk';
import { ICoursesForm } from '../../../types/Courses';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';

const CourseForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { form: courseForm } = useAppSelector((state) => state.coursesReducer);
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setResetFormCourses } = coursesSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreate = async (values: ICoursesForm) => {
    dispatch(setModal(false));
    if (status === CREATE) {
      await dispatch(
        createCourse({
          name: values.name,
          price: +values.price,
          duration: +values.duration,
        })
      );
    } else {
      await dispatch(
        updateCourse({
          id: courseForm.id,
          name: values.name,
          price: +values.price,
          duration: +values.duration,
        })
      );
    }
    dispatch(setCount(1));
    dispatch(setResetFormCourses());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormCourses());
  };

  useEffect(() => {
    form.setFieldsValue({
      name: courseForm.name,
      price: courseForm.price,
      duration: courseForm.duration,
    });
  }, [form, courseForm]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={
        status === CREATE ? getCreateName(translate('course')) : getEditName(translate('course'))
      }
      width={500}
    >
      <Form
        form={form}
        name="course"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreate}
        autoComplete="off"
      >
        <Form.Item label={translate('name')} name={NAME.eng} {...nameConfig}>
          <Input />
        </Form.Item>
        <Form.Item label={translate('price')} name={PRICE.eng} {...priceConfig}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: string | undefined) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '200px' }}
          />
        </Form.Item>

        <Form.Item label={translate('duration')} name={DURATION.eng} {...durationConfig}>
          <InputNumber
            defaultValue={1}
            min={0}
            max={24}
            formatter={(value) => `${value}`}
            style={{ width: '200px' }}
          />
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

export default CourseForm;
