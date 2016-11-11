<template>
    <div>
        <!-- Table -->
        <el-button type="text" @click.native="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

        <el-dialog title="收货地址" v-model="dialogTableVisible">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        </el-dialog>

        <!-- Form -->
        <el-button type="text" @click.native="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="收货地址" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click.native="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
    //自定义内容
    export default {
        data(){
            return {
                formLabelWidth:"100px",
                gridData:[],
                dialogTableVisible:false,
                dialogFormVisible:false,
                form:{}
            } ;
        }
    }
</script>