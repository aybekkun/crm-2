import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDeleteName, NAME } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { createTime, deleteTime, fetchTime } from '../../../store/thunks/timeThunk';
import { ITime } from '../../../types/Time';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import ControlLayout from './Components/ControlLayout';

const TimeItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [timeCount, setTimeCount] = useState<number>(0);
  const { time, isLoading } = useAppSelector((state) => state.timeReducer);

  const onCreateTime = async (value: string) => {
    await dispatch(createTime(value));
    setTimeCount((prev) => prev + 1);
  };

  const onDeleteTime = async (id: number) => {
    await dispatch(deleteTime(id));
    setTimeCount((prev) => prev + 1);
  };

  const columns: ColumnsType<ITime> = [
    {
      title: translate('name'),
      dataIndex: NAME.eng,
      key: NAME.eng,
      width: '80%',
    },
    {
      title: translate('action'),
      dataIndex: '',
      key: 'x',
      width: '20%',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DeleteBtn
            onDeleteBtn={onDeleteTime}
            id={record.id}
            title={getDeleteName(translate('time'))}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchTime({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [timeCount, dispatch]);

  return (
    <ControlLayout
      onCreate={onCreateTime}
      columns={columns}
      name={translate('time')}
      data={time?.data}
      isLoading={isLoading}
    />
  );
};

export default TimeItem;
