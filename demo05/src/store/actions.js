// actions are functions that causes side effects and can involve
// asynchronous operations.
import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE} from './mutation-types.js' ;
import {queryDbApi} from '../api/index.js' ;
const actions = {
   updatePageBar({commit},payload){
      commit(UPDATE_INPUT_PAGEBAR,payload) ;
   },
   queryList4Page({commit},payload){
       let promise = queryDbApi(payload) ;
       promise.then(function(retData){
           commit(QUERYLIST_FOR_PAGE,retData.pageBean) ;
       },function(err){
           console.info('查询出错!') ;
       }) ;
   }
}

export default actions ;
