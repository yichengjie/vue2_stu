// actions are functions that causes side effects and can involve
// asynchronous operations.
import {UPDATE_INPUT_PAGEBAR} from './mutation-types.js' ;
const actions = {
   updatePageBar({commit},payload){
      commit(UPDATE_INPUT_PAGEBAR,payload) ;
   }
}

export default actions ;
