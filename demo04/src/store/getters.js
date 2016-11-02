// getters are functions
const getters = {
   listCount:state => state.records7List.length ,
   records7List:state => state.records7List ,
   pageBar:state => state.pageBar ,
   queryDBFlag:state => state.queryDBFlag,
   dealPageOrderFlag:state => state.dealPageOrderFlag
}

export default getters ;