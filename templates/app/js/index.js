import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './app/App/App.jsx';
import '../styles/config.less';
import {store} from './redux/';
import {actions} from './redux/';

actions.initConfig({
  bootstrapped: true
});

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));