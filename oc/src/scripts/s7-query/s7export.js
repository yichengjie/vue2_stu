//s7ExportBtn
'use strict';
var util = require('../lib/util') ;
var httpClient = require('../lib/HttpClientUtil') ;
const topHight = 140 ;
class S7ExportClass {
	
	handleExport(formData){
		let contextPath = $("#contextPath").val() ;
    	let serverUrl = contextPath +"/s7/export2Excel.action" ;
    	//整理参数数据
		var carrCode = $("#carrCode").val() ;
		let baseParam = {carrCode} ;
		let queryParam = Object.assign({},baseParam,formData);
		//console.info('queryParam : ' , queryParam) ;
		//发送ajax请求
		let ajaxing = httpClient.dealAjaxRequest4JSObj(serverUrl,queryParam) ;
		util.showLoading() ;
		//处理后续数据
    	$.when(ajaxing).done(function(retData){
    		util.hideLoading() ;
    		let flag = retData.flag ;
    		if(flag=='true'){
    			let excelUrl = retData.url ;
    			window.location.href = contextPath + excelUrl;
    		}else{
    			let msg = retData.msg || "";
    			if(msg.length===0){
    				msg = "导出出错!" ;
    			}
    			util.toastDanger(msg,topHight) ;
    		}
    	}).fail(function(err){
    		util.hideLoading() ;
    		util.toastDanger('调用导出方法出错!',topHight) ;
    	}) ;
	}
}

export default S7ExportClass ;


