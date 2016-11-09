import Vue from 'vue' ;
import Vuex from 'vuex' ;
import actions from './actions.js' ;
import mutations from './mutations.js' ;
import getters from './getters.js' ;
import {defaultOrderFlag} from './mutation-types.js' ;
const debug = process.env.NODE_ENV !== 'production' ;
//const debug = false ;
//const defaultPageSize = 15 ;
import {defaultPageSize} from '../common/index.js' ;
Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  records7List:[],
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
});
