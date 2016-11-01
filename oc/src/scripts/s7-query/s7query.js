"use strict" ;
var Common = require('../lib/common');
var common = new Common();
var Equipment = require('./equipment');
var equipment = new Equipment();
var util = require('../lib/util') ;
var _ = require('lodash_lib') ;
var httpClient = require('../lib/HttpClientUtil') ;
//var s7list_panel_tpl = require('./tpls/s7list_panel.html') ;
//var s7list_item_tpl = require('./tpls/s7list_item.html') ;
const topHight = 140 ;
//默认排序状态
const defaultPageSize = 15 ;

//let getSingleton = function(fn){
//	console.info('fn', fn) ;
//	let result = null ;
//	console.info('result : ', result) ;
//	return function(){
//		return result || (result = fn.apply(this,arguments)) ;
//	};
//};
function keyDownSearch(e) {    
    // 兼容FF和IE和Opera    
    var theEvent = e || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
    if (code == 13) {    
        $("#s7QueryBtn").trigger('click') ;
        return false;    
    }    
    return true;    
}  

let _initTooltip = function(){
	setTimeout(function(){
       $("[data-toggle='tooltip']").tooltip();
	},300) ;
	return true ;
} ;

class Records7Query{
    constructor(){
        //initQueryPage() ;
        util.initUpperMode() ;
        //initVue(this) ;
        document.onkeydown=keyDownSearch;  
    }
//    setQueryFFPList(list){
//    	this.queryFFPList = list ;
//    	let _self = this ;
//    	this.queryFFPList.forEach(function(item){
//    		_self.queryFFPMap.set(item.ffpStatus+"",item.description);
//    	}) ;
//    	//console.info(JSON.stringify(_self.queryFFPMap)) ;
//    }
    
    fetchFFPPageDataApi(){
    	let _self = this; 
    	let contextPath = $("#contextPath").val() ;
    	let serverUrl = contextPath+"/ffp/query.action" ;
    	let ajaxing = httpClient.dealAjaxRequestWithoutParam(serverUrl) ;
    	return ajaxing ;
    }
    
   
    _getFlyerStatusMap(flyerStatus){
    	this.queryFFPMap.get(flyerStatus+"") ;
    }
    _getStatusShow (statusDes) {
		var result = '';
		if (statusDes === '1') {
			result = '未发布';
		} else if (statusDes === '2') {
			result = '未生效';
		} else if (statusDes === '3') {
			result = '已生效';
		}else if (statusDes === '4') {
			result = '已过期';
		}else if (statusDes === '5') {
			result = '已取消';
		}
		return result;
	}
    formatSpecialDateStr(dataStr){
    	//2015-01-01 00:00
    	//let retStr = '' ;
        //if(dataStr&&dataStr.length>0){
        //    let infos = _.split(dataStr ,' ') ;
        //    retStr = infos[0] ;
        //}
        //return _.replace(retStr, /-/g, '/') ;
    	return _.replace(dataStr, /-/g, '/') ;
    }
    
    getQueryParam(baseParam,formData){
    	return Object.assign({},baseParam,formData);
    }
    query4Page(formData,{toPageNum=1,vmList,vmPageBar,orderName="lastUpdateDate",isAsc=true} ){
    	var _self = this ;
        orderName = orderName==''?'lastUpdateDate':orderName ;
        //let {toPageNum,vmList,vmPageBar} = config ;
        var carrCode = $("#carrCode").val() ;
        var contextPath = $("#contextPath").val() ;
		var pageSize =   vmPageBar.pageSize || defaultPageSize ;
		var baseParam = {"curPage":toPageNum,"pageSize":pageSize,
				"orderName":orderName,"isAsc":isAsc,
				carrCode:carrCode} ;
		var serverURL = contextPath+"/s7/s7Query4Page.action" ;
		var simpleJsonData = this.getQueryParam(baseParam,formData) ;
		//console.info('simpleJsonData : ' ,simpleJsonData) ;
		//清空历史数据
		vmList.splice(0,vmList.length);  
		vmPageBar.curPage =0 ;
		vmPageBar.pageCount = 0 ;
		vmPageBar.pgArr.splice(0,vmPageBar.pgArr.length) ;
		util.showLoading() ;
        //let ajaxing = queryDbApi(simpleJsonData) ;
		let ajaxing = httpClient.dealAjaxRequest4JSObj(serverURL,simpleJsonData) ;
		
        ajaxing.then(function(retData){
        	util.hideLoading() ;
        	let {flag,pageBean} = retData ;
        	if(flag ==="true"){
        		let list = pageBean.recordList ;
                vmPageBar.curPage = pageBean.curPage ;
                vmPageBar.pageSize= pageBean.pageSize;
                pageBean.pageNumList.forEach(function(item){
                    vmPageBar.pgArr.push(item) ;
                }) ;
                vmPageBar.pageCount = pageBean.pageCount;
                vmPageBar.recordCount = pageBean.recordCount ;
                vmPageBar.isQueryDB = true ;
                list.forEach(function(item){
                	let saleStartDateShow = _self.formatSpecialDateStr(item.saleStartDate) ;
                	let saleEndDateShow = _self.formatSpecialDateStr(item.saleEndDate) ;
                	let statusShow = _self._getStatusShow(item.statusDes) ;
                	let sequenceNumber = item.sequenceNumber*1 ;
                	//let flyerStatusShow = _self._getFlyerStatusMap(item.flyerStatus) ;
                	//console.info('flyerStatusShow : ' + flyerStatusShow + "---- flyerStatus : " + item.flyerStatus) ;
                	//let moneyShow = item.money + item.moneyUnit ;
                	let obj = {saleStartDateShow,saleEndDateShow,statusShow,sequenceNumber} ;
                	let newObj = Object.assign({},item,obj) ;
                    vmList.push(newObj) ;
                }) ;
                _initTooltip() ;
        	}else{
        		util.toastDanger('查询出错!',topHight) ;
        	}
        },function(err){
        	util.hideLoading() ;
        	util.toastDanger('网络故障查询出错!',topHight) ;
        });
        
    }
}




//生成一个随机数
function random (min,max){
    return function(){
        return _.random(min,max);
    };
}

//查询数据库的api
//function queryDbApi ({toPageNum,pageSize,orderName,isAsc}){
//    let records7List = [] ;
//    //生成0-5的随机数
//    let r = random(1,9) ;
//    let min = toPageNum *10 ;
//    let r2 = random(min ,min +pageSize) ;
//    for(let i = 0 ; i < pageSize ; i ++){
//        //let cur = _.random(0, 5);
//        let obj = {"subcode":"OB"+ r(),"serviceType":"F"+ r(),"status": r2(),"saleStartDate":"2016/01/0"+ r(),
//                "saleEndDate":"2016/12/2"+ r(),"travelStartDate":"2016/01/0"+ r(),"travelEndDate":"2016/12/2"+ r(),
//                "loc1":"11"+ r(),"loc2":"1234567"+ r(),"flyerStatus":""+ r(),"money":"99"+ r()+"CNY","descr":"描述" + r(),
//                "lastUpdateUser":"yicj"+ r(),"lastUpdateDate":"2016/01/01 14:0"+ r()
//        } ;
//        records7List.push(obj) ;
//    }
//
//
//    orderListData(records7List,orderName,isAsc) ;
//    var pageBean = {
//        curPage:toPageNum,
//        pageSize:pageSize,
//        pageNumList:[1,2,3,4,5],
//        pageCount:5,
//        recordList:records7List,
//        recordCount:100
//    } ;
//   
//    return new Promise(function(resolve,reject){
//        setTimeout(function(){
//            resolve(pageBean) ;
//        },300) ;
//    }) ;
//}
// function initVue(s7){
   
// }
//function initQueryPage(){
//	//初始化查询条件中的日期控件
//	//$('.query_row .datepicker').datepicker({ showButtonPanel:true});
//}
export default Records7Query ;
