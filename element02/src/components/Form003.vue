<template>
    <ElForm :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <ELFormItem label="活动名称" prop="name">
            <ElInput type="text" v-model="ruleForm.name"/>
        </ELFormItem>

        <ELFormItem3 label="年龄" prop="age1_age2">
             <ElInput type="text" slot="range1" v-model="ruleForm.age1"/>
             <ElInput type="text" slot="range2" v-model="ruleForm.age2"/>
        </ELFormItem3>

        <ELFormItem>
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </ELFormItem>

        <h1>{{ruleForm.name}}</h1>
    </ElForm>
</template>
<script>
  import ElForm from "./form.vue" ;
  import ELFormItem from './form-item.vue' ;
  import ELFormItem3 from './form-item3.vue' ;
  import ElInput from './input.vue' ;

  //基本表单验证
  export default {
    data() {
      var age1_age2 = (rule, value, callback) => {
         var age1 = this.ruleForm.age1 ;
         var age2 = this.ruleForm.age2 ;
         if(isNaN(age1)){
            callback(new Error('age1必须输入数字!'));
            return ;
         }
         if(isNaN(age2)){
            callback(new Error('age2必须输入数字!'));
            return ;
         }
         var age11 = parseInt(age1,10) ;
         var age22 = parseInt(age2,10) ;
         if (age11 > age22) {
            callback(new Error('age1必须小于age2!'));
         } else {
            callback();
         }
      };
      return {
        ruleForm: {
          name: '',
          age1:'',
          age2:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age1_age2: [
            {
              type: 'object',
              fields: {
                age1: {type: "string",required:true,message: 'age1必填'},
                age2: {type: "string",required:true,message: 'age2必填'}
              },
              trigger: 'blur' 
            },
            {validator:age1_age2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      
    },
    components:{
       ElForm,
       ELFormItem,
       ELFormItem3,
       ElInput
    }
  }
</script>
<style>
  body{
    margin: 50px;
  }
</style>
