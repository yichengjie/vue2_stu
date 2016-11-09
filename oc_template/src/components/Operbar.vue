<template>
    <div>
        <div class="pull-right clearfix" style="margin-bottom: 8px">
            <button class="btn btn-success btn-sm" >新建</button>
            <button class="btn btn-default btn-sm" >删除</button>
            <button class="btn btn-default btn-sm" >发布</button>
            <button class="btn btn-default btn-sm" >截止</button>
        </div>
        <span class="clearfix"></span>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    import {toastInfo,toastDanger,toastSuccess,getJspPageParam} from '../common/index.js' ;
    import api from '../api/index.js' ;

    export default {
        name:'operbar',
        methods:{
            ...mapActions([

            ])
        },
        computed:mapGetters([
           
        ]),
        mounted(){

        },
        components:{
           
        }
    }
</script>
<style>
    
</style>
