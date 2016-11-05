<template>
    <div>
          <div class="pull-right clearfix" style="margin-bottom: 8px">
            <button class="btn btn-success btn-sm" v-on:click="toAddUI">新建</button>
            <button class="btn btn-default btn-sm" v-on:click ="doDeleteOper">删除</button>
            <button class="btn btn-default btn-sm" v-on:click ="doPublishOper">发布</button>
            <button class="btn btn-default btn-sm" v-on:click ="showAbortUI">截止</button>
            <div class ="dropdown-oc">
                <div class="btn-group">
                    <button class="btn btn-default btn-sm" id="batchImportBtn" for="batchImportFileInput">批量导入</button>
                    <button class="btn btn-default btn-sm dropdown-trigger"><i class="glyphicon glyphicon-triangle-bottom"></i></button>
                </div>
                <ul class ="dropdown-menu-oc">
                    <li onclick="location.href='${pageContext.request.contextPath}/ocimport/download.action'">下载模板</li>
                </ul>
            </div>
        </div>
        <span class="clearfix"></span>

        <form method="post"  enctype="multipart/form-data" id ="batchImportForm">
            <input type="file" name ="file" id ="batchImportFileInput" style="display: none"/>
        </form>

        	<div class="modal fade" id ="abortModal" data-backdrop="static">
                <div class="modal-dialog" style = "width:400px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">批量截止操作</h4>
                        </div>
                        <div class="modal-body">
                            <div class ="row">
                                <label class="col-sm-3"><span class="marginRight15"></span>截止日期</label>
                                <div class="col-sm-6">
                                    <input type="text" class="common_input"  id="lastMaintenanceDate"
                                        name="lastMaintenanceDate" style ="width:96%"/>
                                    <label for="lastMaintenanceDate" class="glyphicon glyphicon-calendar iconfont_box"></label>      
                                </div>
                            </div>
                            <br />
                            <div>
                                <ul id ="abortTipInfo"></ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id ="abortModalConfirm" v-on:click ="handleAbortConfirm"
                                    url ="${pageContext.request.contextPath}/s7/batchObortR7.action">确定</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

            <div class="modal fade" id ="batchImportModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">批量导入操作</h4>
                        </div>
                        <div class="modal-body">
                            <div class ="row">
                                <div class ="col-sm-1">
                                </div>
                                <div class ="col-sm-10">
                                    <p>文件&nbsp;:&nbsp;<span id ="batchImportFileName"></span></p>
                                </div>
                            </div>
                            <br/>
                            <div class ="row">
                                <div class ="col-sm-1">

                                </div>
                                <div class ="col-sm-10">
                                    <ul id ="batchImportTipInfo">
                                    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id ="submitBatchImportFormBtn">导入</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

    </div>
</template>
<script>
    export default {
        name:'operbar',
        methods:{
            toAddUI(){
                console.info('准备跳转到新增页面上去!') ;
            },
            doDeleteOper(){
                console.info('准备批量删除操作...') ;
            },
            doPublishOper(){
                console.info('准备发布操作...') ;
            },
            showAbortUI(){
                console.info('显示截止模态框...') ;
            },
            handleAbortConfirm(){
                console.info('显示截止模态框...') ;
            }
        },
        mounted(){
           initPagePlugin() ;
        }
    }

    function initPagePlugin(){
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
</script>
<style>
    
</style>
