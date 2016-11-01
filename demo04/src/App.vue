<template>
    <div>
        <div class="header-container" v-bind:class="{ 'hasMoreQuerySection':showMoreQuerySectionFlag }">
            <div class="navbar-fixed-top" id = "myheader">
                <Navbar v-bind:active-name = "activeName"/>
                <QuerySection v-model ="showMoreQuerySectionFlag" />
            </div>
        </div>
        <p><h1>{{showMoreQuerySectionFlag}}</h1></p>
    </div>
    

</template>
<script>
    import Navbar from './components/Navbar.vue' ;
    import QuerySection from './components/QuerySection.vue' ;
    export default{
        name:'app',
        data (){
            return {
                message:'component from App.vue',
                showMoreQuerySectionFlag:false,
                activeName:'附加服务'
            };
        },
        components:{
            Navbar,
            QuerySection
        }
        
    }
</script>
<style>
   body{
     min-width: 1300px;
   }
</style>