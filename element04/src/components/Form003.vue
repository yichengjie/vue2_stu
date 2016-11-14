<template>
    <div class="container">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="text" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="年龄1" prop="age1">
                <el-input v-model="ruleForm2.age1"></el-input>
            </el-form-item>

            <el-form-item label="年龄" prop="age2">
                <el-input v-model="ruleForm2.age2"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSubmit2">提交</el-button>
                <el-button @click="handleReset2">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    //自定义验证
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                var age = parseInt(value, 10);
                setTimeout(() => {
                if (!Number.isInteger(age)) {
                    callback(new Error('请输入数字值'));
                } else{
                    if (age < 18) {
                    callback(new Error('必须年满18岁'));
                    } else {
                    callback();
                    }
                }
                }, 1);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
        return {
            ruleForm2: {
                pass: '',
                checkPass: '',
                age1: '1',
                age2: '2'
            },
            rules2: {
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePass }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2 }
                ],
                age1: [
                    { required: true, message: '请填写年龄', trigger: 'blur' },
                    { validator: checkAge, trigger: 'blur' }
                ],
                age2: [
                    { required: true, message: '请填写年龄', trigger: 'blur' },
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){
        setTimeout(()=>{
            this.ruleForm2.pass  = '123' ;
            this.ruleForm2.checkPass = '456' ;
        },1000) ;
    }
  }
</script>
<style>
    .container{
        margin: 50px auto; 
        width: 1000px ;
    }
</style>