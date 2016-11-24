<template>
     <div class ="table_control">
        <span class ="discountBtn" :class ="{'discountCheck':value==''}" @click ="changeUseDateLimitTye('')" >时间段</span>
        <span class ="discountBtn" :class ="{'discountCheck':value=='1'}" @click ="changeUseDateLimitTye('1')">期限</span>
    </div>
</template>
<script>
    export default {
      props:{
        value:{
            type:String,
            default:''
        }  
      } ,
      methods:{
          changeUseDateLimitTye(val){
              this.$emit('input',val) ;
          }
      } 
    } ;
</script>