<template>
    <a  href = "javascript:void(0)">
        <span v-show ="showFlag">收起表格</span>
        <span v-show ="!showFlag">填写表格</span>
    </a>
</template>
<script>
    export default {
        data () {
            return {
                showFlag:true
            } ;
        }
    } ;
</script>