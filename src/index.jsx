import store from '@store/';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import mswWorker from './apiMock/browser';
import App from './App';
import { baseurl } from './siteMeta';

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
