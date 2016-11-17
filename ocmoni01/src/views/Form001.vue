<template>
    <div class="container">
        <ElForm ref="form" :model="form" :rules="rules" label-width="90px">
            <ELFormItem label="活动名称" prop="name">
                <ELInput v-model="form.name" />
            </ELFormItem>
            <ELFormItem label="活动地点">
                <ELInput v-model="form.region" type ="textarea" />
            </ELFormItem>
            <ELFormItem label="活动日期" prop ="date1">
                <ELInput v-model="form.date1" />
            </ELFormItem>
            <ELFormItem label=" ">
                <div class="col-sm-6">
                    <button type="button" class="btn btn-success" v-on:click ="onSubmit" >提交</button>
                </div>
            </ELFormItem>
        </ElForm>
    </div>
</template>
<script>
    import ElForm from "../components/form.vue" ;
    import ELFormItem from '../components/form-item.vue' ;
    import ELInput from '../components/input.vue' ;
    export default {
         data() {
             var date1 = (rule, value, callback)=>{
                 if (value!='') {
                    callback(new Error('日期格式不合法!'));
                 } else {
                    callback();
                 }
             }
            return {
                form: {
                    name: '',
                    region: '',
                    date1: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    date1:[
                      {validator:date1}  
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
               this.$refs.form.validate((valid) => {
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
            ELInput
        }
    }
</script>
<style>
.container{
    margin: 50px 10px ;
}
</style>