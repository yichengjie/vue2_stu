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
    import emitter from './util/emitter';
    export default {
         name:'oc-datepicker',
         //props:['value'],
         mixins: [emitter],
         props:{
             value:{
                 type:String,
                 default:''
             },
             disabled:Boolean
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
            var options = {"showButtonPanel":true,"dateFormat":"yy-mm-dd"} ;
            options.onSelect = function(dateText,picker){
                _self.$emit('input',dateText) ;
                _self.$emit('change', dateText);
                _self.dispatch('form-item', 'el.form.change', dateText);
            }
            $('#'+this.randomId).datepicker(options) ;
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