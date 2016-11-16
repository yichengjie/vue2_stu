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

  //基本表单验证
  export default {
    data() {
      var age = (rule, value, callback) => {
         var age1 = this.ruleForm.age1 ;
         var age2 = this.ruleForm.age2 ;
         if (age1 === '' && age2==='') {
            callback(new Error('必填'));
            return ;
         }
         if(isNaN(age1)){
            callback(new Error('age1必须输入数字'));
            return ;
         }
         if(isNaN(age2)){
            callback(new Error('age2必须输入数字'));
            return ;
         }
         var age11 = parseInt(age1,10) ;
         var age22 = parseInt(age2,10) ;
         if (age11 > age22) {
            callback(new Error('后者要大于前者!'));
         } else {
            callback();
         }
      };

      var pub = (rule, value, callback) =>{
         //console.info('pub **************') ;
         var pubType = this.ruleForm.pubType ;
         var pubValue = this.ruleForm.pubValue ;

         if(pubType==='' && pubValue === ''){
             callback();
             return ;
         }
         if (pubType !== '' && pubValue==='') {
            callback(new Error('发布对象代码必填'));
            return ;
         }
         if (pubValue !== '' && pubType==='') {
            callback(new Error('发布对象类型必填'));
            return ;
         }

         if(pubType==='1'){
            if(pubValue!=='1'){
               callback(new Error('类型1时value必须为1'));
               return ;
            }
         }

         if(pubType==='2'){
            if(pubValue!=='2'){
               callback(new Error('类型2时value必须为2'));
               return ;
            }
         }

         if(pubType==='3'){
            if(pubValue!=='3'){
               callback(new Error('类型2时value必须为3'));
               return ;
            }
         }
         callback();
         return ;
      }

      return {
        readonly:true,
        selectOption:{
          pubOptions:[
            {name:"选择",value:''},
            {name:"类型1",value:"1"},
            {name:"类型2",value:"2"},
            {name:"类型3",value:"3"}
          ]
        },
        ruleForm: {
          name: '',
          age1:'',
          age2:'',
          pubType:'2',
          pubValue:''
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
          }
        }
      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        console.info('formData : ' + JSON.stringify(this.ruleForm)) ;
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
       ELFormItem2,
       ElInput,
       ELSelect
    }
  }
</script>
<style>
  body{
    margin: 50px;
  }
</style>
