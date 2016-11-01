<template>
    <div class="header-container" v-bind:class="{ 'hasMoreQuerySection':showMoreQuerySectionFlag }">
        <div class="navbar-fixed-top" id = "myheader">
            <Navbar v-bind:active-name = "activeName"/>
            
        </div>
    </div>
</template>
<script>
    import Navbar from './components/Navbar.vue' ;
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
            Navbar
        }
    }
</script>
<style>
   
</style>