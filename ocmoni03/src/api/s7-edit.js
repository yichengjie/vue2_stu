let HttpClientUtil = require('HttpClientUtil') ;
let util =  require('util');

export function initPage4AddApi(){
    let {carrCode,contextPath} = util.getJspPageParam() ;
    let url = contextPath+'/s7/initPage4Add.action' ;
    return HttpClientUtil.dealAjaxRequestWithoutParam(url) ;
}