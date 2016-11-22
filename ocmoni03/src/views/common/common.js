let _ = require('lodash') ;
let util = require('util') ;
let ht = 140 ;
let moment = require('moment_lib') ;
export const defaultPageSize = 15  ;
export const defaultOrderTitleName = "lastUpdateDate" ;
var datetimeForm = "YYYY-MM-DD hh:mm" ;


var debounce = function(fn, delay) {
    var timeout;
    return function() {
        var self = this;
        var args = arguments;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function() {
            fn.apply(self, args);
        }, delay);
    };
};


var escape_html = function(str) {
    return (str + '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

export function convertDateTimeStr2Date(str){
    return moment(str, datetimeForm) ;
}

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

export function toastInfo(msg){
	util.toastInfo(msg,ht) ;
}
export function toastDanger(msg){
	util.toastDanger(msg,ht) ;
}
export function toastSuccess(msg){
	util.toastSuccess(msg,ht) ;
}