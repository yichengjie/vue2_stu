<template>
    <div>
        <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">Http://</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="input4">
            <template slot="append">.com</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="input5" style="width: 300px;">
            <el-select v-model="select" slot="prepend">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
        </el-input>
    </div>
</template>
<script>
//复合型输入框
export default {
  data() {
    return {
      input3: '',
      input4: '',
      input5: '',
      select: ''
    }
  }
}
</script>
<style>
.el-select .el-input {
  width: 100px;
}
</style>