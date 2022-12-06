import { useAppDispatch, useAppSelector } from './helpers/hooks/redux';
import Routs from './routes/Routes';
import { checkLogin } from './store/thunks/loginThunk';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const dispatch = useAppDispatch();
  const { isUserLogin } = useAppSelector((state) => state.loginReducer);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(checkLogin());
  }, [isUserLogin, dispatch]);

  return (
    <>
      <Routs />
    </>
  );
}

export default App;
