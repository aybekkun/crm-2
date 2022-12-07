import { useAppDispatch, useAppSelector } from './helpers/hooks/redux';
import Routs from './routes/Routes';
import { checkLogin } from './store/thunks/loginThunk';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchCheckLogin() {
      await dispatch(checkLogin());
    }
    fetchCheckLogin();
  }, [dispatch]);

  return (
    <>
      <Routs />
    </>
  );
}

export default App;
