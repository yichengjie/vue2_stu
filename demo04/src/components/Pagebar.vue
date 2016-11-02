<template>
<div class="clearfix">
    <nav class ="pull-right">
        <ul class="pagination">
            <li>  <a href="javascript:void(0)" v-on:click ="toPage(1)">首页</a></li>
            <li>
                <a href="javascript:void(0)" aria-label="Previous" v-on:click ="toPerviousPage">上一页</a>
            </li>
            <li v-for="l in pageBar.pgArr"    v-bind:class="{ 'active': pageBar.curPage==l}" >
                <a href="javascript:void(0)"  v-on:click="toPage(l)">{{l}}</a>
            </li>
            <li v-if ="pageBar.pageCount>5&&(pageBar.curPage+3) <=pageBar.pageCount"><span>...</span></li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" v-on:click ="toNextPage">下一页</a>
            </li>
            <li> <a href="javascript:void(0)" v-on:click ="toPage(pageBar.pageCount)">末页</a></li>
        </ul>
        <div class="page-desc">
            <span class="marginRight10">共<span class ="marginRL2">{{pageBar.pageCount}}</span>页</span>
            <span class ="">当前第</span>
            <input type="text" v-bind:value ="pageBar.curPage" id ="pageOkInput" class ="common_input"  style="width: 30px"   >
            <span class="marginRight5 ">页</span>
            <span>显示
                <select class="pagesize" v-model ="pageBar.pageSize">
                    <option value="10">10条</option>
                    <option value="15">15条</option>
                    <option value="20">20条</option>
                    <option value="25">25条</option>
                    <option value="30">30条</option>
                    <option value="50">50条</option>
                    <option value="100">100条</option>
                </select>
            </span>
            <span class="page-ok" v-on:click ="pageConfirm">确定</span>
        </div>
    </nav>
</div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default{
        props:['pageBar'],
        computed: mapGetters([
            'listCount'
        ]),
        methods:{
            toPage(){
                
            },
            pageConfirm(){
                console.info(this.recourds7List) ;
            },
            toPerviousPage(){

            },
            toNextPage(){

            }
        }
    }
</script>
<style>

</style>