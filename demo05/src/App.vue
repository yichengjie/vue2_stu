<template>
    <div>
        <Navbar active-name = "附加服务"/>
        <QuerySection/>
        <div class="container-fluid main_content" id="main_content" style="margin-top:10px;" >
            
            <div class="allInfo_descr pull-left" v-show ="pageBar.isQueryDB">
                <input type="checkbox" id ="queryDBFlagCheckbox" v-bind:checked="queryDBFlag"  
                    v-on:click ="clickQueryDBFlag"/>
                <label for="queryDBFlagCheckbox">共查询出<span class="red">{{pageBar.recordCount}}</span>条记录，针对全部记录排序?</label>
            </div>

            <Operbar />

            <TableList />

            <Pagebar/>
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
                message:'component from App.vue'
            };
        },
        components:{
            Navbar,
            QuerySection,
            Operbar,
            TableList,
            Pagebar
        },
        methods:{
            clickQueryDBFlag(event){
                let queryDBFlag = event.target.checked ;
                //console.info('queryDBFlag : ' + queryDBFlag) ;
                this.updateSimpleState({queryDBFlag}) ;
            },
            ...mapActions([
                'updateSimpleState'
            ])
        },
        computed: mapGetters([
          'pageBar',
          'queryDBFlag'
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