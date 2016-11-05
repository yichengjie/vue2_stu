import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE,UPDATE_SIMPLE_STATE,
    ORDER_LISTDATA,UPDATE_TABLETITLE_ORDER,CLEAR_TABLETITLE_ORDERINFO,
    defaultOrderFlag,UPDATE_FORMDATA_ARRAY,UPDATE_FORMDATA_SIMPLE} from './mutation-types.js' ;
import {orderListData} from '../common/index.js' ;
const mutations = {
  [UPDATE_INPUT_PAGEBAR] (state,pageBar ) {
      Object.assign(state.pageBar,pageBar) ;
  },
  [QUERYLIST_FOR_PAGE](state,pageBean){
      let vmPageBar = state.pageBar ;
      vmPageBar.curPage = pageBean.curPage ;
      vmPageBar.pageSize= pageBean.pageSize;
      vmPageBar.pageCount = pageBean.pageCount;
      vmPageBar.recordCount = pageBean.recordCount ;
      vmPageBar.pgArr = pageBean.pageNumList ;
      vmPageBar.isQueryDB = true ;
      let list = pageBean.recordList ;
      state.records7List = list;
      state.dealPageOrderFlag = false;//是否进行过页面排序
  },
  [UPDATE_SIMPLE_STATE](state,payload){
      Object.assign(state,payload) ;
  },
  [ORDER_LISTDATA](state,payload){
      let list = state.records7List ;
      let {titleName,ascFlag} = payload ;
      orderListData(list,titleName,ascFlag) ;
  },
  [UPDATE_TABLETITLE_ORDER](state,payload){
      let keys = Object.keys(state.tableTitleOrder) ;
      for(let key of keys){
          state.tableTitleOrder[key] = defaultOrderFlag ;
      }
      Object.assign(state.tableTitleOrder,payload) ;
  },
  [CLEAR_TABLETITLE_ORDERINFO](state){
      state.orderTitleName = '' ;
      let keys = Object.keys(state.tableTitleOrder) ;
      for(let key of keys){
          state.tableTitleOrder[key] = defaultOrderFlag ;
      }
  },
  [UPDATE_FORMDATA_ARRAY](state,payload){
      let {checkedFlag,fieldName,fieldValue} = payload ;
      if(checkedFlag){
          state.formData[fieldName].push(fieldValue) ;
      }else{
          let index =  state.formData[fieldName].findIndex(function(value) {
            return value == fieldValue;
          }) ;
          //console.info('index : ' + index) ;
          state.formData[fieldName].splice(index,1) ;
      }
  },
  [UPDATE_FORMDATA_SIMPLE](state,payload){
       Object.assign(state.formData,payload) ;
  }
}
export default mutations ;