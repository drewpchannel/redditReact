import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
