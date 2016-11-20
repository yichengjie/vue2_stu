<template>
    <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px">
        <el-form-item label="活动名称" prop="name">
            <el-input type="text" v-model="ruleForm.name" :readonly="readonly"/>
        </el-form-item>

        <el-form-item label =" ">
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </el-form-item>
    </el-form>
</template>
<script>
  import {validateAge,validatePub,selectOption,validateStartDate,validateEndDate} from './Form002.js' ;

  //基本表单验证
  export default {
    data() {
      var age = (rule, value, callback) => {
         validateAge(value,callback,this) ;
      };
      var pub = (rule, value, callback) =>{
         validatePub(value,callback,this) ;
      }
      var startDate = (rule, value, callback)=>{
          validateStartDate(value,callback,this) ;
      }
      var endDate = (rule, value, callback)=>{
          validateEndDate(value,callback,this) ;
      }
      return {
        readonly:false,
        selectOption:{
          ...selectOption
        },
        ruleForm: {
          name: '',
          age1:'',
          age2:'',
          pubType:'2',
          pubValue:'',
          dayOfWeak:['1'],
          freeOrNot:'1',
          startDate:'',
          endDate:'',
          descr:'',
          dept:'10021',
          dept2:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age:{//form-item2只能支持这种对象类型的验证//而且names键必填
            names:['age1','age2'],
            age1:[{required:true,trigger:'blur',message: 'age1必填'}],
            age2:[{ validator: age ,trigger: 'blur'}]
          },
          pub:{
            names:['pubType','pubValue'],
            pubType:[{ validator: pub ,trigger: 'change'}],
          },
          startDate:[
            { required: true, message: '生效日期必填', trigger: 'change' },
            { validator: startDate ,trigger: 'change' },
          ],
          endDate:[
            { required: true, message: '截止日期必填', trigger: 'change' },
            { validator: endDate ,trigger: 'change' },
          ]
        }
      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        console.info('formData : ' + JSON.stringify(this.ruleForm)) ;
        //校验整个表单
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        //检验部分字段
        // this.$refs.ruleForm.validateField('name',(errors)=>{
        //     console.info('valid ' ,errors) ;
        //     if (errors.length==0) {
        //       alert('submit!');
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        // }) ;
      }

    },
    components:{
    }
  }
</script>
<style lang ="less">
  @num:50px;
  .tttt{
    margin: @num ;
  }
</style>
