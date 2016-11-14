<template>
    <ElForm :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <ELFormItem label="活动名称" prop="name">
            <ElInput type="text" v-model="ruleForm.name"/>
        </ELFormItem>

        <ELFormItem2 label="年龄" prop="age">
             <ElInput type="text" slot="range1" v-model="ruleForm.age1"/>
             <ElInput type="text" slot="range2" v-model="ruleForm.age2"/>
        </ELFormItem2>

        <ELFormItem>
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </ELFormItem>
    </ElForm>
</template>
<script>
  import ElForm from "./form.vue" ;
  import ELFormItem from './form-item.vue' ;
  import ELFormItem2 from './form-item2.vue' ;
  import ElInput from './input.vue' ;
  //基本表单验证
  export default {
    data() {
      var age = (rule, value, callback) => {
         var age1 = this.ruleForm2.age1 ;
         var age2 = this.ruleForm2.age2 ;

         var age11 = parseInt(age1,10) ;
         var age22 = parseInt(age2,10) ;

          if (age1 === '' || age2==='') {
              callback(new Error('必填'));
          } else if (age11 >age22) {
              callback(new Error('后者要大于前者!'));
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
          age: [
             { validator: age ,trigger: 'blur' }
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
       ELFormItem,
       ELFormItem2,
       ElInput
    }
  }
</script>
