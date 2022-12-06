import { Col, Row, Statistic } from 'antd';
import axios from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Calendar, DateObject, Value } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';
import { dateFormat } from '../../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../../helpers/hooks/redux';
import { countSlice } from '../../../../store/slices/countSlice';
import { createLessons } from '../../../../store/thunks/groupsThunk';
import { fetchRooms } from '../../../../store/thunks/roomsThunk';
import SetDayLessonsForm from './Components/setDayLessonsForm';
import SetLessonsForm, { ICreateLessons } from './Components/SetLessonsForm';
import { useTranslation } from 'react-i18next';

interface IFormGroupProps {
  id: string | undefined;
}

const FormGroup: FC<IFormGroupProps> = ({ id }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { group } = useAppSelector((state) => state.groupsReducer);
  const [values, setValues] = useState<Value | undefined>([]);
  const [whichDays, setWhichDays] = useState<'odd' | 'even'>('odd');
  const [startDate, setStartDate] = useState<string>('');
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const { setCount } = countSlice.actions;

  console.log(startDate);

  const handleCreateLessons = async (value: ICreateLessons) => {
    // const days = (values as DateObject[]).map((item: DateObject) => item.format(dateFormat));
    console.log(startDate, id, value.start_time, value.end_time, value.room_id, whichDays);
    await dispatch(
      createLessons({
        start_date: startDate,
        group_id: id,
        start_time: value.start_time,
        end_time: value.end_time,
        room_id: value.room_id,
        type: whichDays,
      })
    );
    dispatch(setCount(1));
  };

  const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleChangeWhichDays = (value: 'odd' | 'even') => {
    setWhichDays(value);
  };

  // const getDaysOfCalendar = (): Value => {
  //   const days: Value[] = [];
  //   let count = 0;

  //   for (let i = 0; i < +months; i++) {
  //     let today = new DateObject().add(i, 'month').day;
  //     const lastDay = new DateObject().add(i, 'month').toLastOfMonth().day;
  //     if (i !== 0) {
  //       today = 1;
  //     }
  //     const leng = lastDay - today + 1;
  //     count += leng;
  //   }

  //   for (let i = 0; i < count; i++) {
  //     days.push(new DateObject().add(i, 'day'));
  //   }

  //   const result: Value | Value[] = days.filter((day) => {
  //     if (whichDays === 'odd') {
  //       const isWeekend = [1, 3, 5].includes((day as DateObject)?.weekDay.index);

  //       if (isWeekend) return day;
  //     } else if (whichDays === 'even') {
  //       const isWeekend = [2, 4, 6].includes((day as DateObject)?.weekDay.index);

  //       if (isWeekend) return day;
  //     } else {
  //       const isWeekend = [1, 2, 3, 4, 5, 6].includes((day as DateObject)?.weekDay.index);
  //       if (isWeekend) return day;
  //     }
  //   });
  //   return result as Value;
  // };

  // useEffect(() => {
  //   setValues(getDaysOfCalendar());
  // }, [whichDays, months]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchRooms({ cancelToken: cancelToken.token }));
    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col span={8}>
          <SetLessonsForm rooms={rooms?.data} handleCreateLessons={handleCreateLessons} />
        </Col>

        <Col span={8}>
          <SetDayLessonsForm
            handleChangeStartDate={handleChangeStartDate}
            handleChangeWhichDays={handleChangeWhichDays}
          />
        </Col>
      </Row>
      {/* <Col>
        <Col span={12}>
          <Statistic
            title={translate('numberOfLessons')}
            value={(values as string[]).length}
            suffix={`/ ${+months * 12}`}
          />
        </Col>

        <Calendar
          numberOfMonths={+months}
          weekStartDayIndex={1}
          multiple
          sort
          value={values}
          onChange={setValues}
          plugins={[<DatePanel key={1} sort="date" />, weekends([0])]}
        />
      </Col> */}
    </>
  );
};

export default FormGroup;
