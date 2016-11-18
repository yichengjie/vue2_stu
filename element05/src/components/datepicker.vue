<template>
    <input type ="text"  
        v-clickoutside="handleClose" 
        :id ="randomId"
        :value="value" 
        @input ="onInput" 
        @blur ="onBlur" 
        class ="form-control input-sm"
        :disabled="readonly"
    />
</template>
<script>
    import emitter from './util/emitter';
    import Clickoutside from './util/clickoutside';
    export default {
         name:'ELDatepicker',
         //props:['value'],
         mixins: [emitter],
         directives: { Clickoutside },
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
            },
            handleClose(){
                setTimeout(()=>{
                    console.info('I am closed : ' + this.$options.name) ;
                },100) ;
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

</style>