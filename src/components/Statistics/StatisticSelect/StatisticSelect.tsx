import { Select } from 'antd';
import { FC } from 'react';

interface IStatisticSelectProps {
  handleChange: (value: string) => void;
}

const StatisticSelect: FC<IStatisticSelectProps> = ({ handleChange }) => {
  return (
    <Select defaultValue="last_month" style={{ width: 120 }} onChange={handleChange}>
      <Select.Option value="last_week">Неделя</Select.Option>
      <Select.Option value="last_month">Месяц</Select.Option>
      <Select.Option value="current_year">Год</Select.Option>
    </Select>
  );
};

export default StatisticSelect;
