//define(function(require, exports, module) {
	// 通过require引入依赖
	//var $ = require('jquery');
'use strict' ;
var httpClient = require('HttpClientUtil_lib') ;
var util = require('util_lib') ;
var _ = require('lodash_lib') ;
const topHight = 140 ;

//item.statusDes=='1'(只有状态为1的才能删除)
class S7DeleteClass{
	//批量删除s7ListItem
	batchDeleteByIds(idArr,records7List,pageBar){
		let _self = this ;
		if(idArr&&idArr.length>0){
			let canDeleteFlag =  this._checkCanDeleteFlag(idArr,records7List) ;
			if(canDeleteFlag){
				$.showTuiConfirmDialog('确认删除?', function() {
					util.showLoading() ;
					let ajaxing = _self._doDeleteApi(idArr) ;
					$.when(ajaxing).done(function(retData){
						util.hideLoading() ;
						_self._removeDeleteItems(idArr,records7List) ;
						util.toastSuccess('删除成功!',topHight) ;
						$("#checkAllRecords7").prop('checked',false) ;
						pageBar.recordCount = pageBar.recordCount - idArr.length ;
						//$("#checkAllRecords7").trigger('click') ;
					}).fail(function(err){
						util.hideLoading() ;
						util.toastDanger('删除失败!',topHight) ;
					}) ;
				}) ;
			}else{
				util.toastDanger("包含'已发布'的记录，不能删除!",topHight) ;
			}
		}else{
			util.toastDanger('请选择需要【删除】的记录!',topHight) ;
		}
	}
	
	
	_doDeleteApi(idArr){
		var param = {"ids":idArr};
		let contextPath = $("#contextPath").val() ;
		let serverURL = contextPath +"/s7/batchDeleteS7.action" ;
		var ajaxing = httpClient.dealAjaxRequest4SimpleParam(serverURL,param) ;
		return ajaxing ;
	}
	_removeDeleteItems(idArr,records7List){
		for(let id of idArr){
			records7List.$remove(records7List.find(t => t.id === id)) ;
		}
	}
	//检查准备要删除的数据是否合法
	_checkCanDeleteFlag(idArr,records7List){
		let canDeleteFlag = true ;
		for(let id of idArr){
			let tmp = _.find(records7List,function(o) { 
				if(o.id === id&&o.statusDes!=='1'){
					return true ;
				}
				return false; 
			});
			if(tmp!=undefined){
				canDeleteFlag = false;
				break ;
			}
		}
		return canDeleteFlag ;
	}
}
export default S7DeleteClass ;