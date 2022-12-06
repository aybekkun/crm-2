import { Divider } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import PageContainer from '../../components/commons/PageContainer/PageContainer';
import { lessonDays } from '../../helpers/constants/lessons';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { fetchRooms } from '../../store/thunks/roomsThunk';
import { fetchLessons } from './../../store/thunks/lessonsThunk';
import styles from './Lessons.module.scss';
import { useTranslation } from 'react-i18next';

const Lessons = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { lessons } = useAppSelector((state) => state.lessonsReducer);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchRooms({ cancelToken: cancelToken.token }));
    dispatch(fetchLessons({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <PageContainer name={translate('timeTable')}>
      <div className={styles.lessonTable}>
        <ul className={styles.lessonDays}>
          {lessonDays.map((item) => {
            return (
              <li key={item}>
                <b>{item}</b>
              </li>
            );
          })}
        </ul>

        <ul className={styles.rooms}>
          {lessons?.map((item) => {
            return (
              <>
                <Divider />
                <ul key={item.room_id} className={styles.lesson}>
                  <>
                    <li className={styles.roomName}>{item.room_name}</li>
                    {item.days.map((day, index) => {
                      return (
                        <>
                          {day.map((lesson) => {
                            return (
                              <ul key={lesson.id + index} className={styles.group}>
                                <li key={lesson.id} className={styles.groupName}>
                                  {lesson.group_name}
                                </li>
                                <li>
                                  <span key={lesson.id} className={styles.groupName}>
                                    {lesson.start_time}
                                  </span>
                                  <span key={lesson.id} className={styles.groupName}>
                                    {lesson.end_time}
                                  </span>
                                </li>
                              </ul>
                            );
                          })}
                        </>
                      );
                    })}
                  </>
                </ul>
              </>
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default Lessons;
