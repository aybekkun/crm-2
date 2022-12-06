import { Dropdown, Menu, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { loginSlice } from './../../store/slices/loginSlice';
import styles from './Header.module.scss';
import kr from '../../assets/flag-kr.png';
import ru from '../../assets/flag-ru.jpg';
import uk from '../../assets/flag-uk.jpg';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.loginReducer);
  const { logout } = loginSlice.actions;
  const { t, i18n } = useTranslation();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  const menu = (
    <Menu
      items={[
        {
          label: `${t('fullname')}: ${user?.surname} ${user?.name}`,
          key: '0',
        },
        {
          label: `${t('phone')}: ${user?.phone}`,
          key: '1',
        },
        {
          label: `${t('birthday')}: ${user?.birthday}`,
          key: '2',
        },
        {
          label: `${t('role')}: ${user?.role}`,
          key: '3',
        },
        {
          type: 'divider',
        },
        {
          label: <div onClick={handleLogOut}>Выход</div>,
          danger: true,
          key: '4',
        },
      ]}
    />
  );
  return (
    <div className={styles.header}>
      <div className={styles.inter}>
        <Select defaultValue="kr" onChange={handleChange}>
          <Select.Option value="kr">
            <img src={kr} alt="kr" width="25" height="25" /> QR
          </Select.Option>
          <Select.Option value="ru">
            <img src={ru} alt="ru" width="25" height="25" /> РУ
          </Select.Option>
          <Select.Option value="en">
            <img src={uk} alt="uk" width="25" height="25" /> EN
          </Select.Option>
        </Select>
      </div>
      <Dropdown overlay={menu} trigger={['click']} className={styles.dropdown}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <span>{user?.name}</span>
            <div className={styles.account} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Header;
