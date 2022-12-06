import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDeleteName, NAME } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { createLead, deleteLead, fetchLead } from '../../../store/thunks/leadThunk';
import { ILead } from '../../../types/Lead';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import ControlLayout from './Components/ControlLayout';

const LeadItem = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [leadCount, setLeadCount] = useState<number>(0);
  const { lead, isLoading } = useAppSelector((state) => state.leadReducer);

  const onCreateLead = async (value: string) => {
    await dispatch(createLead(value));
    setLeadCount((prev) => prev + 1);
  };

  const onDeleteLead = async (id: number) => {
    await dispatch(deleteLead(id));
    setLeadCount((prev) => prev + 1);
  };

  const columns: ColumnsType<ILead> = [
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
            onDeleteBtn={onDeleteLead}
            id={record.id}
            title={getDeleteName(translate('lead'))}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchLead({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [leadCount, dispatch]);

  return (
    <ControlLayout
      onCreate={onCreateLead}
      columns={columns}
      name={translate('lead')}
      data={lead?.data}
      isLoading={isLoading}
    />
  );
};

export default LeadItem;
