'use strict';
var httpClient = require('HttpClientUtil_lib') ;
var util = require('util_lib') ;
var moment = require('moment_lib') ;
var _ = require('lodash_lib') ;
const topHight = 140 ;

class S7PublishClass{
	//url="${pageContext.request.contextPath}/s7/s7publish.action"
	batchPublishS7(idArr,records7List){
		if(idArr.length===0){
			util.toastDanger('请选择需要【发布】的记录!！',topHight) ;
			return ;
		}
		let pubIdArr = [] ;
		let canPublishFlag = this._validate(idArr,pubIdArr,records7List) ;
		if(canPublishFlag){
			//console.info('pubIdArr : ' ,pubIdArr) ;
			this._doPublish(pubIdArr) ;
		}
	}
	
	_doPublish(ids){
		var param = {"s7IdList":ids};
		let contextPath = $("#contextPath").val() ;
		var url = contextPath+"/s7/s7publish.action";
		var ajaxing = httpClient.dealAjaxRequest4JSObj(url,param) ;
		$.when(ajaxing).done(function(retData){
			if (retData === 'PUBISHSUCCESS' ) {
				$.showTuiSuccessDialog('发布成功！', function() {
				  $("#s7QueryBtn").trigger('click') ;
				});
			} else {
				util.toastDanger('发布失败！',topHight) ;
			}
		}).fail(function(err){
			util.toastDanger('发布失败！',topHight) ;
		}) ;
	}
	_validate(idArr,retArr,records7List){
		let allValidate = true ;
		var sysDateStr = moment().format('YYYY/MM/DD') ;
		var sysDate = moment(sysDateStr,'YYYY/MM/DD') ;
		for(let id of idArr){
			if(allValidate){
				_.find(records7List,function(item){
					if(item.id === id){
						if(item.status==='1'){
							var effDateText = item.saleStartDateShow; 
							var discDateText = item.saleEndDateShow ;
							var effDate = moment(effDateText, 'YYYY/MM/DD');
							var discDate = moment(discDateText,'YYYY/MM/DD');
							if (effDate >= sysDate && discDate >= effDate) {
								retArr.push(id);
							} else {
								util.toastDanger('存在【未发布-已过期】的记录，不能发布！',topHight) ;
								allValidate = false;
							}
						}
					}
				});
			}
		}
		//如果不存在一个条可发布的记录，则不做任何反应
		if(retArr.length==0){
			return false;
		}
		return allValidate;
	}
}

export default S7PublishClass ;

