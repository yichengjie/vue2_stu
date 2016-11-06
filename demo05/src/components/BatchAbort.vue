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
                        <ul id ="abortTipInfo">
                            <li v-for="item in tipMsgArr">
                                <span v-bind:class="{'text-success': tipSuccessFlag,'text-danger': !tipSuccessFlag }">
                                    {{item}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" v-on:click ="closeModal" data-dismiss="modal">关闭</button>
                    <button type="button" v-show ="canOperFlag" class="btn btn-primary" id ="abortModalConfirm" v-on:click ="handleAbortConfirm"
                            url ="${pageContext.request.contextPath}/s7/batchObortR7.action">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DateTimepicker from './DateTimepicker.vue' ;
    import {batchAbortApi} from '../api/index.js' ;
    export default {
        data(){
            return {
                abortDateTimeInput:"",
                tipSuccessFlag:false,
                tipMsgArr:[],
                canOperFlag:true
            } ;
        },
        methods:{
            handleAbortConfirm(){
                console.info('确定截止...' +this.abortDateTimeInput) ;
                this.canOperFlag = false;
                //处理截止的业务逻辑
                this.clearTipInfo() ;
                this.tipSuccessFlag = true ;
                this.canOperFlag = false;
                this.tipMsgArr.push('操作中请稍后...') ;
                batchAbortApi().then(({flag,msg}) => {
                    this.canOperFlag = true;
                    this.clearTipInfo() ;
                    this.tipSuccessFlag = flag ;
                    this.tipMsgArr = msg ;
                    if(flag){
                        setTimeout(() =>{
                            this.abortDateTimeInput = "" ;
                            $("#abortModal").modal('hide') ;
                            this.clearTipInfo() ;
                        },1000) ;
                    }
                },err => {
                    this.clearTipInfo() ;
                    this.tipSuccessFlag = false;
                    this.canOperFlag = true;
                    this.tipMsgArr.push('网络请求出错!') ;
                }) ;
            },
            closeModal(){
                this.abortDateTimeInput = "" ;
                this.clearTipInfo() ;
            },
            clearTipInfo(){
               this.tipMsgArr.splice(0,this.tipMsgArr.length) ;
            }
        },
        components:{
            DateTimepicker
        }
    }
</script>
<style scoped>
  
</style>