'use strict' ;
require('modal_lib') ;
var util = require('util_lib') ;
var httpClient = require('../lib/HttpClientUtil') ;
var ModalHelper = require('../lib/modal.helper') ;
var moment = require('moment_lib') ;
var modalHelper = new ModalHelper('abortTipInfo') ;
var datetimeForm = "YYYY-MM-DD hh:mm" ;
var _ = require('lodash_lib') ;
const topHight = 140 ;

function convertDateTimeStr2Date(str){
	return moment(str, datetimeForm) ;
}
/*由于后台返回来的日期带时和分 yyyy-mm-dd hh:mm**/
function truncateDateTime (datetimeStr){
	var retStr = "" ;
	datetimeStr = datetimeStr || '' ;
	var infos = datetimeStr.split(' ') ;
	if(infos&&infos.length==2){
		retStr = infos[0] ;
	}
	return retStr ;
}

class S7AbortClass{
	
	constructor(){
		
	}
	
	showBatchAbortS7UI(idArr,records7List){
		//console.info('准备批量截止s7....................') ;
		if(idArr==null||idArr.length==0){
			util.toastDanger('请选择需要【截止】的记录!',topHight) ;
			return ;
		}
		let hasExpiredItemFlag = this._checkContainsExpiredItem(idArr,records7List) ;
		if(hasExpiredItemFlag){
			util.toastDanger("包含【已过期】的记录，无法截止!") ;
		}else{
			var _self = this ;
			this.cleanInputInfo() ;
			$('#abortModal').modal('show') ;
		}
	}
	
	//显示截止页
	batchAbortConfirm(idArr,records7List){
		//console.info('你点击的确认截止按钮............' + new Date()) ;
		//清空提示信息
		this.cleanTipInfo() ;
		var flag = this._checkInputDateValid(idArr,records7List) ;
		if(flag){
		   //1.隐藏模态框
		   this.addSuccessTip("操作中请稍后.....") ;
		   this.canNotOperModal() ;
		   //2.保存数据到数据库
		   var promise = this._doSaveData2DB(idArr) ;
		   let _self = this ;
		   $.when(promise).done(function(retData){
			  _self._deal4Result(retData,idArr,records7List) ;
		   }).fail(function(err){
			  _self.cleanTipInfo() ;
			  _self.addErrorTip("操作失败!") ;
		   }) ;
		}
	}
	_deal4Result(retData,idArr,records7List){
		var _self = this ;
		var lastMaintenanceDate = $("#lastMaintenanceDate").val() ;
		//清理所有的提示信息
		_self.cleanTipInfo() ;
		if(retData.flag=='true'){
			_self.addSuccessTip("操作成功,2秒后将关闭窗口...") ;
			//更新页面上的数据
			for(let id of idArr){
				for(let item of records7List){
					if(item.id === id){
						item.saleEndDate = lastMaintenanceDate ;
						item.saleEndDateShow= _self.formatSpecialDateStr(lastMaintenanceDate) ;
					}
				}
			}
			//将所有勾选的checkbox取消勾选
			$(":checkbox[name=records7_checkbox]:checked").prop("checked",false);
			//将所有的s5checkbox选中状态消去
			$("#checkAllRecords7").prop('checked',false) ;
			//两秒钟后关闭模态框
			setTimeout(function(){
				_self.canOperModal() ;//模态框可以操作
				$('#abortModal').modal('hide') ;//关闭模态框
			},2000) ;
		}else{
			_self.addErrorTip("操作失败!") ;
		}
	}
	formatSpecialDateStr(dataStr){
    	//2015-01-01 00:00
    	let retStr = '' ;
    	// if(dataStr&&dataStr.length>0){
    	// 	let infos = _.split(dataStr ,' ') ;
    	// 	retStr = infos[0] ;
    	// }
		retStr = dataStr ;
    	return _.replace(retStr, /-/g, '/') ;
    }
	_doSaveData2DB(idArr){
		//console.info('保存截止数据到数据库.........' +new Date()) ;
		var ids = "" ;
		for(let id of idArr){
			ids += id+"," ;
		}
		//去掉最后一个逗号
		var idsLen = ids.length ;
		if(idsLen>1){
			ids = ids.substring(0,idsLen-1) ;
		}
		var lastMaintenanceDate = $("#lastMaintenanceDate").val() +":59" ;
		var jsonParam = {"lastMaintenanceDate":lastMaintenanceDate,"ids":ids};
		var serverUrl = $("#abortModalConfirm").attr('url')  ;
		//console.info("serverUrl : " + serverUrl) ;
		return httpClient.dealAjaxRequest4SimpleParam(serverUrl,jsonParam) ;
	}
	
	//校验输入的日期是否合法
	_checkInputDateValid(idArr,records7List){
		var flag = false;
		var _self = this ;
		var inputDateStr = $.trim($("#lastMaintenanceDate").val()) ;
		if(inputDateStr.length==0){
			_self.addErrorTip("截止日期必填!") ;
		}else{
			var tttFlag1 = util.isDateTimeOC(inputDateStr) ;
			if(!tttFlag1){
				_self.addErrorTip("日期格式不合法!") ;
				return false;
			}
			var inputDate = convertDateTimeStr2Date(inputDateStr) ;
			var isBiggerThanCurrent = util.isBiggerDateTimeThanCurrentNextHour(inputDateStr) ;
			if(!isBiggerThanCurrent){
				_self.addErrorTip("截止日期必须大于当前时间下一小时0分!") ;
			}else{
				var allBigger = true ;
				var checkedStartDateArr = [] ;
				for(let id of idArr){
					_.find(records7List,function(item){
						if(item.id===id){
							var curStartDate = item.saleStartDate ;
							checkedStartDateArr.push(convertDateTimeStr2Date(curStartDate));
						}
					}) ;
				}
				////////////////////////////////////
				var len =checkedStartDateArr.length ;
				for(var i = 0 ; i < len ; i++){
					var t = checkedStartDateArr[i] ;
					if(inputDate<t){
						allBigger = false;
					}
				}
				//如果大于所有记录的起始日期
				if(allBigger){
					flag = true ;
				}else{
					_self.addErrorTip("截止日期目前的校验是需要 ≥ 销售生效日期!") ;
				}
			}
		}
		return flag ;
	}
	//检查是否包含有已过期的记录
	_checkContainsExpiredItem(idArr,records7List){
		var hasExpiredItemFlag = false;
		for(let id of idArr){
			_.find(records7List,function(item){
				if(item.id === id && item.statusDes==="4"){
					hasExpiredItemFlag = true ;
				}
			}) ;
		}
		return hasExpiredItemFlag ;
	}
	
	canNotOperModal(){
		$("#abortModalConfirm").addClass("hidden") ;//hidden
	}
	canOperModal(){
		$("#abortModalConfirm").removeClass("hidden") ;
	}
	
	cleanInputInfo(){
		$("#lastMaintenanceDate").val("") ;
		this.cleanTipInfo() ;
	}
	cleanTipInfo(){
		modalHelper.cleanTipInfo() ;
	}
	addErrorTip(errMsg){
		modalHelper.addErrorTip(errMsg) ;
	}
	addSuccessTip(sucMsg){
		modalHelper.addSuccessTip(sucMsg) ;
	}
}

export default S7AbortClass ;
	
