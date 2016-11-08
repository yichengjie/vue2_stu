
let _ = require('lodash') ;
//排序数据
export function orderListData(list,titleName,ascFlag){
    if(titleName&&titleName.length>0&&titleName!=='default'){
        let orderTypeStr = ascFlag ? 'asc' : 'desc' ;
        let retArr = _.orderBy(list, [titleName], [orderTypeStr]);
        list.splice(0,list.length) ;
        retArr.forEach(item => list.push(item) ) ;
    }
}


//生成一个随机数
export function random (min,max){
    return function(){
        return _.random(min,max);
    };
}