import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';
import { PASSWORD, PHONE } from '../../helpers/constants/form';
import { LOGIN, MAIN } from '../../helpers/constants/routes';
import { numberConfig, passwordConfig } from '../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { checkLogin, fetchLogin, ILoginProps } from './../../store/thunks/loginThunk';
import styles from './LogIn.module.scss';

const LogIn = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isUserLogin, isLoading, error } = useAppSelector((state) => state.loginReducer);

  useEffect(() => {}, [dispatch]);

  const onHandleCreate = (values: ILoginProps) => {
    dispatch(fetchLogin(values));
  };

  const onFinishFailed = () => {
    message.error(translate('invalidLogin'));
  };

  const checkFunction = async () => {
    await dispatch(checkLogin());

    if (isUserLogin) {
      navigate(MAIN);
    } else {
      navigate(LOGIN);
    }
  };

  useEffect(() => {
    checkFunction();
  }, [isUserLogin, navigate, user, dispatch]);

  if (error) {
    onFinishFailed();
  }

  return (
    <div className={styles.logIn}>
      <div className={styles.logo}></div>
      <Form
        name="waitForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        className={styles.form}
        size="large"
        onFinish={onHandleCreate}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <p className={styles.head}>{translate('login')}</p>
        <Form.Item label={translate('phone')} name={PHONE.eng} {...numberConfig}>
          <PhoneInput
            international
            onChange={() => {}}
            defaultCountry="UZ"
            className={styles.phone}
          />
        </Form.Item>

        <Form.Item label={translate('password')} name={PASSWORD.eng} {...passwordConfig}>
          <Input.Password type="password" />
        </Form.Item>

        <p className={styles.forgot}>{translate('forgotPassword')}</p>

        <Form.Item className={styles.button}>
          <Button type="primary" htmlType="submit" size="large" loading={!!isLoading}>
            {translate('login')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;
