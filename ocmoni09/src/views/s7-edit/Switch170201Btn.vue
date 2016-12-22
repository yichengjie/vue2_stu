<template>
    <div class="table_control">
        <span class="discountBtn marginR15" :class ="{'discountCheck':!discountFlag}" @click ="handleSwitchDiscount(false)">全额</span>
        <span class="discountBtn marginR15" :class ="{'discountCheck':discountFlag}" @click ="handleSwitchDiscount(true)">折扣</span>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                discountFlag:false
            } ;
        },
        methods:{
            handleSwitchDiscount (flag) {
                this.discountFlag = flag ;
            }
        }
    } 
</script>