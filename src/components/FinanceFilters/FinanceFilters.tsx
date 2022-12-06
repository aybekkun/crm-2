import { Button, DatePicker, Form } from 'antd';
import { configDate, dateFormat } from '../../helpers/constants/validateMessages';
import { END_DATE, START_DATE } from '../../helpers/constants/form';
import styles from './FinanceFilters.module.scss';
import { splitNum } from '../../helpers/utils/splitSum';
import { useTranslation } from 'react-i18next';

export interface IFetchFilter {
  start_date: moment.Moment;
  end_date: moment.Moment;
}

interface FinanceFiltersProps<T> {
  onHandleFetchFilter: (value: T) => void;
  total_sum: number;
}

function FinanceFilters<T>({ onHandleFetchFilter, total_sum }: FinanceFiltersProps<T>) {
  const { t: translate } = useTranslation();

  return (
    <div className={styles.filters}>
      <Form
        name="expenses"
        layout="inline"
        onFinish={onHandleFetchFilter}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <Form.Item label={translate('startDate')} name={START_DATE.eng} {...configDate}>
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={translate('endDate')}
          name={END_DATE.eng}
          // rules={[{ required: false, message: 'Пожалуйста укажите дату!' }]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('filter')}
          </Button>
        </Form.Item>
        <h2 className={styles.totalSum}>
          {translate('general')}: {splitNum(total_sum)}
        </h2>
      </Form>
    </div>
  );
}

export default FinanceFilters;
