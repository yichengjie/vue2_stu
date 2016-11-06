<template>
    <div class="modal fade" id ="abortModal" data-backdrop="static">
        <div class="modal-dialog" style = "width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" v-on:click ="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">批量截止操作</h4>
                </div>
                <div class="modal-body">
                    <div class ="row">
                        <label class="col-sm-3"><span class="marginRight15"></span>截止日期</label>
                        <div class="col-sm-6">
                            <DateTimepicker v-model ="abortDateTimeInput" />      
                        </div>
                    </div>
                    <br />
                    <div>
                        <ul id ="abortTipInfo"></ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" v-on:click ="closeModal" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id ="abortModalConfirm" v-on:click ="handleAbortConfirm"
                            url ="${pageContext.request.contextPath}/s7/batchObortR7.action">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DateTimepicker from './DateTimepicker.vue' ;
    export default {
        data(){
            return {
                abortDateTimeInput:""
            } ;
        },
        methods:{
            handleAbortConfirm(){
                console.info('确定截止...' +this.abortDateTimeInput) ;
                this.abortDateTimeInput = "" ;
                $("#abortModal").modal('hide') ;
                //处理截止的业务逻辑
                //....
            },
            closeModal(){
                this.abortDateTimeInput = "" ;
            }
        },
        components:{
            DateTimepicker
        }
    }
</script>
<style scoped>
  
</style>