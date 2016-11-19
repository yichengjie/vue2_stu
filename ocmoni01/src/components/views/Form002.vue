<template>
    <oc-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <oc-form-item1 label="活动名称" prop="name">
            <oc-input type="text" v-model="ruleForm.name" :readonly="readonly"/>
        </oc-form-item1>

        <oc-form-item2 label="年龄" prop="age">
             <oc-input type="text" slot="range1" v-model="ruleForm.age1"  :readonly="readonly"/>
             <oc-input type="text" slot="range2" v-model="ruleForm.age2"  :readonly="readonly"/>
        </oc-form-item2>
        <oc-form-item2 label="发布对象" prop ="pub" >
            <oc-select  slot="range1"  :readonly="readonly"
                :options = "selectOption.pubOptions" 
                v-model="ruleForm.pubType" />
            <oc-input type="text" slot="range2" v-model="ruleForm.pubValue" :readonly="readonly" />
        </oc-form-item2>

        <oc-form-item1 label="星期" prop="dayOfWeak">
           <oc-checkbox name ="dayOfWeak" 
              :readonly="readonly"
              :options="selectOption.dayOfWeakOption" 
              v-model ="ruleForm.dayOfWeak" />
        </oc-form-item1>

        <oc-form-item1 label="是否收费" prop="freeOrNot">
           <oc-radio name ="freeOrNot" 
              :options="selectOption.freeOrNotOption" 
              v-model ="ruleForm.freeOrNot" />
        </oc-form-item1>
        
        <oc-form-item1 label="生效日期" prop="startDate">
           <oc-datepicker  :readonly="readonly"
              v-model ="ruleForm.startDate" />
        </oc-form-item1>

        <oc-form-item1 label="截止日期" prop="endDate">
           <oc-datepicker  :readonly="readonly"
              v-model ="ruleForm.endDate" />
        </oc-form-item1>

        <oc-form-item1 label="可输入可选"  :span="6">
           <oc-input-select 
              :options="selectOption.inputSelectOption"
              :readonly="readonly"
              v-model ="ruleForm.dept"
              :strict="true" />
        </oc-form-item1>

        <oc-form-item1 label="可输入可选2"  :span="6">
           <oc-input-select 
              :options="selectOption.inputSelectOption"
              :readonly="readonly"
              v-model ="ruleForm.dept2"
              />
        </oc-form-item1>

        <oc-form-item1 label="描述信息" prop="descr" :span="6">
           <oc-textarea v-model ="ruleForm.descr"  :readonly="readonly" />
        </oc-form-item1>

        <oc-form-item0 label="金额" :span="6">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3</td>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
           </table>
        </oc-form-item0>

        <oc-form-item1 label =" ">
            <button class="btn btn-default" type="button" @click="handleSubmit">立即创建</button>
            <button class="btn btn-primary" type="button" @click="handleReset">重置</button>
        </oc-form-item1>
    </oc-form>
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
<style>
  body{
    margin: 50px;
  }
</style>
