import styles from './SignUp.module.scss';

const SignUp = () => {
  return (
    <div className={styles.signUp}>
      <div className={styles.left}>
        <div className={styles.logo}></div>
        <h2>Регистрация</h2>

        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <p className={styles.paragraph}>Имя</p>
            <input
              type="text"
              name="firstName"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.firstName}
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.paragraph}>Фамилия</p>
            <input
              type="text"
              name="secondName"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.secondName}
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.paragraph}>Телефон номер</p>
            <input
              type="tel"
              name="phone"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.phone}
            />
          </div>

          <div className={styles.inputContainer}>
            <p className={styles.paragraph}>Пароль</p>
            <input
              type="password"
              name="password"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.password}
            />
          </div>

          <div className={styles.button}>
            <button type="submit">Зарегистрироваться</button>
          </div>
        </form>
      </div>

      <div className={styles.right}>
        <div className={styles.img}>
          <div className={styles.imgInner}></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
