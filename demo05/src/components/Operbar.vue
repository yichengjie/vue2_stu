<template>
    <div>
        <div class="pull-right clearfix" style="margin-bottom: 8px">
            <button class="btn btn-success btn-sm" v-on:click="toAddUI">新建</button>
            <button class="btn btn-default btn-sm" v-on:click ="doDeleteOper">删除</button>
            <button class="btn btn-default btn-sm" v-on:click ="doPublishOper">发布</button>
            <button class="btn btn-default btn-sm" v-on:click ="showAbortUI">截止</button>
            <div class ="dropdown-oc">
                <div class="btn-group">
                    <button class="btn btn-default btn-sm" id="batchImportBtn" 
                        for="batchImportFileInput" v-on:click="showBatchImportUI">批量导入</button>
                    <button class="btn btn-default btn-sm dropdown-trigger"><i class="glyphicon glyphicon-triangle-bottom"></i></button>
                </div>
                <ul class ="dropdown-menu-oc">
                    <li onclick="location.href='${pageContext.request.contextPath}/ocimport/download.action'">下载模板</li>
                </ul>
            </div>
        </div>
        <span class="clearfix"></span>
        <BatchAbort/>
        <BatchImport />
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    import BatchAbort from './BatchAbort.vue' ;
    import BatchImport from './BatchImport.vue' ;
    export default {
        name:'operbar',
        methods:{
            toAddUI(){
                console.info('准备跳转到新增页面上去!') ;
            },
            doDeleteOper(){
                //console.info('准备批量删除操作...') ;
                this.batchDeleteRecords7() ;
            },
            doPublishOper(){
                console.info('准备发布操作...') ;
            },
            showAbortUI(){
               // console.info('显示截止模态框...') ;
                $("#abortModal").modal('show') ;
            },
            showBatchImportUI(event){
                var forId =  $(event.target).attr("for") ;
                $("#"+forId).trigger('click') ;
                //$("#batchImportModal").modal('show') ;
            },
            ...mapActions([
                'batchDeleteRecords7'
            ])
        },
        mounted(){
           initPagePlugin() ;
        },
        components:{
            BatchAbort,
            BatchImport
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
