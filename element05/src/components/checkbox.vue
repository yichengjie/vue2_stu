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
    import _ from 'lodash' ;
    export default {
        name: 'ElCheckbox',
        mixins: [emitter],
        props:['value','options','name'],
        data(){
            return {} ;
        },
        methods:{
            isChecked(val){
                //item.value in value
               var index =  _.indexOf(this.value,val );
               return index != -1 ;
            },
            onChange(event){
                var flag = event.target.checked ;
                var tmp = event.target.value ;
                var newArr = [] ;
                if(flag){
                    newArr = [...this.value,tmp] ;
                }else{
                   newArr = _.filter(this.value,function(item){
                        return item != tmp ;
                    }) ;
                }
                this.$emit('input', newArr);
                this.$emit('change', newArr);
                this.dispatch('form-item', 'el.form.change', [...newArr]);
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