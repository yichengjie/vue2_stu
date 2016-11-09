// actions are functions that causes side effects and can involve
// asynchronous operations.
import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE,UPDATE_SIMPLE_STATE,
    ORDER_LISTDATA,UPDATE_TABLETITLE_ORDER,CLEAR_TABLETITLE_ORDERINFO,
    UPDATE_FORMDATA_ARRAY,UPDATE_FORMDATA_SIMPLE,UPDATE_SINGLE_CHECKEDIDARR,
    UPDATE_ALL_CHECKEDIDARR,BATCH_DELETE_RECORDS7,BATCH_ABORT_RECORDS7} from './mutation-types.js' ;
import api from '../api/index.js' ;
const actions = {
   updatePageBar({commit},payload){
      commit(UPDATE_INPUT_PAGEBAR,payload) ;
   }
} ;

export default actions ;
