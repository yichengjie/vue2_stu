<template>
    <div>
        <button type="button" class="btn btn-primary" @click ="test">测试</button>
        <ELComfirm ref ="confirm"/>
    </div>
</template>
<script>
    import ELComfirm from '../components/confirm.vue' ;
    export default {
        components:{
            ELComfirm
        },
        data(){
            return {
                info:'hello world'
            } ;
        },
        methods:{
            test(){
                this.$refs.confirm.show((ret) => {
                    console.info('你点击了 【'+ret+'】' + this.info) ;
                }) ;
            }
        }
    }
</script>
<style>

</style>