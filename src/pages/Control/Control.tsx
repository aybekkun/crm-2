import LeadItem from '../../components/Screens/Control/LeadItem';
import RoomItem from '../../components/Screens/Control/RoomItem';
import TimeItem from '../../components/Screens/Control/TimeItem';
import styles from './Control.module.scss';

const Control = () => {
  return (
    <div className={styles.controls}>
      <RoomItem />
      <TimeItem />
      <LeadItem />
    </div>
  );
};

export default Control;
