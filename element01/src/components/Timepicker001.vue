<template>
    <el-time-select
        v-model="value1"
        :picker-options="option"
        placeholder="选择时间">
</el-time-select>
</template>
<script>
    //固定时间点
    export default {
        data(){
            return {
                value1:"",
                option:{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                }
            } ;
        }
    }
</script>