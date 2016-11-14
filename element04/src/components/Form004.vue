<template>
  <div class="container">
     <el-form :model="dynamicForm" :rules="dynamicRule" ref="dynamicForm" label-width="100px" class="demo-dynamic">
        <el-form-item prop="email" label="邮箱">
            <el-input v-model="dynamicForm.email" v-on:input="changeEmailValue"></el-input>
        </el-form-item>
        <el-form-item
            v-for="(domain, index) in dynamicForm.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains:' + index"
            :rules="{
                type: 'object', required: true,
                fields: {
                    value: { required: true, message: '域名不能为空', trigger: 'blur' }
                }
            }"
        >
            <el-input v-model="domain.value" style="width:80%;display:inline-block;"></el-input>
            <el-button @click.native.prevent="removeDomain(domain)" style="width:18%;display:inline-block;">删除</el-button>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleSubmit3">提交</el-button>
            <el-button @click="addDomain">新增域名</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
    data() {
      return {
        dynamicForm: {
          domains: [
              {key: 1,value: 'sdf'}
          ],
          email: ''
        },
        dynamicRule: {
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        }
      };
    },
    methods: {
      handleSubmit3(ev) {
        this.$refs.dynamicForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      removeDomain(item) {
        var index = this.dynamicForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicForm.domains.push({
          key: this.dynamicForm.domains.length,
          value: ''
        });
      },
      changeEmailValue(value){
        this.dynamicForm.email = value.toUpperCase()  ; 
        //console.info('------' + this.dynamicForm.email) ;
      }
    }
  }
</script>
<style>
    .container{
        margin: 50px auto; 
        width: 1000px ;
    }
</style>