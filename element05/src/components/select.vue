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
    import emitter from './util/emitter';
    export default {
        name: 'ElSelect',
        mixins: [emitter],
        props:{
           options:Array,
           value:[String,Number],
           readonly:Boolean
        },
        //props:['options','value','readonly'],
        methods:{
            onChange(event){
               let val = event.target.value ;
               this.$emit('input', val);
               this.dispatch('form-item', 'el.form.change', [val]);
            }
        }
    }
</script>