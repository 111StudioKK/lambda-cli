const INIT_CONFIG = 'INIT_CONFIG';

export const actions = {
  initConfig: (config) => {
    return { type: INIT_CONFIG, config };
  }
};

export const reducers = {
  config: (state = {}, action) => {
    switch (action.type) {
    case INIT_CONFIG:
      return action.config;
    default:
      return state;
    }
  }
};