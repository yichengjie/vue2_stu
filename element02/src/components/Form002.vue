<template>
    <ElForm :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <ELFormItem label="活动名称" prop="name">
            <input type="text" class="form-control" v-model="ruleForm.name" v-on:blur ="onblur">
        </ELFormItem>

        <ELFormItem>
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </ELFormItem>
    </ElForm>
</template>
<script>
  import ElForm from "./form.vue" ;
  import ELFormItem from './form-item.vue' ;
  //基本表单验证
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
      },
      onblur(event){
        console.info('event.target.value : ' + event.target.value) ;
        this.$emit('el.form.blur',event.target.value) ;
      }
    },
    components:{
       ElForm,
       ELFormItem
    }
  }
</script>
