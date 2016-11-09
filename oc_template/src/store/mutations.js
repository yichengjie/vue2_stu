import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE,UPDATE_SIMPLE_STATE,
    ORDER_LISTDATA,UPDATE_TABLETITLE_ORDER,CLEAR_TABLETITLE_ORDERINFO,
    defaultOrderFlag,UPDATE_FORMDATA_ARRAY,UPDATE_FORMDATA_SIMPLE,
    UPDATE_SINGLE_CHECKEDIDARR,UPDATE_ALL_CHECKEDIDARR,BATCH_DELETE_RECORDS7,
    BATCH_ABORT_RECORDS7} from './mutation-types.js' ;
import {orderListData} from '../common/index.js' ;

const mutations = {
  [UPDATE_INPUT_PAGEBAR] (state,pageBar ) {
      Object.assign(state.pageBar,pageBar) ;
  }
};
export default mutations ;