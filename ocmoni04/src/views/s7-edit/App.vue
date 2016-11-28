<template>
    <div class ="s7editpage">
        <div class="header-container ">
            <div class="navbar-fixed-top">
                 <Navbar/>
                <QuerySection v-on:clickSaveFormBtn="handleSaveForm" v-on:clickResetFormBtn="handleReset"/>
            </div>
        </div>
        
        <div class="container-fluid main_content" >
           <oc-form id="s7_form" :model ="formData" :rules="rules" ref ="editForm" label-width ="120px">
               <NewVersionService :value ="serviceData.recordS5Id" @input ="handleSelectService" 
                    :options ="serviceData.serviceChooseList" />

               <DataSection left ="2.确定费用" right ="描述 | 费用">
                   <ContentLayout title="描述">
                        <oc-form-item1 label="销售生效日期" :required="true" prop ="firstMaintenanceDate">
                            <oc-datepicker v-model ="formData.firstMaintenanceDate" :time="true" />
                        </oc-form-item1>
                        <oc-form-item1 label="销售截止日期"  prop ="lastMaintenanceDate">
                            <oc-datepicker v-model ="formData.lastMaintenanceDate"  :time="true" />
                        </oc-form-item1>
                        <oc-form-item2 label="使用时间限制"  prop="useDateLimit" errorPosition ="bottom"
                            :serviceType="serviceData.serviceType"
                            :subGroupList="['FP','FL']"
                            :subGroup="serviceData.subGroup" 
                            :names="['firstUseDate','lastUseDate','effectivePeriodType','effectivePeriodNumber','effectivePeriodUnit']">
                            <div class="col-sm-4">
                                <UseDateLimitChangeBtn v-model ="formData.useDateLimitTye"  :formData="formData"
                                    :subGroup="serviceData.subGroup"/>
                                <div class = "table_layout" style="width: 100%;" v-show="formData.useDateLimitTye==''">
                                    <oc-datepicker v-model="formData.firstUseDate" style="width:48%;display: inline-block;" />
                                    <oc-datepicker v-model="formData.lastUseDate" style="width:48%;display: inline-block;" />
                                </div>
                                <div class = "table_layout" style="width: 100%;" v-show="formData.useDateLimitTye=='1'">
                                    <oc-select v-model="formData.effectivePeriodType" style="width:48%;display: inline-block;"  
                                        :options ="optionsData.effectivePeriodType"/>
                                    <oc-input v-model ="formData.effectivePeriodNumber" style="width:24%;display: inline-block;" />
                                    <oc-select v-model ="formData.effectivePeriodUnit" style="width:24%;display: inline-block;"  
                                        :options ="optionsData.effectivePeriodUnit"/>
                                </div>
                            </div>
                        </oc-form-item2>
                        <oc-form-item2 label="服务套数" prop ="serviceNumber" 
                            :names ="['serviceNumberMinimum','serviceNumberMaximum']"
                            :serviceTypeList="['F','R','T','A','B','C','E','P']"
                            :serviceType="serviceData.serviceType"
                            :groupList="['FP']"
                            :group="serviceData.group"
                            >
                            <div class="col-sm-2">
                                <oc-input-number slot="slot1" :min="0" :max ="100" placeholder="0-100之间" 
                                    v-model ="formData.serviceNumberMinimum" />
                            </div>
                            <div class="col-sm-2">
                                 <oc-input-number slot="slot2" :min="0" :max ="100" placeholder="0-100之间" 
                                    v-model ="formData.serviceNumberMaximum" />
                            </div>
                        </oc-form-item2>
                        <oc-form-item1 label="描述"  prop ="description"
                            :serviceTypeList="['F','M','R','T','B','E']"
                            :serviceType="serviceData.serviceType"
                            >
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

                    <ContentLayout title="行李" v-show="serviceData.serviceType == 'A' || serviceData.serviceType == 'C' || serviceData.serviceType == 'P'">
                        <oc-form-item1 label="免费行李件数"  prop ="freeBaggageAllowancePieces"
                            :serviceTypeList="['A']" :serviceType="serviceData.serviceType">
                            <oc-input-number v-model ="formData.freeBaggageAllowancePieces" :min="1" placeholder ="正整数" />
                        </oc-form-item1>
                        <oc-form-item2 label="收费行李件数"  prop ="excessOccurrence"
                            :serviceTypeList="['C']" :serviceType="serviceData.serviceType">
                            <div class="col-sm-2">
                                 <oc-input-number v-model ="formData.firstExcessOccurrence" :min="1" placeholder ="正整数"/>
                            </div>
                            <div class="col-sm-2">
                                 <oc-input-number v-model ="formData.lastExcessOccurrence" :min="1" placeholder ="正整数" />
                            </div>
                        </oc-form-item2>
                         <oc-form-item2 label="行李重量"  prop ="freeBaggageAllowanceWeight"
                            :serviceTypeList="['A','C','P']" :serviceType="serviceData.serviceType">
                            <div class="col-sm-2">
                                 <oc-input-number v-model ="formData.freeBaggageAllowanceWeight" :min="1" placeholder ="正整数"/>
                            </div>
                            <div class="col-sm-2">
                                 <oc-select v-model ="formData.freeBaggageAllowanceUnit" :options="options2"/>
                            </div>
                        </oc-form-item2>
                        <oc-form-item1 label="行李使用范围"  prop ="baggageTravelApplication"
                            :serviceTypeList="['A','C','P']" :serviceType="serviceData.serviceType">
                            <oc-select v-model ="formData.baggageTravelApplication" :options="options2"/>
                        </oc-form-item1>
                        <oc-form-item0 label="备注例外行李"  prop ="list196VO" :span="6"
                            :serviceTypeList="['A','C','P']" :serviceType="serviceData.serviceType">
                            <Table196 :list="formData.list196VO"/>
                        </oc-form-item0>
                    </ContentLayout>

                    <ContentLayout title="费用">
                      <oc-form-item1 label="是否收费"  prop ="noChargeNotAvailable">
                          <oc-select :options ="options2" v-model ="formData.noChargeNotAvailable"/>
                      </oc-form-item1>  
                      <oc-form-item0 label="金额"  prop ="list170VOAndlist201VO">
                          <Table170And201 :serviceType="serviceData.serviceType" 
                            :list201VO="formData.list201VO"
                            :list170VO="formData.list170VO"
                          />
                      </oc-form-item0>  
                      <oc-form-item2 label="测试区域"  prop ="loc" :names="['locType','locValue']" >
                          <div class="col-sm-2">
                              <oc-select :options="options2" v-model ="formData.locType"/>
                          </div>
                          <div class="col-sm-2">
                              <oc-input v-model ="formData.locValue" />
                          </div>
                          <div class="col-sm-2">
                              <div class="table_control">
                        		自定义区域
                                ---复用标号
                        	  </div>
                          </div>
                          
                          <div slot="slot2">
                              <div class="col-sm-8">
                                  <Table178/>
                              </div>
                          </div>
                      </oc-form-item2>  

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
    import NewVersionService from './NewVersionService.vue' ;
    import {initPage4AddApi,initPage4UpdateApi} from '../../api/s7-edit.js' ;
    import {validateFirstMaintenanceDate,validateLastMaintenanceDate,validateServiceNumber,
        validateUseDateLimit,validateLoc} from './validate.js' ;
    import UseDateLimitChangeBtn from './UseDateLimitChangeBtn.vue' ;
    import Table196 from './Table196.vue' ;
    import Table170And201 from './Table170And201.vue' ;
    import Table178 from './Table178.vue' ;
    export default {
        components:{
            Navbar,
            QuerySection,
            DataSection,
            ContentLayout,
            NewVersionService,
            UseDateLimitChangeBtn,
            Table196,
            Table170And201,
            Table178
        },
        data(){
            let firstMaintenanceDate = (rule,value,callback)=>{
                validateFirstMaintenanceDate(value,callback,this.formData) ;
            }
            let lastMaintenanceDate =(rule,value,callback)=>{
                validateLastMaintenanceDate(value,callback,this.formData) ;
            }
            let serviceNumber =(rule, value, callback) =>{
                 validateServiceNumber(value,callback,this.formData) ;
            }
            let useDateLimit = (rule, value, callback) =>{
                validateUseDateLimit(value,callback,this.formData) ;
            }
            let loc = (rule,value,callback) =>{
                validateLoc(value,callback,this.formData) ;
            }

            return {
                formData:{
                    firstMaintenanceDate:'',
                    lastMaintenanceDate:'',
                    serviceNumberMinimum:'',
                    serviceNumberMaximum:'',
                    description:'',
                    fareBasis:'',
                    discountCode:'',
                    availability:'',
                    select2:'',
                    useDateLimitTye:'',//使用时间限制类型[时间段:'']或[期限:'1']
                    effectivePeriodType:'',
                    effectivePeriodNumber:'',
                    effectivePeriodUnit:'',
                    firstUseDate:'',
                    lastUseDate:'',
                    freeBaggageAllowancePieces:'',
                    firstExcessOccurrence:'',
                    lastExcessOccurrence:'',
                    freeBaggageAllowanceWeight:'',
                    freeBaggageAllowanceUnit:'',
                    baggageTravelApplication:''/*行李使用范围*/,
                    list196VO:[],
                    noChargeNotAvailable:'',/*是否收费*/
                    list170VO:[],
                    list201VO:[],
                    locType:'',
                    locValue:''
                },
                serviceData:{/*选择服务相关的数据**/
                    recordS5Id:'',
                    serviceType:'F',
                    group:'',
                    subGroup:'',
                    subCode:'',
                    serviceChooseList:[]
                },
                rules:{
                    firstMaintenanceDate: [
                        {required: true, message: '销售起始日期必填', trigger: 'change,blur' },
                        {validator:firstMaintenanceDate,trigger:'change,blur'}
                    ],
                    lastMaintenanceDate:[
                        {validator: lastMaintenanceDate ,trigger: 'change,blur'}
                    ],
                    serviceNumber:{
                        serviceNumberMinimum:[{required:true,trigger:'blur',message: '服务套数1必填'}],
                        serviceNumberMaximum:[{ validator: serviceNumber ,trigger: 'blur'}]
                    },
                    useDateLimit:{
                        firstUseDate:[
                            {validator: useDateLimit ,trigger: 'change,blur'}
                        ]
                    },
                    loc:{
                        locType:[
                             {validator: loc ,trigger: 'change,blur'} 
                        ]
                    }
                },
                options2:[
                    {name:"选择",value:""},
                    {name:"类型F",value:"F"}
                ],
                optionsData:{
                    effectivePeriodType:[
                        {"name":"选择","value":""},{"name":"距购买服务后","value":"A"},
                        {"name":"距服务兑换后","value":"B"},
                        {"name":"距航班起飞前","value":"D",disabled:true}
                    ] ,
                    effectivePeriodUnit:[
                        {"name":"天","value":"D"},{"name":"月","value":"M"},
                        {"name":"小时","value":"H"}
                    ]
                }
            } ;
        },
        methods:{
            handleSaveForm(type){
               console.info('formData : ' + JSON.stringify(this.formData)) ;

               var jqFlag = this.validator.form() ;
               console.info('jquery validate flag  : ' +jqFlag )  ;
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
            handleSelectService(id){
                //console.info('id : ' + id) ;
                /*  "id": "bgdataimp100018",
                "carrCode": "CA",
                "serviceType": "P",
                "serviceSubCode": "0GO",
                "commercialName": "UPTO50LB 23KG AND62LI 158LCM",
                "attributesGroup": "BG",
                "attributesSubgroup": "",
                "serviceGroupDescription": "Baggage",
                "subGroupDescription": "",
                "subCodeTableNo163": 0
                */
                let retObj = this.serviceData.serviceChooseList.find(function(item){
                    return item.id === id ;
                });
                let {attributesGroup,attributesSubgroup,serviceType,serviceSubCode} = retObj ;
                this.serviceData.recordS5Id = id ;
                this.serviceData.serviceType = serviceType ;
                this.serviceData.group = attributesGroup ;
                this.serviceData.subGroup = attributesSubgroup ;
                this.serviceData.subCode = serviceSubCode ;
            }
       },
       mounted(){
           initPage4AddApi().then(retData=>{
               if(retData.flag==='true'||retData.flag===true){
                   let len = this.serviceData.serviceChooseList.length ;
                   this.serviceData.serviceChooseList.splice(0,len) ;
                   for(let item of retData.serviceChooseList){
                       this.serviceData.serviceChooseList.push(item) ;
                   }
                   //console.info("retList : " ,retData.serviceChooseList) ;
               }else{
                   console.info('数据加载不完整...') ;
               }
           },error =>{
               console.info('error : ',error) ;
           })
           initPage4UpdateApi().then(retData=>{
               let {formData} = retData ;
               Object.assign(this.formData,formData) ;
           }) ;

           var validator = $("#s7_form").validate({meta : ""});
		   this.validator = validator ;
       }
    }
</script>
