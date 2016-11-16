<template>
    <div>
        <span class="checkbox-inline" v-for="item in options"> 
            <input type="checkbox"
                :name = "name"  
                :value = "item.value"
                :checked="isChecked(item.value)"
                @click="onChange"
                />
            <label>{{item.name}}</label>
        </span>
    </div>
</template>
<script>
    import emitter from './emitter';
    export default {
        name: 'ElCheckbox',
        mixins: [emitter],
        // props:['value','options','name'],
        props:{
            value:Array,
            name:String,
            options:Array,
            readonly:Boolean
        },
        data(){
            return {} ;
        },
        methods:{
            isChecked(val){
               return this.value.includes(val) ;
            },
            onChange(event){
                var flag = event.target.checked ;
                var tmp = event.target.value ;
                var newArr = [] ;
                if(flag){
                    newArr = [...this.value,tmp] ;
                }else{
                   newArr = this.value.filter(function(item){
                      return item != tmp ;
                   }) ;
                }
                this.$emit('input', newArr);
                this.$emit('change', newArr);
                this.dispatch('form-item', 'el.form.change', newArr);
            }
        }
    } ;
</script>
<style>
    .checkbox-inline label{
        font-weight: 100 ;
        font-size: 12px;
    }
</style>