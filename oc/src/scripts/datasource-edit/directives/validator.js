define(function(require, exports, module) {
	var util = require('../../lib/util') ;
	 var _ = require('underscore_lib') ;
	var app = angular.module("app.validator",[]) ;
	
	//oc日期
	app.directive('dateoc',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.dateoc = function(modelValue, viewValue) {
		                if(viewValue!=''){
	                        return util.isDateOC(viewValue);
	                    }
	                    return true ;
                };
            }
        };
    });
    
    //positiveInteger(正整数不包括'0')
    app.directive('pint',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$validators.pint = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.isPositiveInteger(viewValue);
                    }
                    return true;
                };
            }
        };
    });
    
    //tuiAlphanumericOrStart
	app.directive('alphanumericStart',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$validators.alphanumericStart = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.isAlphanumericOrStart(viewValue);
                    }
                    return true;
                };
            }
        };
    });
    
    app.directive('radioRequired',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$validators.radioRequired = function(modelValue,viewValue){
                    if(viewValue==''){
                        return false;
                    }
                    return true;
                };
            }
        };
    });
    
    
    /**
     *  var url =scope.data.contextPath+"/abr/checkSequcenceNumberNotExixt";
		var param = {"id":scope.data.id,"sequcenceNumber":viewValue}	                    	
    	var promise = HttpOperService.postDate(url,param) ;
    	promise.then(function(retData){
    		if(data.flag=='true'){
    		
    		}else{
    			
    		}
    	}) ;
     */
    
    app.directive('remoteValidate',['HttpOperService',function(HttpOperService){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$parsers.push(function(viewValue){
                    if(viewValue!=''){
							var url =scope.data.contextPath+"/abr/checkSequcenceNumberNotExixt.action";
							var param = {"id":scope.data.id,"sequcenceNumber":viewValue};	                    	
					    	var promise = HttpOperService.postDate(url,param) ;
					    	promise.then(function(retData){
					    		if(retData.flag=='true'){
					    				if(retData.existFlag=='true'){
					    					 ctrl.$setValidity('remoteValidate',false);
										}else{
											ctrl.$setValidity('remoteValidate',true);
										}
					    		}else{
					    			ctrl.$setValidity('remoteValidate',false);
					    		}
					    	}) ;
                    }
                    ctrl.$setValidity('remoteValidate',true);
                    return viewValue;
                });
            }
        };
    }]);
    
      //biggerDate
    app.directive('bd',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.bd = function(modelValue, viewValue) {
                    var compareVal = attrs['bd'] ;
                    if(viewValue!=''&&compareVal!=''){
                        return util.isBiggerDateThan(viewValue,compareVal) ;
                    }
                    return true;
                };
                attrs.$observe('bd', function() {
                    ctrl.$validate();
                });
            }
        };
    });

    //smallerDate
    app.directive('sd',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.sd = function(modelValue, viewValue) {
                    var compareVal = attrs['sd'] ;
                    if(viewValue!=''&&compareVal!=''){
                        return util.isSmallerDateThan(viewValue,compareVal) ; 
                    }
                    return true;
                };
                attrs.$observe('sd', function() {
                    ctrl.$validate();
                });
            }
        };
    });
    
    
  //biggerThanCurrent(当页面不可编辑的时候不校验‘大于当前日期’)
    app.directive('btc',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.btc = function(modelValue, viewValue) {
                	//注意这里判断当前控件是否是不可编辑状态，
                	//如果属于不可编辑状态，则不判断大于当前日期
                	////状态的判断//status ;//数据源的状态,未生效:1,已生效:2,已失效:3
                     var status = scope.data.status ;
	                 if(viewValue!=''&&!util.checkABRStatusIsDisabled(status)){
	                      return util.isBiggerThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        };
    });
   //biggerThanCurrent(无论是否可编辑都要校验字段是否‘大于当前日期’)
    app.directive('btc2',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.btc2 = function(modelValue, viewValue) {
                	//注意这里判断当前控件是否是不可编辑状态，
                	//如果属于不可编辑状态，则不判断大于当前日期
	                 if(viewValue!=''){
	                      return util.isBiggerThanCurrent(viewValue) ;
	                 }
	                 return true ;
                };
            }
        };
    });
	
}) ;