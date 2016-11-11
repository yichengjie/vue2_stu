<template>
    <div>
        <el-button type="text" @click.native="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    //基本用法
    export default{
        data(){
            return {
                dialogVisible:false
            } ;
        }
    }
</script>