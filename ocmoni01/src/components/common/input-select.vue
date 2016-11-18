<template>
    <span class="oc-input-select-container" 
        v-clickoutside="handleClose"
        :style="inputStyle"
        >
        <input type="text"
            ref ="inputselect" 
            class="form-control input-sm" 
            :name="name" 
            :disabled ="readyonly" 
            :placeholder="placeholder"
            :value="value"
            @input="onInput"
            @click="onClickInput"
         />
        <i class="el-icon-caret-bottom oc-input-select__icon" @click ="onClickIcon"></i>
        <div class="oc-input-select-dropdown" v-show="visiable">
            <ul class="oc-input-select-dropdown__list" v-show="!isEmptyFlag">
                <li class="oc-input-select-dropdown__item" 
                    v-for="item in filterList" 
                    @click="handleClickItem(item.value)"
                    :class ="{'selected':item.value == value}"
                    >
                    {{item.name}}
                </li>
            </ul>
            <ul class="oc-input-select-dropdown__list" v-show="isEmptyFlag">
                 <li class="oc-input-select-dropdown__empty">无数据</li> 
            </ul>
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
            width:String,
            readyonly:Boolean,
            placeholder:String,
            url:String,
            value:[String,Number],
            options:Array
        },
        directives: { Clickoutside },
        computed:{
            inputStyle(){
                var inputWidth = this.width || "120px";
                var ret = {width:inputWidth};
                return ret;
            },
            filterList(){
                //console.info(this.value) ;
                if((!this.firstFocus)&&this.value&&this.value.trim().length>0){
                    let tmp = this.value.trim() ;
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
                this.$emit('input',val) ;
            },
            onClickInput(){
                //如果以前
                this.visiable = !this.visiable ; 
                this.firstFocus = true ;
            },
            handleClose(){
                this.visiable = false;
            },
            onClickIcon(){
                this.firstFocus = true ;
                this.visiable = !this.visiable ; 
            }
        },
        data(){
            return{
                visiable:false,
                firstFocus:false
            } ;
        },
        mounted(){
            //elem.find('span[name="customeEdit"]').bind('click',function  (event) {
        }
    }
</script>
<style>
    .oc-input-select-container{
        width: 100%;
        position: relative;
        display: inline-block;
    }
    /*oc-input-select-container .common_input{
        display: block;
        width: 100% ;
    }*/
 
    .oc-input-select-dropdown{
        position:absolute;
        z-index:1001;
        width: 100%;
        border:1px solid #d3dce6;
        border-radius:2px;
        background-color:#fff;
        box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
        box-sizing:border-box;
        margin:5px 0;
        overflow-y:auto;
        max-height:200px;
    }
    
    .oc-input-select-dropdown__list{
        list-style:none;
        padding:5px 0;
        margin:0;
        width:100%;
        box-sizing:border-box;
        overflow-y:auto
    }
    .oc-input-select-dropdown__item{
        font-size: 12px;
        padding: 0px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #475669;
        height: 22px;
        line-height: 22px;
        box-sizing: border-box;
        cursor: pointer;
     }

     .oc-input-select-dropdown__item.selected {
        color: #fff;
        background-color: #20a0ff
     }

     .oc-input-select-dropdown__item.selected:hover {
        background-color: #1D8CE0
     }

     .oc-input-select-dropdown__empty{
        font-size: 12px;
        padding: 0px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #475669;
        height: 22px;
        line-height: 22px;
        box-sizing: border-box;
     }
     .oc-input-select-dropdown__item:hover {
        background-color: #e5e9f2
     }

     /*.oc-input-select-icon{
        position: absolute;
        
     }*/
     .oc-input-select__icon{
        position: absolute;
        right: 0px;
        top: 0px;
        width: 35px;
        height: 100%;
        text-align: center;
        color: #C0CCDA;
        cursor: pointer ;
     }

     .oc-input-select__icon:after {
        content: '';
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle
     }

     /*.oc-input-select__icon+.el-input__inner {
        padding-right: 35px
     }*/
</style>