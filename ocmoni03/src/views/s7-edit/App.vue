<template>
    <div class ="s7editpage">
        <div class="header-container ">
            <div class="navbar-fixed-top">
                 <Navbar/>
                <QuerySection v-on:clickSaveFormBtn="handleSaveForm" v-on:clickResetFormBtn="handleReset"/>
            </div>
        </div>
        
        <div class="container-fluid main_content" >
           <oc-form :model ="formData" :rules="rules" ref ="editForm" label-width ="120px">
               <DataSection left ="1.确定费用" right ="描述 | 费用">
                   <ContentLayout title="描述">
                        <oc-form-item1 label="销售生效日期" :required="true" prop ="firstMaintenanceDate">
                            <oc-datepicker v-model ="formData.firstMaintenanceDate" />
                        </oc-form-item1>
                        <oc-form-item1 label="销售截止日期"  prop ="lastMaintenanceDate">
                            <oc-datepicker v-model ="formData.lastMaintenanceDate" />
                        </oc-form-item1>
                        <oc-form-item2 label="服务套数" :required="true" prop ="serviceNumber">
                            <oc-input slot="slot1" v-model ="formData.serviceNumberMinimum" />
                             <oc-input slot="slot2" v-model ="formData.serviceNumberMaximum" />
                        </oc-form-item2>
                        <oc-form-item1 label="描述"  prop ="description">
                            <oc-textarea v-model ="formData.description" />
                        </oc-form-item1>
                        <oc-form-item1 label="产品代码"  prop ="fareBasis">
                            <oc-input v-model ="formData.fareBasis" />
                        </oc-form-item1>
                        <oc-form-item1 label="折扣代码"  prop ="discountCode">
                            <oc-input v-model ="formData.discountCode" />
                        </oc-form-item1>
                   </ContentLayout>
               </DataSection>
           </oc-form>
        </div>

    </div>
</template>
<script>
    import Navbar from '../common/Navbar.vue' ;
    import QuerySection from './QuerySection.vue' ;
    import DataSection from './DataSection.vue' ;
    import ContentLayout from './ContentLayout.vue' ;
    export default {
        components:{
            Navbar,
            QuerySection,
            DataSection,
            ContentLayout
        },
        data(){
            return {
                formData:{
                    firstMaintenanceDate:'',
                    lastMaintenanceDate:'',
                    serviceNumberMinimum:'',
                    serviceNumberMaximum:'',
                    description:'',
                    fareBasis:'',
                    discountCode:''
                },
                rules:{
                    firstMaintenanceDate: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                }
            } ;
        },
        methods:{
            handleSaveForm(type){
               console.info('formData : ' + JSON.stringify(this.formData)) ;
               //校验整个表单
               this.$refs.editForm.validate((valid) => {
                  if (valid) {
                      alert('submit!');
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
            },
            handleReset() {
                this.$refs.editForm.resetFields();
            },
       }
    }
</script>
