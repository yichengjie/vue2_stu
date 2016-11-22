<template>
    <div class="data_section">
        <div class="title_layout">
            <span class="left">1.选择附加服务</span>
            <div style="width: 57%;height: 36px; display: inline-block;vertical-align: middle;">
                <div class="el-input">
                    <div class="el-input__inner" contenteditable="true" ></div>
                    <i class="el-icon-caret-bottom el-input__icon"></i>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
    export default {
        props:{
            options:Array,
            currentObj:Object
        }
    } 
</script>
<style scoped>
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
