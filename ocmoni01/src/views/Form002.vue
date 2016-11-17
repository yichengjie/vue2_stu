<template>
    <ElForm :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <ELFormItem label="活动名称" prop="name">
            <ElInput type="text" v-model="ruleForm.name" :readonly="readonly"/>
        </ELFormItem>

        <ELFormItem2 label="年龄" prop="age">
             <ElInput type="text" slot="range1" v-model="ruleForm.age1"  :readonly="readonly"/>
             <ElInput type="text" slot="range2" v-model="ruleForm.age2"  :readonly="readonly"/>
        </ELFormItem2>
        <ELFormItem2 label="发布对象" prop ="pub" >
            <ELSelect  slot="range1"  :readonly="readonly"
                :options = "selectOption.pubOptions" 
                v-model="ruleForm.pubType" />
            <ElInput type="text" slot="range2" v-model="ruleForm.pubValue" :readonly="readonly" />
        </ELFormItem2>

        <ELFormItem label="星期" prop="dayOfWeak">
           <ELCheckbox name ="dayOfWeak" 
              :readonly="readonly"
              :options="selectOption.dayOfWeakOption" 
              v-model ="ruleForm.dayOfWeak" />
        </ELFormItem>

        <ELFormItem label="是否收费" prop="freeOrNot">
           <ElRadio name ="freeOrNot" 
              :options="selectOption.freeOrNotOption" 
              v-model ="ruleForm.freeOrNot" />
        </ELFormItem>
        
        <ELFormItem label="生效日期" prop="startDate">
           <ELDatepicker
              v-model ="ruleForm.startDate" />
        </ELFormItem>

        <ELFormItem label="截止日期" prop="endDate">
           <ELDatepicker
              v-model ="ruleForm.endDate" />
        </ELFormItem>

        <ELFormItem label =" ">
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </ELFormItem>
    </ElForm>
</template>
<script>
  import ElForm from "../components/form.vue" ;
  import ELFormItem from '../components/form-item.vue' ;
  import ELFormItem2 from '../components/form-item2.vue' ;
  import ElInput from '../components/input.vue' ;
  import ELSelect from '../components/select.vue' ;
  import ELCheckbox from '../components/checkbox.vue' ;
  import ElRadio from '../components/radio.vue' ;
  import ELDatepicker from '../components/datepicker.vue' ;
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
          endDate:''
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
       ElForm,
       ELFormItem,
       ELFormItem2,
       ElInput,
       ELSelect,
       ELCheckbox,
       ElRadio,
       ELDatepicker
    }
  }
</script>
<style>
  body{
    margin: 50px;
  }
</style>
