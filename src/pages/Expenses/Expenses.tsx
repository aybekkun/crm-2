import { Button, Pagination } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import FinanceFilters, { IFetchFilter } from '../../components/FinanceFilters/FinanceFilters';
import ExpenseForm from '../../components/Screens/Expenses/ExpensesForm';
import ExpensesItem from '../../components/Screens/Expenses/ExpensesItem';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { expensesSlice } from '../../store/slices/expensesSlice';
import { fetchExpenses } from '../../store/thunks/expensesThunk';
import { dateFormat } from '../../helpers/constants/validateMessages';
import { countSlice } from './../../store/slices/countSlice';
import { modalSlice } from './../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';

const Expenses = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { expenses, page, isLoading } = useAppSelector((state) => state.expensesReducer);
  const { count } = useAppSelector((state) => state.countReducer);
  const { setPageExpenses } = expensesSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreateExpense = () => {
    dispatch(setModal(true));
  };

  const handleChange = (page: number) => {
    dispatch(setPageExpenses(page));
  };

  const onHandleFetchFilter = (values: IFetchFilter) => {
    const sendValues = {
      start_date: values['start_date'].format(dateFormat),
      end_date: values['end_date'] ? values['end_date'].format(dateFormat) : '',
    };
    dispatch(
      fetchExpenses({
        page: 1,
        limit: 10,
        start_date: sendValues.start_date,
        end_date: sendValues.end_date,
      })
    );
    dispatch(setCount);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchExpenses({ page: page, limit: 10, cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch, count, page]);

  return (
    <PageContainer name={translate('expenses')}>
      <FinanceFilters onHandleFetchFilter={onHandleFetchFilter} total_sum={expenses.total_sum} />
      <Button type="primary" onClick={onHandleCreateExpense}>
        {translate('addBtn')}
      </Button>

      <ExpensesItem expenses={expenses.data} isLoading={isLoading} />
      <ExpenseForm />
      <Pagination
        total={expenses.total}
        defaultCurrent={page}
        onChange={handleChange}
        pageSize={10}
        className="pagination"
      />
    </PageContainer>
  );
};

export default Expenses;
