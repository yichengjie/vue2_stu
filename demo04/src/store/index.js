import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import actions from './actions.js' ;
import mutations from './mutations.js' ;
import getters from './getters.js' ;
import {defaultOrderFlag} from './mutation-types.js' ;
const debug = process.env.NODE_ENV !== 'production' ;
//const debug = false ;
const defaultPageSize = 15 ;

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  records7List:[],
  pageBar:{
    "curPage":0,
    "pageSize":defaultPageSize,
    "pgArr":[],
    "pageCount":0,
    "recordCount":0,
    "isQueryDB":false
  },
  queryDBFlag:false,/**是否针对所有记录进行排序 */
  dealPageOrderFlag:false,/**是否进行过页面静态排序 */
  tableTitleOrder:{"subcode":defaultOrderFlag,"serviceType":defaultOrderFlag,"sequenceNumber":defaultOrderFlag,"statusDes":defaultOrderFlag,"saleStartDate":defaultOrderFlag,
      "saleEndDate":defaultOrderFlag,"travelStartDate":defaultOrderFlag,"travelEndDate":defaultOrderFlag,"loc1":defaultOrderFlag,
      "loc2":defaultOrderFlag,"flyerStatus":defaultOrderFlag,"money":defaultOrderFlag,"descr":defaultOrderFlag,"lastUpdateUser":defaultOrderFlag,
      "lastUpdateDate":defaultOrderFlag
  },/**所有列的排序状态 */
  orderTitleName:"",/**当前排序的列名称 */
  checkAllRecords7Flag:false
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
