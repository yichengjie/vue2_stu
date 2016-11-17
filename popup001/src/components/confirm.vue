<template>
    <div>
       
        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title">确认提示</h4>
                </div>
                <div class="modal-body">
                    <p>确认进行操作么?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click ="onClose">取消</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onConfirm">确认</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                callback:null
            } ;
        },
        methods:{
            onClose(){
               this.callback.call(null,0);
            },
            onConfirm(){
                this.callback.call(null,1);
            },
            show(callback){
                $("#myModal").modal('show') ;
                this.callback = callback ;
            }
        }
    }
    function* numbers() {
        var v1 = yield 0;
        return v1;
    }
</script>
<style>

</style>