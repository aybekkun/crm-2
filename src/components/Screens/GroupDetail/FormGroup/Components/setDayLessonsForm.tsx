import { Form, Input, Select } from 'antd';
import { ChangeEvent, FC } from 'react';
import { monthIndex } from '../../../../../helpers/constants/months';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../helpers/hooks/redux';
import { START_DATE } from '../../../../../helpers/constants/form';
import { startDateConfig } from '../../../../../helpers/constants/validateMessages';

interface ISetDayLessonsFormProps {
  handleChangeWhichDays: (value: 'odd' | 'even') => void;
  handleChangeStartDate: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SetDayLessonsForm: FC<ISetDayLessonsFormProps> = ({
  handleChangeWhichDays,
  handleChangeStartDate,
}) => {
  const { t: translate } = useTranslation();
  const { group } = useAppSelector((state) => state.groupsReducer);

  return (
    <Form
      name="setDayLessons"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 22 }}
      autoComplete="off"
    >
      <Form.Item label={translate('whatDays')}>
        <Select onChange={handleChangeWhichDays}>
          <Select.Option key={'odd'} value={'odd'}>
            {translate('oddDays')}
          </Select.Option>
          <Select.Option key={'even'} value={'even'}>
            {translate('evenDays')}
          </Select.Option>
          {/* <Select.Option key={'all'} value={'all'}>
            {translate('allDays')}
          </Select.Option> */}
        </Select>
      </Form.Item>
      <Form.Item label={translate('startTime')} name={START_DATE.eng} {...startDateConfig}>
        <Input type="date" onChange={handleChangeStartDate} />
      </Form.Item>
      {/* <Form.Item label={translate('month')}>
        <Select onChange={handleChangeMonths} defaultValue={`${group.duration}`}>
          {monthIndex.map((item: string, index: number) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item> */}
    </Form>
  );
};

export default SetDayLessonsForm;
