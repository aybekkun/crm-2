import ReactDOM from 'react-dom/client';
import 'react-phone-number-input/style.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';
import { setupStore } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
