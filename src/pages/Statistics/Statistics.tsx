import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import DualStatistics from '../../components/Statistics/DualStatistics/DualStatistics';
import PieStatistics from '../../components/Statistics/PieStatistics/PieStatistics';
import StatisticSelect from '../../components/Statistics/StatisticSelect/StatisticSelect';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import {
  fetchFinanceStatistics,
  fetchLeadStatistics,
  fetchStudnetStatistics,
} from './../../store/thunks/statisticsThunk';
import styles from './Statistics.module.scss';
import { useTranslation } from 'react-i18next';

const Statistics = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { students, finance, lead } = useAppSelector((state) => state.statisticsReducer);

  const handleChangeStudents = (value: string) => {
    dispatch(fetchStudnetStatistics({ date: value }));
  };

  const handleChangeFinance = (value: string) => {
    dispatch(fetchFinanceStatistics({ date: value }));
  };

  const handleChangeLead = (value: string) => {
    dispatch(fetchLeadStatistics({ date: value }));
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchStudnetStatistics({ cancelToken: cancelToken.token }));
    dispatch(fetchFinanceStatistics({ cancelToken: cancelToken.token }));
    dispatch(fetchLeadStatistics({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <PageContainer name={translate('statistics')}>
      <div className={styles.top}>
        <div className={styles.stat}>
          <h3>{translate('statisticsOfStudents')}</h3>
          <StatisticSelect handleChange={handleChangeStudents} />
          <DualStatistics data={students} yField={['лид', 'студент']} />
        </div>

        <div className={styles.stat}>
          <h3>{translate('statisticsOfFinance')}</h3>
          <StatisticSelect handleChange={handleChangeFinance} />
          <DualStatistics data={finance} yField={['расход', 'доход']} />
        </div>
      </div>

      <div className={styles.bottom}>
        <h3>{translate('statisticsOfLeads')}</h3>
        <StatisticSelect handleChange={handleChangeLead} />
        <PieStatistics data={lead} />
      </div>
    </PageContainer>
  );
};

export default Statistics;
