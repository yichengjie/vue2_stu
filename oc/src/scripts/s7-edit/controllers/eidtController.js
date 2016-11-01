//define(function (require, exports, module) {
	var controllers = require('./controllers') ;
	var jsonDate = require('../data/editJsonData') ;
	var EditUtil = require('../util/S7EditUtil') ;
	var commonUtil = require('../util/commonUtil') ;
	var util = require('util_lib') ;
	var ModalHelper = require('modal_helper_lib') ;
	var moment = require('moment_lib') ;
	//import {} from '../busi/BasicInfoControllerBusi.js' ;
	
	//最外层controller
	controllers.controller('EditController',['$scope','FormData','HttpOperService','TbShowHideServcie','FormEditStatusServcie','FormStatusService','CustomeEditTbStatusServcie','$timeout',function($scope,FormData,HttpOperService,TbShowHideServcie,FormEditStatusServcie,FormStatusService,CustomeEditTbStatusServcie,$timeout){
		$scope.contextPath = FormData.contextPath ;
		//是否是新版页面
		$scope.newVersionFlag = true ;
		//保留一份原始数据，方便数据初始化时使用
		$scope.orgData = angular.copy(FormData) ;
		//页面上的form数据
		$scope.data = FormData ;
		//页面上所有表格的显示或隐藏的的状态数据
		$scope.tableStatus = TbShowHideServcie ;//TableStatusServcie
		//表格复用的自定义是否显示
		$scope.customeEditTbStatus = CustomeEditTbStatusServcie ;
		//对表单注册校验
		var validator = $("#s7_form").validate({meta : ""});
		window.validator = validator ;
		//页面上所有控件的状态数据
		$scope.editStatus = FormEditStatusServcie ;
		$scope.showStatus = FormStatusService ;
		var s7Id = $("#s7Id").val() ;
		$scope.data.id = s7Id ;
		//日期问题
		var currDate = new Date();
		var curMonthStr = commonUtil.getFullDayOrMonthStr(currDate.getMonth()+1)  ;
		var curDateStr = commonUtil.getFullDayOrMonthStr(currDate.getDate()) ;
		var nextDateStr= commonUtil.getFullDayOrMonthStr(currDate.getDate() +1) ;
		//当前日期
		$scope.currentDateStr = currDate.getFullYear() +'-'+curMonthStr+ '-'+curDateStr;
		//下一天日期
		$scope.nextDateStr = currDate.getFullYear() +'-'+curMonthStr+ '-'+nextDateStr ;
		//所有的表格定义信息都在这里
		$scope.tableData = jsonDate.tableData ;
		//-------------区域对应的表格显示隐藏开始--------//
		//第一次进入页面时需要加载的数据
		//console.info('准备初始化页面数据..........') ;
		var url = '';
		var promise = null;
		if(FormData.action=="add"){//1.新增
			url = $scope.contextPath+'/s7/initPage4Add.action';
			promise = HttpOperService.getDataByUrl(url) ;
			EditUtil.initData.dealResultData4Add(promise,$scope) ;//serviceChooseList
			var nowStr = moment().add(1,"hours").format('YYYY-MM-DD HH');
			//moment().format('MMMM Do YYYY, h:mm:ss a'//起始日期会被设置默认值
			FormData.firstMaintenanceDate = nowStr+":00" ;
			//var dateStr = moment().format('YYYY-MM-DD');
			//FormData.lastMaintenanceDate = dateStr+" 23:59";
		}else if (FormData.action=="update"){
			url = $scope.contextPath+'/s7/initPage4Upate.action?s7Id='+$scope.data.id;
			promise = HttpOperService.getDataByUrl(url) ;
			EditUtil.initData.dealResult4Update(promise,$scope) ;
			$scope.newVersionFlag = false ;
		}else if (FormData.action=="copy"){
			url = $scope.contextPath+'/s7/initPage4Copy.action?s7Id='+$scope.data.id;
			promise = HttpOperService.getDataByUrl(url) ;
			//EditUtil.initData.dealResult4Update(promise,$scope) ;
			EditUtil.initData.dealResult4Copy(promise,$scope) ;
			$scope.newVersionFlag = false ;
		}
		
		
		$scope.submitTbTSKCustomeEdit = function(){
			var tipDivId = "tskCustomeTipInfo" ;
			var modalHelper = new ModalHelper(tipDivId) ;
			//tbTSKCustomeEdit_type//tbTSKCustomeEdit_index//tbTSKCustomeEdit_value
			var tbTSKCustomeEdit_type = $("#tbTSKCustomeEdit_type").val() ;
			var tbTSKCustomeEdit_index = $("#tbTSKCustomeEdit_index").val() ;
			var tbTSKCustomeEdit_value = $("#tbTSKCustomeEdit_value").val() ;
			var maxLength = $("#tbTSKCustomeEdit_value").attr("maxlength") ;
			var len = util.getByteNumOfStr(tbTSKCustomeEdit_value) ;
			modalHelper.cleanTipInfo() ;
			if(len>maxLength){
				modalHelper.addErrorTip('最多输入'+maxLength+'个字节!') ;
				return ;
			}else{
				$scope.data.listTsk202VO[tbTSKCustomeEdit_index*1][tbTSKCustomeEdit_type] = tbTSKCustomeEdit_value ;
				$('#tbTSK202Modal').modal('hide') ;
			}
		};
		
		
    }]) ;

//}) ;
