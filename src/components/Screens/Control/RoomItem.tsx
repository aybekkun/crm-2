import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDeleteName, NAME } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { createRoom, deleteRoom, fetchRooms } from '../../../store/thunks/roomsThunk';
import { IRooms } from '../../../types/Rooms';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import ControlLayout from './Components/ControlLayout';

const RoomItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [roomCount, setRoomCount] = useState<number>(0);
  const { rooms, isLoading } = useAppSelector((state) => state.roomsReducer);

  const onCreateRoom = async (value: string) => {
    await dispatch(createRoom(value));
    setRoomCount((prev) => prev + 1);
  };

  const onDeleteRoom = async (id: number) => {
    await dispatch(deleteRoom(id));
    setRoomCount((prev) => prev + 1);
  };

  const columns: ColumnsType<IRooms> = [
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
        <>
          <DeleteBtn
            onDeleteBtn={onDeleteRoom}
            id={record.id}
            title={getDeleteName(translate('room'))}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchRooms({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [roomCount, dispatch]);

  return (
    <ControlLayout
      onCreate={onCreateRoom}
      columns={columns}
      name={translate('room')}
      data={rooms?.data}
      isLoading={isLoading}
    />
  );
};

export default RoomItem;
