<template>
    <span class="oc-datepicker-container">
        <input type ="text"   
            :id ="randomId"
            :value="value" 
            @input ="onInput" 
            @blur ="onBlur" 
            class ="form-control input-sm"
            :disabled="disabled"
        />
        <!--oc-datepicker-icon-->
        <label  class="el-icon-date  oc-input__icon"></label>
    </span>
</template>
<script>
    import emitter from './mixin/emitter';
    export default {
         name:'oc-datepicker',
         //props:['value'],
         mixins: [emitter],
         props:{
             value:{
                 type:String,
                 default:''
             },
             disabled:Boolean,
             time:{
                 type:Boolean,
                 default:false
             }
         },
         data:function(){
            return {
                randomId:('input-' + Math.random()).replace('\.','-') 
            } ;
         },
         methods:{
            onInput(event){
                var val = event.target.value ;
                this.$emit('input',val) ;
                //this.$emit('change', val);
                this.dispatch('form-item', 'el.form.change', val);
            },
            onBlur(event){
                var val = event.target.value ;
                this.$emit('input',val) ;
                //this.$emit('change', val);
                this.dispatch('form-item', 'el.form.blur', val);
            }
         },
         mounted:function(el){
            var _self = this ;
            var minDate = new Date() ;
            var optionObj = {"showButtonPanel":true,"dateFormat":"yy-mm-dd"} ;
            optionObj.onSelect = function(dateText,picker){
                _self.$emit('input',dateText) ;
                _self.$emit('change', dateText);
                _self.dispatch('form-item', 'el.form.change', dateText);
            }
            optionObj.minDate = minDate ;
            if(this.time){
                optionObj.timeFormat = 'HH:mm' ;
                optionObj.timeText="&nbsp;&nbsp;时间" ; 
                optionObj.hourText ="&nbsp;&nbsp;时" ;
                optionObj.minuteText ="&nbsp;&nbsp;分" ;  
                //optionObj.secondText = "&nbsp;&nbsp;秒" ;
                optionObj.currentText = "当前" ;
                optionObj.closeText = "关闭" ;
                $('#'+this.randomId).datetimepicker(optionObj) ;
            }else{
                $('#'+this.randomId).datepicker(optionObj) ;
            }
         }
    }
</script>
<style>
    .oc-datepicker-container{
        display: block;
        position: relative ;
    }
    .oc-datepicker-icon{
        display: inline-block;
        position: absolute ;
        right: 10px;
        top: 9px;
    }
</style>