<template>
    <oc-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <oc-form-item1 label="活动名称" prop="name">
            <oc-input type="text" v-model="ruleForm.name" :disabled="disabled" />
        </oc-form-item1>

        <oc-form-item2 label="年龄" prop="age">
             <oc-input-number type="text" slot="range1" v-model="ruleForm.age1"  :disabled="disabled" />
             <oc-input-number type="text" slot="range2" v-model="ruleForm.age2"  :disabled="disabled" />
        </oc-form-item2>
        <oc-form-item2 label="发布对象" prop ="pub" >
            <oc-select slot="range1" 
              :options="selectOption.pubOptions"
              :disabled="disabled"
              v-model ="ruleForm.pubType" />
              <!--

            <oc-select  slot="range1"  :disabled="disabled" 
                :options = "selectOption.pubOptions"
                v-model="ruleForm.pubType" />-->
            <oc-input type="text" slot="range2" v-model="ruleForm.pubValue" :disabled="disabled" />
        </oc-form-item2>

        <oc-form-item1 label="星期" prop="dayOfWeak">
           <oc-checkbox name ="dayOfWeak"
              :disabled="disabled" 
              :options="selectOption.dayOfWeakOption"
              v-model ="ruleForm.dayOfWeak" />
        </oc-form-item1>

        <oc-form-item1 label="是否收费" prop="freeOrNot">
           <oc-radio name ="freeOrNot"
              :options="selectOption.freeOrNotOption"
              v-model ="ruleForm.freeOrNot" />
        </oc-form-item1>

        <oc-form-item1 label="生效日期" prop="startDate">
           <oc-datepicker  :disabled="disabled" 
              v-model ="ruleForm.startDate" />
        </oc-form-item1>

        <oc-form-item1 label="截止日期" prop="endDate">
           <oc-datepicker  :disabled="disabled" 
              v-model ="ruleForm.endDate" />
        </oc-form-item1>

        <oc-form-item1 label="可输入可选"  :span="6">
           <oc-select
              :options="selectOption.inputSelectOption"
              :disabled="disabled"
              :width="160"
              v-model ="ruleForm.dept"/>
        </oc-form-item1>

        <oc-form-item1 label="可输入可选2"  :span="6">
           <oc-select
              :options="selectOption.inputSelectOption"
              :disabled="disabled" 
              :readonly="false"
              v-model ="ruleForm.dept2"
              />
        </oc-form-item1>

        <oc-form-item1 label="描述信息" prop="descr" :span="6">
           <oc-textarea v-model ="ruleForm.descr"  :disabled="disabled" />
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
        disabled:false,
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
          dept:'1002',
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
            pubType:[{ validator: pub ,trigger: 'change,blur'}],
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
  .form-control.oc_input_readonly{
      background-color: #fff;
      opacity: 1;
  }
  .form-control.oc_input_disabled{
    background-color: #eee;
    /*border-color: #D3DCE6;*/
    color: #bbb;
    cursor: not-allowed;
  }
  .form-control.oc_input_disabled::placeholder {
      color: #C0CCDA
  }
  .oc-input__icon{
      position: absolute;
      right: 0px;
      top: 0px;
      width: 35px;
      height: 100%;
      text-align: center;
      color: #C0CCDA;
      cursor: pointer ;
  }
  .oc-input__icon:after {
    content: '';
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle
  }
  body{
    margin: 50px;
  }
</style>
