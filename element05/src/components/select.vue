<template>
    <select  
        :value="value" 
        class="form-control input-sm"  
        @change="onChange"
        :disabled="readonly">
        <option 
            v-for="item in options" 
            :value="item.value"
            >
            {{item.name}}
        </option>
    </select>
</template>
<script>
    import emitter from './emitter';
    import _ from 'lodash' ;
    export default {
        name: 'ElSelect',
        mixins: [emitter],
        props:['options','value','readonly'],
        methods:{
            onChange(event){
               let val = event.target.value ;
               this.$emit('input', val);
               this.dispatch('form-item', 'el.form.change', [val]);
            }
        },
        mounted(){
            console.info('readonly : ' + this.readonly) ;
        },
        data(){
            return {
                readonlyFlag:this.readonly === 'true'
            };
        },
        computed: {
            showTextInfo(){
               var obj = _.find(this.options,{value:this.value}) || {name:'空',value:''} ;
               return obj.name ;
            }
        }
    }
</script>
<style>
    .readonly-input{
        display: inline-block;
        height: 30px;
        line-height: 30px ;
        font-size: 12px;
    }
</style>
