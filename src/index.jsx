import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import mswWorker from './apiMock/browser';
import App from './App';
import store from './store';

mswWorker.start({
  onUnhandledRequest: 'bypass',
  quiet: process.env.NODE_ENV !== 'development',
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
