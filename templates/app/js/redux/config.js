const INIT_CONFIG = 'INIT_CONFIG';

const actions = {
  initConfig: (config) => {
    return { type: INIT_CONFIG, config };
  }
};

const reducers = {
  config: (state = {}, action) => {
    switch (action.type) {
    case INIT_CONFIG:
      return action.config;
    default:
      return state;
    }
  }
};

export default {
  actions: actions,
  reducers: reducers
}