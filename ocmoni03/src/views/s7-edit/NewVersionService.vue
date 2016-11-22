<template>
    <div class="data_section">
        <div class="title_layout">
            <span class="left">1.选择附加服务</span>
            <div class="service-choose-container" v-clickoutside="handleClose">
                <div class="el-input">
                    <div @click ="visiable = !visiable" class="el-input__inner" contenteditable="true" >{{this.value}}</div>
                    <i class="el-icon-caret-bottom el-input__icon"></i>
                </div>

                <div class="oc-select-dropdown" v-show="visiable">
                    <ul class="oc-select-dropdown__list" v-show="!isEmptyFlag">
                        <li class="oc-select-dropdown__item"
                            v-for="item in options"
                            @click="handleClickItem(item.id)"
                            :class ="{'selected':item.id == value}"
                        >
                            {{item.serviceType +' ' + item.attributesGroup}}
                        </li>
                    </ul>
                    <p class="oc-select-dropdown__empty" v-show="isEmptyFlag">
                        无匹配数据
                    </p>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import emitter from '../../components/util/emitter.js';
    import Clickoutside from '../../components/util/clickoutside.js';
    export default {
        props:{
            value:String,
            options:Array,
            currentObj:Object
        },
        mixins: [emitter],
        directives: { Clickoutside },
        data(){
            return {
                visiable:false,
                filterKey: getCheckItemName(this.options,this.value) 
            };
        },
        computed:{
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
            handleClose(){
                this.visiable = false;
            },
            handleClickItem(val){
                console.info('id : ' + val) ;
                this.$emit('input',val) ;
                this.visiable = false;
            }
        },
        watch:{
          
        }
    } 
    function getCheckItemName(options,val) { 
        let retObj = options.find(function(item){
             return item.id === val;
        }) ;
        return (retObj ? (item.serviceType +' ' + item.attributesGroup) : val) ;
    }
</script>
<style scoped>
    .service-choose-container{
        width: 57%;
        height: 36px; 
        display: inline-block;
        vertical-align: middle;
        position: relative;
    }
    .el-input {
        position: relative;
        font-size: 14px
    }
    .el-input.is-disabled .el-input__inner {
        background-color: #EFF2F7;
        border-color: #D3DCE6;
        color: #bbb;
        cursor: not-allowed
    }
    .el-input.is-active .el-input__inner {
        outline: 0;
        border-color: #20a0ff
    }
    .el-input__inner {
        display: block;
        padding: 0px 10px;
        box-sizing: border-box;
        width: 100%;
        color: #1f2d3d;
        background-color: #fff;
        background-image: none;
        border: 1px solid #C0CCDA;
        border-radius: 2px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        outline: 0;
        font-size: inherit;
        height: 36px;
        line-height: 36px;
        vertical-align: middle;
    }
    .el-input__inner:hover {
        border-color: #8492a6
    }
    .el-input__inner:focus {
        outline: 0;
        border-color: #20a0ff
    }
    .el-input__icon {
        position: absolute;
        width: 35px;
        height: 100%;
        top: 0px;
        right: 0px;
        text-align: center;
        color: #C0CCDA
    }
    .el-input__icon:after {
        content: '';
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle
    }
</style>
