import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import styles from './Main.module.scss';
import { fetchMain } from './../../store/thunks/mainThunk';
import PieStatistics from '../../components/Statistics/PieStatistics/PieStatistics';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.mainReducer);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchMain({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <NavLink to={'wait'}>
          <div className={`${styles.waits} ${styles.cardHover}`}>
            <h2>
              {data?.waits} <br />
              {translate('wait')}
            </h2>
            <div className={styles.img}></div>
          </div>
        </NavLink>
        <NavLink to={'students'}>
          <div className={`${styles.students} ${styles.cardHover}`}>
            <h2>
              {data?.students} <br />
              {translate('students')}
            </h2>
            <div className={styles.img}></div>
          </div>
        </NavLink>
        <NavLink to={'teachers'}>
          <div className={`${styles.teachers} ${styles.cardHover}`}>
            <h2>
              {data?.teachers} <br />
              {translate('teachers')}
            </h2>
            <div className={styles.img}></div>
          </div>
        </NavLink>
        <NavLink to={'courses'}>
          <div className={`${styles.courses} ${styles.cardHover}`}>
            <h2>
              {data?.courses} <br />
              {translate('courses')}
            </h2>
            <div className={styles.img}></div>
          </div>
        </NavLink>
        <NavLink to={'groups'}>
          <div className={`${styles.groups} ${styles.cardHover}`}>
            <h2>
              {data?.groups} <br />
              {translate('groups')}
            </h2>
            <div className={styles.img}></div>
          </div>
        </NavLink>
      </div>
      <div className={styles.right}>
        <PieStatistics data={data.lead} />
      </div>
    </div>
  );
};

export default Main;
