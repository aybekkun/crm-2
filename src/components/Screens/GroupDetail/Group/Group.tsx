import { Button } from 'antd';
import { FC } from 'react';
import { CREATE, EDIT, getEditName } from '../../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../../helpers/hooks/redux';
import { statusSlice } from '../../../../store/slices/statusSlice';
import { studentsSlice } from '../../../../store/slices/studentsSlice';
import { createJournals } from '../../../../store/thunks/groupsThunk';
import { IOneGroupData } from '../../../../types/Groups';
import StudentsForm from '../../Students/StudentsFrom';
import { countSlice } from './../../../../store/slices/countSlice';
import { groupsSlice } from './../../../../store/slices/groupsSlice';
import CardInfoLeft from './Components/Cards/CardInfoLeft';
import CardInfoRight from './Components/Cards/CardInfoRight';
import LessonsHeader from './Components/LessonHeader/LessonsHeader';
import styles from './Group.module.scss';
import Journals from './Journals/Journals';
import Tab from './Tab/Tab';
import { useTranslation } from 'react-i18next';
import { IGroupsForm } from './../../../../types/Groups';
import { modalSlice } from '../../../../store/slices/modalSlice';
import EditBtn from '../../../Buttons/EditBtn/EditBtn';
import AddStudentToGroup from '../AddStudentToGroup/AddStudentToGroup';

interface IGroupProps {
  id: string | undefined;
  group: IOneGroupData;
  isLoading: boolean;
}

const Group: FC<IGroupProps> = ({ group, isLoading }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.loginReducer);
  const { setCount } = countSlice.actions;
  const { setCurrentMonth, setFormGroups } = groupsSlice.actions;
  const { setModalStudents } = studentsSlice.actions;
  const { setStatus } = statusSlice.actions;
  const { setModal } = modalSlice.actions;

  const onChangeTabs = (key: string) => {
    dispatch(setCurrentMonth(key));
  };

  const onHandleCreateStudnets = () => {
    dispatch(setModalStudents(true));
    dispatch(setStatus(CREATE));
  };

  const onEditGroup = (obj: IGroupsForm) => {
    dispatch(setFormGroups(obj));
    dispatch(setModal(true));
    dispatch(setStatus(EDIT));
  };

  const handleFetchJournals = async (student_id: number, lesson_id: number, check: number) => {
    if (check === 1) {
      await dispatch(createJournals({ student_id, lesson_id, check }));
    } else if (check === 2) {
      await dispatch(createJournals({ student_id, lesson_id, check }));
    } else if (check === 3) {
      await dispatch(createJournals({ student_id, lesson_id, check }));
    }
    dispatch(setCount(1));
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupInfo}>
        <CardInfoLeft data={group} isLoading={isLoading} />
        <CardInfoRight data={group} isLoading={isLoading} />
      </div>

      <div>
        Изменить данные группы
        <EditBtn
          title={getEditName(translate('group'))}
          onEditBtn={onEditGroup}
          record={{
            id: group.group_id,
            name: group.group_name,
            course_id: group.course_id,
            teacher_id: group.teacher_id,
          }}
        />
      </div>
      {user?.role !== 'teacher' ? (
        <Button onClick={onHandleCreateStudnets} type="primary" style={{ marginTop: 10 }}>
          {translate('addBtn')}
        </Button>
      ) : (
        ''
      )}

      <Tab data={group.months} onChange={onChangeTabs} />

      <div className={styles.lessons}>
        <LessonsHeader data={group.students.length > 0 ? group.students[0].lessons : undefined} />
        <Journals
          data={group.students}
          isLoading={isLoading}
          handleFetchJournals={handleFetchJournals}
        />
      </div>
      <AddStudentToGroup />
    </div>
  );
};

export default Group;
