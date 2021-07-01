import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { baseurl } from '../siteMeta';
import mswWorker from './apiMock/browser';
import App from './App';
import store from './store';

mswWorker.start({
  onUnhandledRequest: 'bypass',
  quiet: process.env.NODE_ENV !== 'development',
  serviceWorker: {
    url: `${
      process.env.NODE_ENV !== 'development' ? baseurl : ''
    }/mockServiceWorker.js`,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
