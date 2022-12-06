import { DatePicker, DatePickerProps, Popover } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../../../helpers/hooks/redux';
import { countSlice } from '../../../../../../store/slices/countSlice';
import { updateLesson } from '../../../../../../store/thunks/lessonsThunk';
import { ILessonsGroup } from '../../../../../../types/Groups';
import styles from './LessonsHeader.module.scss';

interface ILessonsHeaderProps {
  data: ILessonsGroup[] | undefined;
}

const LessonsHeader: FC<ILessonsHeaderProps> = ({ data }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [id, setId] = useState(1);
  const { setCount } = countSlice.actions;

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    dispatch(updateLesson({ id, day: dateString }));
    dispatch(setCount(1));
  };

  const content = (
    <div>
      <DatePicker onChange={onChange} />
    </div>
  );
  return (
    <ul className={styles.headers}>
      <li className={styles.name}>
        <b>{translate('fullname')}</b>
      </li>
      <li className={styles.phone}>
        <b>{translate('phone')}</b>
      </li>
      <li className={styles.actions}>
        <b>Деиствия</b>
      </li>
      {data?.map((item) => {
        return (
          <li key={item.id} className={styles.lesson}>
            <Popover content={content} title={item.day_name} trigger="click">
              <b className={styles.dayName} onClick={() => setId(item.id)}>
                {item.day_name}
              </b>
            </Popover>
          </li>
        );
      })}
    </ul>
  );
};

export default LessonsHeader;
