<template>
    <div>
        <label class="radio-inline" v-for="item in options">
            <input type="radio" 
                :name="name" 
                :value="item.value"
                :checked="item.value === value"
                @click="onClick"
            /> {{item.name}}
        </label>
    </div>
</template>
<script>
    import emitter from './util/emitter';
    export default {
        name: 'ElRadio',
        mixins: [emitter],
        props:{
           name:String,
           options:Array,
           value:[String,Number],
           readonly:Boolean
        },
        methods:{
            onClick(event){
                var val = event.target.value ;
                console.info('val ' ,val) ;
                this.$emit('input', val);
                this.$emit('change', val);
                this.dispatch('form-item', 'el.form.change', val);
            }
        }
    }
</script>
<style>
    .radio-inline{
        font-size: 12px;
    }
</style>