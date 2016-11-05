<template>
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
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            handleAbortConfirm(){
                console.info('显示截止模态框...') ;
            },
            closeModal(){
                
            }
        }
    }
</script>
<style scoped>
  
</style>