// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE} from './mutation-types.js' ;
const mutations = {
  [UPDATE_INPUT_PAGEBAR] (state,pageBar ) {
      Object.assign(state.pageBar,pageBar) ;
  },
  [QUERYLIST_FOR_PAGE](state,pageBean){

     console.info('pageBean : ' ,pageBean) ;
     Object.assign(state.pageBar,pageBean) ;
     //state.records7List.splice(0,state.records7List.length) ;
     state.records7List = pageBean.recordList;
     //arr.splice(1,2)  /
  }
}
export default mutations ;