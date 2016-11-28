<template>
    <a  href = "javascript:void(0)" @click.stop="switchShowHide">
        {{visiable ? '收起表格' : '填写表格'}}
    </a>
</template>
<script>
    export default {
        data(){
            return {
                 visiable:true    
            };
        },
        methods:{
            switchShowHide(){
                this.visiable = !this.visiable ;
            }
        }
    };
</script>