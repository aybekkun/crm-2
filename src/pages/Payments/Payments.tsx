import { Pagination } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import PaymentsItem from '../../components/Screens/Payments/PaymentsItem';
import { paymentsSlice } from '../../store/slices/paymentsSlice';
import { fetchPayments } from '../../store/thunks/paymentsThunk';
import { dateFormat } from '../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import FinanceFilters, { IFetchFilter } from './../../components/FinanceFilters/FinanceFilters';
import { useTranslation } from 'react-i18next';

const Payments = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { payments, page, isLoading } = useAppSelector((state) => state.paymentsReducer);
  const { setPagePayments } = paymentsSlice.actions;

  const onHandleFetchFilter = (values: IFetchFilter) => {
    const sendValues = {
      start_date: values['start_date'].format(dateFormat),
      end_date: values['end_date'] ? values['end_date'].format(dateFormat) : '',
    };
    dispatch(
      fetchPayments({
        page: 1,
        limit: 10,
        start_date: sendValues.start_date,
        end_date: sendValues.end_date,
      })
    );
  };

  const handleChange = (page: number) => {
    dispatch(setPagePayments(page));
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchPayments({ page: page, limit: 10, cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch, page]);

  return (
    <PageContainer name={translate('payments')}>
      <FinanceFilters onHandleFetchFilter={onHandleFetchFilter} total_sum={payments.total_sum} />
      <PaymentsItem item={payments.data} isLoading={isLoading} />
      <Pagination
        total={payments.total}
        defaultCurrent={page}
        onChange={handleChange}
        pageSize={10}
        className="pagination"
      />
    </PageContainer>
  );
};

export default Payments;
