function _updateVisiableData(cp){
    var flag = _getVisiableFlag(cp) ;
    cp.visiable = flag ; 
    if(!flag){//如果隐藏控件
        cp.resetField() ;
    }
}
function _getVisiableFlag(cp){
    //serviceTypeList:Array, //serviceType:String,
    //groupList:Array,//group:String,
    //subGroupList:Array,//subGroup:String
    let serviceTypeList = cp.serviceTypeList ;
    let serviceType = cp.serviceType ;
    let groupList = cp.groupList ;
    let group = cp.group ;
    let subGroupList = cp.subGroupList ;
    let subGroup = cp.subGroup ;
    let flag1 = _checkListContainsStr(serviceTypeList,serviceType) ;
    let flag2 = _checkListContainsStr(groupList,group) ;
    let flag3 = _checkListContainsStr(subGroupList,subGroup) ;
    return (flag1 && flag2 && flag3) ;
}
function _checkListContainsStr(list,str){
    if( (!list) ||list.length==0 ) return true ;
    if( (!str) || str.trim().length==0 ) return true ;
    return list.includes(str) ;
}

export default {
     props: {
        serviceTypeList:Array,
        serviceType:String,
        groupList:Array,
        group:String,
        subGroupList:Array,
        subGroup:String
     },
     data(){
         return {
              visiable:true/*是否可见，如果控件不可见，对应的字段value将会被清空**/
         } ;
     },
     watch:{
      serviceType(newVal,oldVal){
         console.info('serviceType is change ...') ;
         _updateVisiableData(this) ;
      },
      group(newVal,oldVal){
        console.info('group is change ...') ;
        _updateVisiableData(this) ;
      },
      subGroup(newVal,oldVal){
        console.info('subGroup is change ...') ;
        _updateVisiableData(this) ;
      }
    }
} ;


