//define(function (require, exports, module) {
	  var controllers = require('./controllers') ;
	  //var util = require('../util/S7FormDataUtil') ;
	  var S7FormDataUtil = require('../util/S7FormDataUtil') ;
	  var _ = require('underscore_lib') ;
	  var util = require('util_lib') ;

	  //当提交的时候将页面上所有字段的$dirty全部置为true
	  function changeInputStatus4Submit(data,myForm){
	  		var keys1 = _.keys(data) ;
	  		var keys2 = _.keys(myForm) ;
	  		_.each(keys2,function(item){
	  			if(_.contains(keys1,item)){
	  				 myForm[item].$setDirty(true) ;
	  			}
	  		}) ;
	  } 
	    //保存表格数据到后台
      //headerController
	  controllers.controller('HeaderCtrl',['$scope','FormData','HttpOperService','$log',function($scope,FormData,HttpOperService,$log){
	  	  $scope.contextPath = FormData.contextPath ;
	  	  $scope.data = FormData ;
	  	  var action  = $.trim($("#action").val()) ;
    	  var headerTipStr = "新建服务费用" ;
    	  if(action=="add"){
			 headerTipStr = "新建服务费用" ;
		  }else{//表示为修改页面跳转过来的
		  	  headerTipStr = "更新服务费用" ;
		  }
    	  $scope.headerTipStr = headerTipStr ;
	  	  //提交表单数据
	  	  $scope.submitForm = function(saveOrSaveAndPublish){
			   var action = $scope.data.action ;
			    var sel3ShowStr =  $scope.data.sel3.showStr ;
			    var flag = validator.form() ;
			    var ngFlag = $scope.myForm.$valid ;
			    //$log.info('flag : ' + flag) ;
			    //$log.info('ngFlag : '  + ngFlag) ;
			    if(action=='add'&&sel3ShowStr==''){
			   		$.showTuiErrorDialog('请选择服务到最后一级！');
			     }else{
			     	changeInputStatus4Submit($scope.data,$scope.myForm) ;
				    if(flag&&ngFlag){
					   saveFormData(saveOrSaveAndPublish,$scope.data) ;
				    }
			     }
		   };
	  	  
	  	    $scope.backPage = function (){
	  		   var contextPath = $.trim($("#contextPath").val());
			   window.location.href= contextPath+'/oc/toQueryS7UI.action' ;
		    };
	  	    /**
			 * <pre>
			 * 	功能描述:保存表单数据
			 * </pre>
			 * @param {Object} operType  ['save','saveAndPublish']  点击‘保存’,‘保存并发布’
			 */
		      function saveFormData (operType,formData){
					var tokenId = $("#tokenId").val() ;
					var flag = false ;
					var s7 = S7FormDataUtil.convertFormDataToS7(formData) ;
					flag = S7FormDataUtil.validFormData(s7,formData) ;
					//flag = false;//本地测试禁止表单提交
					if(flag){//如果校验通过的话则提交表单数据到后台
						$.showTuiConfirmDialog('保存?', function() {
							//特殊出来日期，生效日期和结束日期
							if(s7.firstMaintenanceDate.length>0){
								s7.firstMaintenanceDate = s7.firstMaintenanceDate+":00" ;
							}
							if(s7.lastMaintenanceDate.length>0){
								s7.lastMaintenanceDate = s7.lastMaintenanceDate+":59" ;
							}
							var url = "" ;
							if(operType=='save'){
								if(formData.action == "add"||formData.action == "copy"){//新增数据的话
									url = formData.contextPath + "/s7/addS7.action" ;
								}else if(formData.action=="update"){//更新数据的话
									url = formData.contextPath + "/s7/updateS7.action" ;
								}
							}else if (operType=='saveAndPublish'){
								url = formData.contextPath + "/s7/saveAndPublishS7.action" ;
							}
							var config = {"tokenId":tokenId} ;
							util.showLoading() ;
							var promise = HttpOperService.postDate(url,s7,config) ;
							promise.then(function (data) {
								util.hideLoading() ;
								if (data.flag == 'true' ) {
									$.showTuiSuccessDialog('保存成功！', function() {
										window.location.href= formData.contextPath+'/oc/toQueryS7UI.action' ;
									});
								} else if(data.timeMsg!=undefined&&data.timeMsg!=''){
									$.showTuiErrorDialog(data.timeMsg);
								} else {
									$.showTuiErrorDialog('保存数据出错！');
								}
							},function(error){
								util.hideLoading() ;
								$.showTuiErrorDialog('保存数据出错！');
							}) ;
						});
					}
			 }
	  	  
	  }])  ;
//}) ;