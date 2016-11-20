<template>
    <span class="oc-select-container"
        v-clickoutside="handleClose"
        :style="inputStyle"
        >
        <input type="text"
            ref ="inputselect"
            class="form-control input-sm oc-select__input"
            :name="name"
            :readonly="!filterable"
            :disabled ="readonly"
            :placeholder="placeholder"
            v-model ="filterKey"
            @input="onInput"
            @click="onClickInput"
         />
        <i class="oc-select__icon el-icon-caret-bottom" @click ="onClickIcon"></i>
        <div class="oc-select-dropdown" v-show="visiable">
            <ul class="oc-select-dropdown__list" v-show="!isEmptyFlag">
                <li class="oc-select-dropdown__item"
                    v-for="item in filterList"
                    @click="handleClickItem(item.value)"
                    :class ="{'selected':item.value == value}"
                    >
                    {{item.name}}
                </li>
            </ul>
            <p class="oc-select-dropdown__empty" v-show="isEmptyFlag">
                无匹配数据
            </p>
        </div>
    </span>
</template>
<script>
    import emitter from './util/emitter';
    import Clickoutside from './util/clickoutside';
    export default {
        name: 'oc-input-select',
        mixins: [emitter],
        props: {
            name:String,
            label: String,
            width:Number,
            readonly:Boolean,
            placeholder:String,
            url:String,
            value:[String,Number],
            options:Array,
            strict:{
                type:Boolean,
                default:false
            }
        },
        directives: { Clickoutside },
        computed:{
            inputStyle(){
                var inputWidth = this.width || '';
                if(inputWidth){
                    return {width:inputWidth+"px"};
                }
                return {} ;
            },
            filterList(){
                if((!this.firstFocus)&&this.filterKey&&this.filterKey.trim().length>0){
                    let tmp = this.filterKey.trim() ;
                    return this.options.filter(item=>{
                        if(item.name.indexOf(tmp)!=-1){
                            return true ;
                        }
                        return false;
                    });
                }
                return this.options ;
            },
            isEmptyFlag(){
                return this.filterList.length == 0 ;
            }
        },
        methods:{
            handleClickItem(value){
                this.visiable = false;
                this.$emit('input',value) ;
            },
            onInput(event){
                let val = event.target.value ;
                this.firstFocus = false ;
                if(!this.strict){
                    this.$emit('input',val) ;
                }
            },
            onClickInput(){
                //如果以前
                this.visiable = !this.visiable ;
                this.firstFocus = true ;
            },
            handleClose(){
                this.visiable = false;
                this.filterKey = this.value ;
            },
            onClickIcon(){
                this.firstFocus = true ;
                this.visiable = !this.visiable ;
            }
        },
        data(){
            return{
                visiable:false,
                firstFocus:false,
                filterKey:this.value,
                filterable:false
            } ;
        },
        watch:{
            value(val, oldVal){
                this.filterKey = val ;
            }
        },
        mounted(){
            //this.filterKey = this.value ;
            //elem.find('span[name="customeEdit"]').bind('click',function  (event) {
        }
    }
</script>
<style lang="less" src ="./input-select.less">
</style>
