let HttpClientUtil = require('HttpClientUtil') ;
let util =  require('util');
let jsonData = require('../test/s7-edit.json')

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


export function initPage4UpdateApi(){
    let formData = {
        firstMaintenanceDate:'2016-10-21'
    } ;
    let retData ={
        flag:true ,
        formData
    };
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(retData) ;
        },300) ;
    }) ;

}