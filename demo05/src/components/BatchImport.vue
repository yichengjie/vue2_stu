<template>
    <div class="modal fade" id ="batchImportModal">
         <form method="post"  enctype="multipart/form-data" id ="batchImportForm">
            <input type="file" name ="file" id ="batchImportFileInput" style="display: none" 
                v-bind:value ="fileName" v-on:change ="showBatchImportUI2"/>
        </form>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" 
                        aria-label="Close" v-on:click ="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">批量导入操作</h4>
                </div>
                <div class="modal-body">
                    <div class ="row">
                        <div class ="col-sm-10 col-sm-offset-1">
                            <p>文件&nbsp;:&nbsp;<span id ="batchImportFileName">{{fileName}}</span></p>
                        </div>
                    </div>
                    <br/>
                    <div class ="row">
                        <div class ="col-sm-10 col-sm-offset-1">
                            <ul id ="batchImportTipInfo">
                                <li v-for="item in tipMagArr">
                                    <span v-bind:class="{'text-success': tipSuccessFlag,'text-danger': !tipSuccessFlag }">
                                        {{item}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" v-on:click ="closeModal" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" v-on:click ="confirmImport" class="btn btn-primary" id ="submitBatchImportFormBtn">导入</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {batchImportApi} from '../api/index.js' ; 
    export default {
       methods:{
           showBatchImportUI2(event){
              // console.info('value : ' + event.target.value) ;
              let newFileName = event.target.value ;
              this.fileName = newFileName ;
              if(newFileName&&newFileName.length>0){
                 $("#batchImportModal").modal('show') ;
              }
           },
           closeModal(){
               this.fileName = '' ; 
               this.clearTipInfo() ;
           },
           confirmImport(){
               console.info('导入的文件名称为 : ' + this.fileName) ;
               //下面是处理导入的业务逻辑
               batchImportApi().then((retData) =>{
                   this.clearTipInfo() ;
                   let {flag,msg} = retData ;
                   this.tipSuccessFlag = flag ;
                   this.tipMagArr = msg;
                   let _self = this ;
                   if(flag){
                       setTimeout(function(){
                           _self.fileName = '' ; 
                           $("#batchImportModal").modal('hide') ;
                       },1000) ;
                   }
               },(err) =>{
                   this.clearTipInfo() ;
                   this.tipSuccessFlag = false ;
                   this.tipMagArr.push('网络请求出错!');
               }) ;
           },
           clearTipInfo(){
               this.tipMagArr.splice(0,this.tipMagArr.length) ;
           }
       },
       data(){
           return {
              fileName:'',
              tipSuccessFlag:false,
              tipMagArr:['test hello']
           }
       }
    }

    class s7BatchImport{
       




        cleanTipInfo (){
            modalHelper.cleanTipInfo() ;
        } 
        addErrorTip(errMsg){
            modalHelper.addErrorTip(errMsg) ;
        } 
        addSuccessTip(sucMsg){
            cleanTipInfo() ;
            modalHelper.addSuccessTip(sucMsg) ;
        } 
    }
</script>
<style>

</style>