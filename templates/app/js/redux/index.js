import {bindActionCreators, createStore, combineReducers} from 'redux';
import config from './config.js';

const reducers = combineReducers(
  Object.assign(
    config.reducers
  )
);

const combinedActions = Object.assign(
  config.actions
);

export const store = (__DEV__) ?
  createStore(reducers, {},
    window.devToolsExtension ? window.devToolsExtension()
    :
    console.info('Redux devtools extension not found, you can download it here: \
    https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en' )
  )
  :
  createStore(reducers);


export const actions = bindActionCreators(combinedActions, store.dispatch);