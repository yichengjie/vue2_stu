//define(function(require) {
//var Headroom =  require('headroom_lib') ;
//var S7Query = require('./s7query');
require('tui_core_lib');
require('tui_drag_lib') ;
require('tui_dialog_lib');
require('jq_datepicker_lib');
require("jq_timepicker_lib") ;
require('is_loading_lib') ;
var util = require('../lib/util') ;
var S7BatchImport = require('./s7BatchImport') ;
import S7DeleteClass from './s7delete' ;
import S7PublishClass from './s7publish' ;
import S7AbortClass from './s7abort' ;
import S7ExportClass from './s7export' ;
/////////////////////////////////////
import Records7Query from './s7query' ;
const defaultOrderFlag = true ;
const topHight = 140 ;

// let s7Delete = null ;
// let s7Publish = null ;
// let s7Abort = null ;
// let s7Export = null ;
// let s7Query = null ;

class S7QueryMain {
    constructor(){
       this.s7Delete = new S7DeleteClass() ;
       this.s7Publish = new S7PublishClass() ;
       this.s7Abort = new S7AbortClass() ;
       this.s7Export = new S7ExportClass() ;
       this.s7Query = new Records7Query();
    }
    appStart(){
       let {s7Delete,s7Publish,s7Abort,s7Export,s7Query} = this ;
        //初始化vue组件
        new Vue({
            el: '#app',
            data: {
                records7List:[],
                tableTitleOrder:{"subcode":defaultOrderFlag,"serviceType":defaultOrderFlag,"sequenceNumber":defaultOrderFlag,"statusDes":defaultOrderFlag,"saleStartDate":defaultOrderFlag,
                    "saleEndDate":defaultOrderFlag,"travelStartDate":defaultOrderFlag,"travelEndDate":defaultOrderFlag,"loc1":defaultOrderFlag,
                    "loc2":defaultOrderFlag,"flyerStatus":defaultOrderFlag,"money":defaultOrderFlag,"descr":defaultOrderFlag,"lastUpdateUser":defaultOrderFlag,
                    "lastUpdateDate":defaultOrderFlag
                },/**所有列的排序状态 */
                orderTitleName:"",/**当前排序的列名称 */
                queryDBFlag:false,/**是否针对所有记录进行排序 */
                showMoreQuerySectionFlag:false,/**显示更多查询条件 */
                dealPageOrderFlag:false,/**是否进行过页面静态排序 */
                pageBar:{
                    "curPage":0,
                    "pageSize":0,
                    "pgArr":[],
                    "pageCount":0,
                    "recordCount":0,
                    "isQueryDB":false
               },
              formData:{
                statusArr:[],/**发布状态 */
                effStatusArr:[],/**生效状态 */
                subcode:"",
                startSequenceNumber:"", 
                endSequenceNumber:"",
                serviceTypeArr:[],/**服务等级(服务类型) */
                effectMinDate:"",
                effectMaxDate:"",
                travelStartDate:"",
                travelEndDate:"",
                passengerTypeCodeArr:[],/**常旅客等级 */
                geoSpecLoc1:"",
                geoSpecLoc2:"",
                updateUser:"",
                updateStartDate:"",
                updateEndDate:""
              },
              queryFFPList:[]
            },
            ready:function(){
                //console.info('vue app is ready ...') ;
            	//vue实例化完成以后，准备实例化页面上的其他组件
            	initOtherPlugin() ;
            	initPageBasePlugin() ;
            	new S7BatchImport().init() ;
                let _self = this; 
                let ajaxing = s7Query.fetchFFPPageDataApi() ;
                $.when(ajaxing).then(function(retData){
                  retData.forEach(function(item){
                    _self.queryFFPList.push(item) ;
                  }) ;
                  //s7Query.setQueryFFPList(retData) ;
                },function(err){
                  util.toastDanger('初始化常客等级数据出错!',topHight) ;
                });
                
            },
            methods:{
                switchGeoLocValue:function(){
                    let loc1 = this.formData.geoSpecLoc1 ;
                    let loc2 = this.formData.geoSpecLoc2 ;
                    this.formData.geoSpecLoc1 = loc2 ;
                    this.formData.geoSpecLoc2 = loc1 ;
                },
                clickTableTitle:function(titleName){
                    //判断是不是再同一个标题上点击
                    let oldFlag = !defaultOrderFlag ;
                    if(this.orderTitleName!=null&&this.orderTitleName===titleName){
                      oldFlag = this.tableTitleOrder[titleName] ;
                    }	
                    //1.更新当前排序呢的列名称
                    this.orderTitleName = titleName ;
                    //2.更新当前排序的状态(升序/倒序)
                    //console.info('oldFlag : ' + oldFlag) ;
                    let keys = Object.keys(this.tableTitleOrder) ;
                    for(let key of keys){
                        this.tableTitleOrder[key] = defaultOrderFlag ;
                    }
                    this.tableTitleOrder[titleName] = !oldFlag ;
                    //2.执行排序操作
                    //let queryDBFlag = $("")
                    if(this.queryDBFlag){//查询数据库
                      //let toPageNum = this.pageBar.curPage*1 ;
                    let toPageNum = 1 ;
                      this.queryDB(toPageNum) ;
                    }else{
                      this.dealPageOrderFlag = true;
                      let list = this.records7List ;
                      let ascFlag = !oldFlag ;
                      //console.info('ascFlag : ' + ascFlag) ;
                      orderListData(list,titleName,ascFlag) ;
                    }
                },
                queryDB:function(toPageNum){
                    //当没有选中对所有记录进行排序是，如果是查询数据库操作，
                    //都应该对之前的排序状态进行清空操作
                    $("#checkAllRecords7").prop('checked',false) ;
                    if(!this.queryDBFlag){//没有勾选查询全部时，清除排序状态
                        this._clearOrderStatusOnPage() ;
                    }
                    this.dealPageOrderFlag = false;
                    var config = {
                        toPageNum:1,
                        vmList:this.records7List ,
                        vmPageBar:this.pageBar,
                        orderName:this.orderTitleName,
                        isAsc:this.tableTitleOrder[this.orderTitleName]
                    } ;
                    if(toPageNum&&toPageNum>0){
                      config.toPageNum = toPageNum ; 
                    }
                    s7Query.query4Page(this.formData,config) ;
                },
                _clearOrderStatusOnPage:function(){/**清楚页面上排序状态 */
                    let keys = Object.keys(this.tableTitleOrder) ;
                    keys.forEach(key=>{
                        this.tableTitleOrder[key] = defaultOrderFlag ;
                    }) ;
                    this.orderTitleName = "" ;
                    this.dealPageOrderFlag = false;
                },
                handleClickQuery:function(){/**点击查询按钮时 */
                    //当点击查询按钮的时候清楚页面上的所有的排序状态
                    this._clearOrderStatusOnPage() ;
                    //清楚所有的排序状态，保持默认排序
                    let toPageNum = 1 ;
                    this.queryDB(toPageNum) ;
                },
                toPage:function(pnum){
                    //触发查询操作
                    //this.pageBar.curPage = pnum ;
                    if(pnum!=this.pageBar.curPage){
                        let toPageNum = pnum ;
                        this.queryDB(toPageNum) ;
                    }
                },
                toPerviousPage:function(){
                    if(this.pageBar.curPage*1>1){
                        //触发查询操作
                        //this.pageBar.curPage = this.pageBar.curPage*1 -1 ;
                        let toPageNum = this.pageBar.curPage*1 -1 ;
                        this.queryDB(toPageNum) ;
                    }
                },
                toNextPage:function(){
                    if(this.pageBar.curPage*1<this.pageBar.pageCount*1){
                        //触发查询操作
                        //this.pageBar.curPage = this.pageBar.curPage*1 +1 ;
                        let toPageNum = this.pageBar.curPage*1 +1;
                        this.queryDB(toPageNum) ;
                    }
                },
                pageConfirm:function(){
                    var pageOkInput =  $("#pageOkInput").val() ;
                    //将当前页数据更新
                    var pageOkInputNum = pageOkInput*1 ;
                    if(pageOkInputNum>0&&pageOkInputNum<=this.pageBar.pageCount*1){
                        let toPageNum = pageOkInput*1;
                        this.queryDB(toPageNum) ;
                    }else{
                        $("#pageOkInput").val(this.pageBar.curPage) ;
                    }
                },
                checkAllRecords7:function(e){
                    let flag = e.target.checked ;
                    $(":checkbox[name='records7_checkbox']").prop('checked',flag) ;
                },
                checkRecords7Item:function(e){
                    let flag = e.target.checked ;
                    let checkAll = $("#checkAllRecords7") ; 
                    let len1 = $(":checkbox[name='records7_checkbox']:checked").length ;
                    let len2 =  $(":checkbox[name='records7_checkbox']").length ;
                    if(len1<len2){
                        checkAll.prop('checked',false) ;
                    }else{
                        checkAll.prop('checked',true) ;
                    }
                },
                batchDeleteS7:function(e){
                  let idArr = [] ;
                  $(":checkbox[name='records7_checkbox']:checked").each(function(){
                    let id = $(this).val() ;
                    idArr.push(id) ;
                  });
                  s7Delete.batchDeleteByIds(idArr,this.records7List,this.pageBar) ;
                },
                batchPublishS7:function(e){
                  let idArr = [] ;
                  $(":checkbox[name='records7_checkbox']:checked").each(function(){
                    let id = $(this).val() ;
                    idArr.push(id) ;
                  });
                  s7Publish.batchPublishS7(idArr,this.records7List) ;
                },
                showBatchAbortS7UI:function(e){
                  let idArr = [] ;
                  $(":checkbox[name='records7_checkbox']:checked").each(function(){
                    let id = $(this).val() ;
                    idArr.push(id) ;
                  });
                  s7Abort.showBatchAbortS7UI(idArr,this.records7List) ;
                },
                batchAbortConfirm:function(){
                  let idArr = [] ;
                  $(":checkbox[name='records7_checkbox']:checked").each(function(){
                    let id = $(this).val() ;
                    idArr.push(id) ;
                  });
                  s7Abort.batchAbortConfirm(idArr,this.records7List) ;
                },
                batchExport2Excel:function(){
                  //导出数据到excel中
                  s7Export.handleExport(this.formData) ;
                }
                
            }
        }) ;
    }
}

//实例化引用
new S7QueryMain().appStart() ;


function initOtherPlugin(){
  $(".dropdown-oc").find(".dropdown-trigger").click(function (e) {
    e.stopPropagation() ;
    $(".dropdown-menu-oc").removeClass('open') ;
    $(this).parents(".dropdown-oc").find(".dropdown-menu-oc").toggleClass('open') ;
  }) ;

  $(document).click(function(e){
      e.stopPropagation() ;
      $('.dropdown-menu-oc').removeClass('open') ;
  }) ;
}
/**
 * 初始化页面上的基础插件
 * eg:各个日期控件
 * @returns
 */
function initPageBasePlugin(){
	//初始化页面查询条件中的日期控件
	$('.query_row .datepicker').datepicker({ showButtonPanel:true});
	//实例化截止模态框上的日期控件
	var optionObj = {} ;
	var minDate = new Date() ;
    optionObj.dateFormat = "yy-mm-dd" ;
	optionObj.timeFormat = 'HH:mm' ;
	optionObj.timeText="&nbsp;&nbsp;时间" ; 
    optionObj.hourText ="&nbsp;&nbsp;时" ;
    optionObj.minuteText ="&nbsp;&nbsp;分" ;  
    optionObj.currentText = "当前" ;
    optionObj.closeText = "关闭" ;
    optionObj.minDate = minDate ;
    optionObj.showButtonPanel = true ;
    $("#lastMaintenanceDate").datetimepicker(optionObj) ;
}

//排序数据
function orderListData(list,titleName,ascFlag){
	//console.info('titleName : ' + titleName + " ,ascFlag :  " + ascFlag) ;
    if(titleName&&titleName.length>0&&titleName!=='default'){
        let orderTypeStr = ascFlag ? 'asc' : 'desc' ;
        let retArr = _.orderBy(list, [titleName], [orderTypeStr]);
        list.splice(0,list.length) ;
        retArr.forEach(item => list.push(item) ) ;
    }
}

//  var S7Publish = require('./s7publish');
//  var s7publish = new S7Publish();
//  s7publish.init();

/*var S7Delete = require('./s7delete');
var s7delete = new S7Delete();
s7delete.init();*/

//终止操作相关代码
/*var S7Abort = require('./s7abort') ;
var s7abort = new S7Abort() ;
s7abort.init() ;*/
//

  
/*  import S7Export from './s7export' ;
  new S7Export() ;*/
  
  
  
  
//  $("#moreInputBtn").click(function(){
//	  //srchInfoMore
//	  util.slideToggleDiv('srchInfoMore') ;
//  }) ;
  

  //当点击复制数据的时候
/*  $('#copyRecord7Btn').bind('click',function (event) {
    //console.info('复制一条数据。。。。。。') ;
    var checkedR7s = $(":checkbox[name=s7check]:checked") ;
    var len = checkedR7s.length ;
    if(len==1){
      var list_item = checkedR7s.parents('li') ;
      var s7Id = list_item.find(":input[name=s7id]").val() ;
      var appName = util.getAppName() ;
      var toUrl = "/"+appName+"/oc/toCopyS7UI.action?s7Id="+ s7Id;
      window.location.href = toUrl ;
    }else if(len==0){
      $.showTuiErrorDialog('请选择一条需要复制的记录!');
    }else{
      $.showTuiErrorDialog('只能选择一条需要复制的记录!');
    }
}) ;*/



//初始化headroom插件
//$('#myheader').headroom();
//var $myheader = $('#myheader');
//var headroom  = new Headroom($myheader[0]);
//headroom.init();
//}) ;
  
