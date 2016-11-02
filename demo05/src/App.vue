<template>
    <div>
        <Navbar v-bind:active-name = "activeName"/>
        <QuerySection/>
        <div class="container-fluid main_content" id="main_content" style="margin-top:10px;" >
            
            <div class="allInfo_descr pull-left" v-show ="pageBar.isQueryDB">
                <input type="checkbox" id ="queryDBFlag" v-model="queryDBFlag" />
                <label for="queryDBFlag">共查询出<span class="red">{{pageBar.recordCount}}</span>条记录，针对全部记录排序?</label>
            </div>
            
            <Operbar />
            <TableList v-bind:is-query-dB = "pageBar.isQueryDB"  />
            <Pagebar v-bind:page-bar ="pageBar"/>
        </div>
    </div>
    

</template>
<script>
    import Navbar from './components/Navbar.vue' ;
    import QuerySection from './components/QuerySection.vue' ;
    import Operbar from './components/Operbar.vue' ;
    import TableList from './components/TableList.vue' ;
    import Pagebar from './components/Pagebar.vue' ;
    import { mapGetters, mapActions } from 'vuex' ;
    export default{
        name:'app',
        data (){
            return {
                message:'component from App.vue',
                activeName:'附加服务',
                queryDBFlag:false,/**是否针对所有记录进行排序 */
            };
        },
        components:{
            Navbar,
            QuerySection,
            Operbar,
            TableList,
            Pagebar
        },
        computed: mapGetters([
          'pageBar'
        ]),    
    }
</script>
<style>
   body{
     min-width: 1300px;
   }
   .header-container{
       height:54px;
   }
</style>