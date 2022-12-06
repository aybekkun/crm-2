import { Button, Form, Input, Select } from 'antd';
import { FC } from 'react';
import { endTimeConfig, startTimeConfig } from '../../../../../helpers/constants/validateMessages';
import { IRooms } from '../../../../../types/Rooms';
import { START_TIME, END_TIME, ROOM_ID } from '../../../../../helpers/constants/form';
import { useTranslation } from 'react-i18next';

export interface ICreateLessons {
  start_date: string | moment.Moment;
  start_time: moment.Moment | string;
  end_time: moment.Moment | string;
  room_id: number;
  type: 'odd' | 'even';
}

interface ISetLessonsFormProps {
  handleCreateLessons: (value: ICreateLessons) => void;
  rooms: IRooms[] | undefined;
}

const SetLessonsForm: FC<ISetLessonsFormProps> = ({ handleCreateLessons, rooms }) => {
  const { t: translate } = useTranslation();
  return (
    <Form
      name="setLessonsForm"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 22 }}
      onFinish={handleCreateLessons}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label={translate('startTime')} name={START_TIME.eng} {...startTimeConfig}>
        <Input type="time" />
      </Form.Item>

      <Form.Item label={translate('endTime')} name={END_TIME.eng} {...endTimeConfig}>
        <Input type="time" />
      </Form.Item>

      <Form.Item name={ROOM_ID.eng} label={translate('room')} rules={[{ required: true }]}>
        <Select placeholder="Пожалуйста выберите кабинет">
          {rooms?.map((item: IRooms) => {
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
  );
};

export default SetLessonsForm;
