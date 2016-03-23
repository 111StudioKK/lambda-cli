import {createStore, combineReducers} from 'redux';
import {reducers as config} from './config.js';

let reducers = combineReducers(
  Object.assign(
    config
  )
);

const store = (__DEV__) ?
  createStore(reducers, {},
    window.devToolsExtension ? window.devToolsExtension()
    :
    console.info('Redux devtools extension not found, you can download it here: \
    https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en' )
  )
  :
  createStore(reducers);

export default store;