// getters are functions
const getters = {
   listCount:state => state.records7List.length ,
   records7List:state => state.records7List ,
   pageBar:state => state.pageBar ,
   queryDBFlag:state => state.queryDBFlag
}

export default getters ;