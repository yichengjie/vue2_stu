<template>
    <a  href = "javascript:void(0)" @click.stop="switchShowHide">
        {{value ? '收起表格' : '填写表格'}}
    </a>
</template>
<script>
    export default {
        props:{
            value:Boolean
        },
        methods:{
            switchShowHide(){
                this.$emit('input',!this.value) ;
            }
        }
    };
</script>