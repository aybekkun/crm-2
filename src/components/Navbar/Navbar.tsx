import {
  AppstoreOutlined,
  BankOutlined,
  HomeOutlined,
  MailOutlined,
  ProfileOutlined,
  RiseOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  CONTROL,
  COURSES,
  EMPLOYEES,
  EXPENSES,
  GROUPS,
  LESSONS,
  MAIN,
  PAYMENTS,
  STATISTICS,
  STUDENTS,
  TEACHERS,
  WAIT,
} from '../../helpers/constants/routes';
import { useAppSelector } from '../../helpers/hooks/redux';
import { useTranslation } from 'react-i18next';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Navbar = () => {
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.loginReducer);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const seoItems: MenuItem[] = [
    getItem(<NavLink to={`${MAIN}`}>{translate('main')}</NavLink>, '1', <HomeOutlined />),
    getItem(`${translate('menu')} 1`, 'sub1', <UserAddOutlined />, [
      getItem(<NavLink to={`${WAIT}`}>{translate('wait')}</NavLink>, '2'),
      getItem(<NavLink to={`${STUDENTS}`}>{translate('students')}</NavLink>, '3'),
      getItem(<NavLink to={`${TEACHERS}`}>{translate('teachers')}</NavLink>, '4'),
    ]),
    getItem(`${translate('menu')} 2`, 'sub2', <ProfileOutlined />, [
      getItem(<NavLink to={`${COURSES}`}>{translate('courses')}</NavLink>, '5'),
      getItem(<NavLink to={`${GROUPS}`}>{translate('groups')}</NavLink>, '6'),
      getItem(<NavLink to={`${LESSONS}`}>{translate('timeTable')}</NavLink>, '7'),
    ]),
    getItem(translate('finance'), 'sub3', <RiseOutlined />, [
      getItem(<NavLink to={`${PAYMENTS}`}>{translate('payments')}</NavLink>, '8'),
      getItem(<NavLink to={`${EXPENSES}`}>{translate('expenses')}</NavLink>, '9'),
      getItem(<NavLink to={`${STATISTICS}`}>{translate('statistics')}</NavLink>, '10'),
    ]),
    getItem(translate('settings'), 'sub4', <SettingOutlined />, [
      getItem(<NavLink to={`${EMPLOYEES}`}>{translate('employees')}</NavLink>, '11'),
      getItem(<NavLink to={`${CONTROL}`}>{translate('control')}</NavLink>, '12'),
    ]),
  ];

  const adminItems: MenuItem[] = [
    getItem(<NavLink to={`${MAIN}`}>{translate('main')}</NavLink>, '1', <BankOutlined />),
    getItem(`${translate('menu')} 1`, 'sub1', <MailOutlined />, [
      getItem(<NavLink to={`${WAIT}`}>{translate('wait')}</NavLink>, '2'),
      getItem(<NavLink to={`${STUDENTS}`}>{translate('students')}</NavLink>, '3'),
      getItem(<NavLink to={`${TEACHERS}`}>{translate('teachers')}</NavLink>, '4'),
    ]),
    getItem(`${translate('menu')} 2`, 'sub2', <AppstoreOutlined />, [
      getItem(<NavLink to={`${COURSES}`}>{translate('courses')}</NavLink>, '5'),
      getItem(<NavLink to={`${GROUPS}`}>{translate('groups')}</NavLink>, '6'),
      getItem(<NavLink to={`${LESSONS}`}>{translate('lessons')}</NavLink>, '7'),
    ]),
  ];

  if (user?.role === 'teacher') {
    return (
      <Menu
        style={{ backgroundColor: '#75afe8', paddingTop: 60, height: '100%', fontSize: '16px' }}
      >
        {user?.groups?.map((item) => {
          return (
            <Menu.Item key={item.id}>
              <NavLink to={`${GROUPS}/${item.id}`}>{item.name}</NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }

  if (user?.role === 'admin') {
    return (
      <Menu
        defaultSelectedKeys={['1']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        items={adminItems}
        style={{ backgroundColor: '#75afe8', paddingTop: 60, height: '100%', fontSize: '16px' }}
      />
    );
  }
  return (
    <Menu
      defaultSelectedKeys={['1']}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={seoItems}
      style={{ backgroundColor: '#75afe8', paddingTop: 60, height: '100%', fontSize: '16px' }}
    />
  );
};

export default Navbar;
