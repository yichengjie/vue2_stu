import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE} from './mutation-types.js' ;
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
  }
}
export default mutations ;