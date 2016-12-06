let HttpClientUtil = require('HttpClientUtil_lib2') ;
let jsonData = require('../test/s7-edit.json') ;
let util = require('util_lib') ;


export function initPage4AddApi(){
    let {carrCode,contextPath} = util.getJspPageParam() ;
    let url = contextPath+'/s7/initPage4Add.action' ;
    return HttpClientUtil.dealAjaxRequestWithoutParam(url) ;
}


export function initPage4UpdateApi(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({}) ;
        },300) ;
    }) ;

}
