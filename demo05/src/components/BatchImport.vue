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
                        <div class ="col-sm-1">
                        </div>
                        <div class ="col-sm-10">
                            <p>文件&nbsp;:&nbsp;<span id ="batchImportFileName">{{fileName}}</span></p>
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
                    <button type="button" v-on:click ="closeModal" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" v-on:click ="confirmImport" class="btn btn-primary" id ="submitBatchImportFormBtn">导入</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
           },
           confirmImport(){
               console.info('导入的文件名称为 : ' + this.fileName) ;
               this.fileName = '' ; 
               $("#batchImportModal").modal('hide') ;
               //下面是处理导入的业务逻辑
               //...
           }
       },
       data(){
           return {
              fileName:''
           }
       }
    }
</script>
<style>

</style>