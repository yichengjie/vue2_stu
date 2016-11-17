<template>
    <span class="yj-datepicker-container">
        <input type ="text"   
            :id ="randomId"
            :value="value" 
            @input ="onInput" 
            @blur ="onBlur" 
            class ="form-control input-sm"
            :disabled="readonly"
        />
        <label  class="glyphicon glyphicon-calendar yj-datepicker-icon"></label>
    </span>
</template>
<script>
    import emitter from './emitter';
    export default {
         name:'oc-datepicker',
         //props:['value'],
         mixins: [emitter],
         props:{
             value:{
                 type:String,
                 default:''
             },
             readonly:Boolean
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
    .yj-datepicker-container{
        display: block;
        position: relative ;
    }
    .yj-datepicker-icon{
        display: inline-block;
        position: absolute ;
        right: 10px;
        top: 9px;
    }
</style>