//define(function(require, exports, module) {
	//var pathStr = require.resolve('src/main') ;
	//console.info("path : " + pathStr) ;
	require('tui_core_lib') ;
	require('tui_drag_lib') ;
	require('tui_dialog_lib') ;
	require('jq_datepicker_lib') ;
	require("jq_timepicker_lib") ;
	require('jq_validate_lib') ;
	require('jq_autocomplete_lib') ;
	require('ng_bindonce_lib') ;
	require('ng_messages_lib') ;
	require('selectize_lib') ;
	var Headroom = require('headroom_lib') ;
	
	
	
	require("./router") ;
	require("../lib/modal") ;
	module.exports = {
 		init: function(){
			angular.element(document).ready(function() {
			    angular.bootstrap(document, ['app']);
				pageLoadComplete() ;
			});
			//初始化headroom插件
		    var $myheader = $('#myheader');
		    var headroom  = new Headroom($myheader[0]);
		    headroom.init();
 		}
 	};
	
 	function pageLoadComplete (){
 		$("body").addClass("helper_background_color1") ;
		$("#loading").addClass('hidden') ;
		$("#EditMainBoxDiv").removeClass('hidden') ;
		$("#myheader").removeClass('hidden') ;
 	}
//});
