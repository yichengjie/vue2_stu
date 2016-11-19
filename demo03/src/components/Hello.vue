<template>
    <div class="mymessage">{{message}}</div>
</template>
<script>
    export default {
         name: 'hello',
         data () {
            return {
                message: 'Welcome to Your Vue.js App'
            }
         }
    }
</script>
<style lang="less">
    .mymessage{
        font-size:28px;
        color:red;
    }
</style>
