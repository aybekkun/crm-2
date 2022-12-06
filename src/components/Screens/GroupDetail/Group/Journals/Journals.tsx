import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Popconfirm,
  Popover,
  Tooltip,
  Typography,
} from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateObject } from 'react-multi-date-picker';
import { dateFormat } from '../../../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../../../helpers/hooks/redux';
import { ILessonsGroup, IStudentsGroup } from '../../../../../types/Groups';
import styles from './Journal.module.scss';
import { updateStatusStudent } from './../../../../../store/thunks/studentsThunk';
import { useParams } from 'react-router-dom';
import { countSlice } from '../../../../../store/slices/countSlice';
import cnBind from 'classnames/bind';

const { Text, Title } = Typography;

const cx = cnBind.bind(styles);

interface IJournalsProps {
  data: IStudentsGroup[];
  isLoading: boolean;
  handleFetchJournals: (student_id: number, lesson_id: number, check: number) => void;
}

interface ITooltipStudentProps {
  freezed_at: string;
  actived_at: string;
  balance: number;
}

const Journals: FC<IJournalsProps> = ({ data, isLoading, handleFetchJournals }) => {
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.loginReducer);
  const today = new DateObject().format(dateFormat);
  const dispatch = useAppDispatch();
  const [activateDate, setActivateDate] = useState<string>('');
  const [freezeDate, setFreezeDate] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const params = useParams();
  const { setCount } = countSlice.actions;

  const handleActivateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setActivateDate(dateString);
  };

  const handleFreezeChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFreezeDate(dateString);
  };

  const activateContent = (
    <div>
      <DatePicker onChange={handleActivateChange} />
      <br />
      <Button
        type="primary"
        className={styles.actionBtn}
        onClick={() => {
          dispatch(
            updateStatusStudent({
              student_id: userId,
              group_id: params.id,
              status: 'active',
              start_date: activateDate,
            })
          );
          dispatch(setCount(1));
        }}
      >
        OK
      </Button>
    </div>
  );

  const freezeContent = (
    <div>
      <DatePicker onChange={handleFreezeChange} />
      <br />
      <Button
        type="primary"
        className={styles.actionBtn}
        onClick={() => {
          dispatch(
            updateStatusStudent({
              student_id: userId,
              group_id: params.id,
              status: 'frozen',
              start_date: freezeDate,
            })
          );
          dispatch(setCount(1));
        }}
      >
        OK
      </Button>
    </div>
  );

  const tooltipStudent = ({ freezed_at, actived_at, balance }: ITooltipStudentProps) => {
    return (
      <ul className={cx('tooltip-student')}>
        <li>
          <p className={cx('title')}>Дата активиции</p>
          <p className={cx('description')}>{actived_at}</p>
        </li>
        <li>
          <p className={cx('title')}>Дата замарозки</p>
          <p className={cx('description')}>{freezed_at}</p>
        </li>

        <li>
          <p className={cx('title')}>Баланс</p>
          <p className={cx('description')}>{balance}</p>
        </li>
      </ul>
    );
  };

  return (
    <>
      {data.map((item: IStudentsGroup) => {
        return (
          <>
            <Divider style={{ margin: '10px' }} />
            <ul key={item.id} className={styles.headers}>
              <li className={styles.name}>
                <Tooltip
                  placement="right"
                  color="white"
                  title={() =>
                    tooltipStudent({
                      freezed_at: item.freezed_at,
                      actived_at: item.actived_at,
                      balance: item.balance,
                    })
                  }
                >
                  <span
                    className={cx('debt', {
                      'debt-true': item.debt === true,
                      'debt-false': item.debt === false,
                    })}
                  ></span>
                  {item.name}
                </Tooltip>
              </li>
              <li
                className={cx('phone', {
                  'active-student': item.status === 'active',
                  'wait-student': item.status === 'wait',
                  'frozen-student': item.status === 'frozen',
                })}
              >
                {item.phone}
              </li>
              {user?.role !== 'teacher' ? (
                <li className={styles.actions}>
                  <Popover content={activateContent} title="Активировать?" trigger="click">
                    <button
                      disabled={item.status !== 'active' ? false : true}
                      className={cx('actions-btn')}
                    >
                      <CheckOutlined onClick={() => setUserId(item.id)} />
                    </button>
                  </Popover>

                  <Popover content={freezeContent} title="Замарозить?" trigger="click">
                    <button
                      className={cx('actions-btn')}
                      disabled={item.status === 'active' ? false : true}
                    >
                      <StopOutlined onClick={() => setUserId(item.id)} />
                    </button>
                  </Popover>
                </li>
              ) : (
                ''
              )}

              {item.lessons.map((lesson: ILessonsGroup) => {
                return (
                  <li key={lesson.id} className={styles.lesson}>
                    {lesson.check === 1 ? (
                      <Popconfirm
                        disabled={
                          (user?.role === 'teacher' && today === lesson.day) ||
                          user?.role !== 'teacher'
                            ? false
                            : true
                        }
                        onConfirm={() => handleFetchJournals(item.id, lesson.id, 2)}
                        onCancel={() => handleFetchJournals(item.id, lesson.id, 3)}
                        title={translate('wasInClass')}
                        okText={translate('yes')}
                        cancelText={translate('no')}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      >
                        {user?.role === 'teacher' ? (
                          <Button
                            disabled={today === lesson.day ? false : true}
                            type="default"
                            icon={<ExclamationCircleOutlined />}
                            loading={isLoading}
                          ></Button>
                        ) : (
                          <Button
                            type="default"
                            icon={<ExclamationCircleOutlined />}
                            loading={isLoading}
                          ></Button>
                        )}
                      </Popconfirm>
                    ) : lesson.check === 2 ? (
                      <Popconfirm
                        disabled={
                          (user?.role === 'teacher' && today === lesson.day) ||
                          user?.role !== 'teacher'
                            ? false
                            : true
                        }
                        onConfirm={() => handleFetchJournals(item.id, lesson.id, 1)}
                        title={translate('wasInClass')}
                        okText={translate('yes')}
                        cancelText={translate('no')}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      >
                        <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          loading={isLoading}
                        ></Button>
                      </Popconfirm>
                    ) : lesson.check === 3 ? (
                      <Popconfirm
                        disabled={
                          (user?.role === 'teacher' && today === lesson.day) ||
                          user?.role !== 'teacher'
                            ? false
                            : true
                        }
                        onConfirm={() => handleFetchJournals(item.id, lesson.id, 1)}
                        title={translate('wasInClass')}
                        okText={translate('yes')}
                        cancelText={translate('no')}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      >
                        {user?.role ? (
                          <Button
                            // disabled={today === lesson.day ? false : true}
                            type="primary"
                            danger={true}
                            icon={<CloseCircleOutlined />}
                            loading={isLoading}
                          ></Button>
                        ) : (
                          <Button
                            type="primary"
                            danger={true}
                            icon={<CloseCircleOutlined />}
                            loading={isLoading}
                          ></Button>
                        )}
                      </Popconfirm>
                    ) : (
                      <Button
                        style={{ opacity: '0', cursor: 'inherit' }}
                        type="primary"
                        danger={true}
                        icon={<CloseCircleOutlined />}
                        loading={isLoading}
                      ></Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        );
      })}
    </>
  );
};

export default Journals;
