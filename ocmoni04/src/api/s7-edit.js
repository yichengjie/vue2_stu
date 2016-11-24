let HttpClientUtil = require('HttpClientUtil') ;
let util =  require('util');
let jsonData = require('./s7-edit.json')

export function initPage4AddApi(){
    //let {carrCode,contextPath} = util.getJspPageParam() ;
    //let url = contextPath+'/s7/initPage4Add.action' ;
    //return HttpClientUtil.dealAjaxRequestWithoutParam(url) ;
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(jsonData) ;
        },100) ;
    }) ;

}