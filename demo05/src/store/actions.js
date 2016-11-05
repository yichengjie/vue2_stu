// actions are functions that causes side effects and can involve
// asynchronous operations.
import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE,UPDATE_SIMPLE_STATE,
    ORDER_LISTDATA,UPDATE_TABLETITLE_ORDER,CLEAR_TABLETITLE_ORDERINFO,
    UPDATE_FORMDATA_ARRAY,UPDATE_FORMDATA_SIMPLE} from './mutation-types.js' ;
import {queryDbApi} from '../api/index.js' ;
let _initTooltip = function(){
	setTimeout(function(){
       $("[data-toggle='tooltip']").tooltip();
	},500) ;
	return true ;
} ;

const actions = {
   updatePageBar({commit},payload){
      commit(UPDATE_INPUT_PAGEBAR,payload) ;
   },
   queryList4Page({commit},payload){
       let promise = queryDbApi(payload) ;
       promise.then(function(retData){
           commit(QUERYLIST_FOR_PAGE,retData.pageBean) ;
           //_initTooltip() ;//v-bind:title占用了bootstrap的tooltip插件使用原生title的功能，所以无法正常显示
       },function(err){
           console.info('查询出错!') ;
       }) ;
   },
   updateSimpleState({commit},payload){
       commit(UPDATE_SIMPLE_STATE,payload) ;
   },
   orderListData({commit},payload){
       commit(ORDER_LISTDATA,payload) ;
   },
   updateTableTitleOrder({commit},payload){
       commit(UPDATE_TABLETITLE_ORDER,payload) ;
   },
   clearTableTitleOrderInfo({commit}){
       commit(CLEAR_TABLETITLE_ORDERINFO) ;
   },
   updateFormDataArrData({commit},payload){
       commit(UPDATE_TABLETITLE_ORDER,payload) ;
   },
   updateFormDataArray({commit},payload){
       commit(UPDATE_FORMDATA_ARRAY,payload) ;
   },
   updateFormDataSimple({commit},payload){
       commit(UPDATE_FORMDATA_SIMPLE,payload) ;
   }
}

export default actions ;
