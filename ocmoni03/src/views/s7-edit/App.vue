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
                            <oc-input-number slot="slot1" :min="18" :max ="100" placeholder="起始套数" v-model ="formData.serviceNumberMinimum" />
                            <oc-input-number slot="slot2" :min="18" :max ="100" placeholder="结束套数" v-model ="formData.serviceNumberMaximum" />
                        </oc-form-item2>
                        <oc-form-item1 label="描述"  prop ="description">
                            <oc-textarea v-model ="formData.description" placeholder ="描述信息" />
                        </oc-form-item1>
                        <oc-form-item1 label="产品代码"  prop ="fareBasis">
                            <oc-input v-model ="formData.fareBasis" :upper="true"  />
                        </oc-form-item1>
                        <oc-form-item1 label="折扣代码"  prop ="discountCode">
                            <oc-input v-model ="formData.discountCode" :maxlength="5"/>
                        </oc-form-item1>
                         <oc-form-item1 label="是否检查库存"  prop ="availability">
                            <oc-radio v-model ="formData.availability" :options='[{name:"是",value:"N"},{name:"否",value:"Y"}]'/>
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
                    discountCode:'',
                    availability:''
                },
                rules:{
                    firstMaintenanceDate: [
                        { required: true, message: '销售起始日期必填', trigger: 'change' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
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
