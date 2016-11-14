<template>
    <div class="container">
       <FormDemo/>
    </div>
</template>
<script>
    //import Form001 from './components/Form001.vue' ;
    //import Form002 from './components/Form002.vue' ;
    import FormDemo from './components/Form002.vue' ;
    export default {
        components:{
            FormDemo
        }
    }
</script>
<style>
    body{
        margin: 0;
        padding: 0;
    }
    .container{
        margin: 0px auto ;
    }
</style>