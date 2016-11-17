<template>
    <yj-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <yj-form-item label="活动名称" prop="name">
            <yj-input type="text" v-model="ruleForm.name" :readonly="readonly"/>
        </yj-form-item>

        <yj-form-item2 label="年龄" prop="age">
             <yj-input type="text" slot="range1" v-model="ruleForm.age1"  :readonly="readonly"/>
             <yj-input type="text" slot="range2" v-model="ruleForm.age2"  :readonly="readonly"/>
        </yj-form-item2>
        <yj-form-item2 label="发布对象" prop ="pub" >
            <yj-select  slot="range1"  :readonly="readonly"
                :options = "selectOption.pubOptions" 
                v-model="ruleForm.pubType" />
            <yj-input type="text" slot="range2" v-model="ruleForm.pubValue" :readonly="readonly" />
        </yj-form-item2>

        <yj-form-item label="星期" prop="dayOfWeak">
           <yj-checkbox name ="dayOfWeak" 
              :readonly="readonly"
              :options="selectOption.dayOfWeakOption" 
              v-model ="ruleForm.dayOfWeak" />
        </yj-form-item>

        <yj-form-item label="是否收费" prop="freeOrNot">
           <yj-radio name ="freeOrNot" 
              :options="selectOption.freeOrNotOption" 
              v-model ="ruleForm.freeOrNot" />
        </yj-form-item>
        
        <yj-form-item label="生效日期" prop="startDate">
           <yj-datepicker
              v-model ="ruleForm.startDate" />
        </yj-form-item>

        <yj-form-item label="截止日期" prop="endDate">
           <yj-datepicker
              v-model ="ruleForm.endDate" />
        </yj-form-item>

        <yj-form-item label="描述信息" prop="descr" :span="6">
           <yj-textarea v-model ="ruleForm.descr"  />
        </yj-form-item>

        <yj-form-item label =" ">
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </yj-form-item>
    </yj-form>
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
          descr:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age:{
            names:['age1','age2'],
            // fields:[
            //   {required: true,message: 'age1必填',trigger: 'blur'},
            //   {required: true,message: 'age2必填',trigger: 'blur'}
            // ],
            validator:{ validator: age ,trigger: 'blur' },
            required:true
          },
          pub:{
            names:['pubType','pubValue'],
            validator:{ validator: pub ,trigger: 'change'},
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
<style>
  body{
    margin: 50px;
  }
</style>
