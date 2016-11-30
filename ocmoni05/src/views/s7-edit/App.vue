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
                            <oc-datetimepicker pickerType="datetime" v-model ="formData.firstMaintenanceDate" :time="true" />
                        </oc-form-item1>
                        <oc-form-item1 label="销售截止日期"  prop ="lastMaintenanceDate">
                            <oc-datetimepicker pickerType="datetime" v-model ="formData.lastMaintenanceDate"  :time="true" />
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
                                    <oc-datetimepicker v-model="formData.firstUseDate" style="width:48%;display: inline-block;" />
                                    <oc-datetimepicker v-model="formData.lastUseDate" style="width:48%;display: inline-block;" />
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
                      <oc-form-item1 label="金额"  prop ="list170VOAndlist201VO">
                          <oc-input :readonly="true" />
                      </oc-form-item1>  
                      <oc-form-item1 label="或/和"  prop ="specSevFeeAndOrIndicator" :serviceTypeList ='["F","M","R","T","C","P"]' 
                            :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.specSevFeeAndOrIndicator" :options ="optionsData.specSevFeeAndOrIndicator"/>
                      </oc-form-item1>
                      <oc-form-item1 label="里程兑换标识"  prop ="mileageExchangeIndicator" :span="6"
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.mileageExchangeIndicator" :options ="optionsData.mileageExchangeIndicator"/>
                      </oc-form-item1>
                      <oc-form-item1 label="里程费"  prop ="specifiedServiceFeeMileage" 
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-input  v-model ="formData.specifiedServiceFeeMileage" />
                      </oc-form-item1>     
                      <oc-form-item1 label="适用于"  prop ="specifiedServiceFeeApp" 
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-select  v-model ="formData.specifiedServiceFeeApp" :options ="optionsData.specifiedServiceFeeApp" />
                      </oc-form-item1> 
                      <oc-form-item1 label="包含/扣除"  prop ="specServiceFeeColSub" 
                            :serviceTypeList ='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                          <oc-select  v-model ="formData.specServiceFeeColSub" :options ="optionsData.specServiceFeeColSub" />
                      </oc-form-item1>
                      <oc-form-item1 label="净价/销售价"  prop ="specServiceFeeColSub" 
                            :serviceTypeList ='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                          <oc-select  v-model ="formData.specServiceFeeNetSell" :options ="optionsData.specServiceFeeNetSell" />
                      </oc-form-item1>
                      <oc-form-item1 label="有无代理费"  prop ="indicatorComission" 
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.indicatorComission" :options ="optionsData.indicatorComission" />
                      </oc-form-item1>  
                      <oc-form-item1 label="有无税费"  prop ="taxApplication" 
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.taxApplication" :options ="optionsData.taxApplication" />
                      </oc-form-item1>   
                    </ContentLayout>
               </DataSection>

               <DataSection left ="3.规则详细" right ="序号 | 旅客 | 发布 | 航程 | 航班 | 购买 | 票价 | 票证 | 退款">
                   <ContentLayout title="序号">
                       <oc-form-item1 label ="优先级序号" prop ="sequenceNumber" >
                           <oc-input-number v-model ="formData.sequenceNumber" placeholder="序号越小，优先级越高" />
                       </oc-form-item1>
                   </ContentLayout>
                   <ContentLayout title="旅客">
                       <oc-form-item1 label ="旅客类型" prop ="passengerTypeCode" 
                         :serviceTypeList ='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-select v-model ="formData.passengerTypeCode" :options ="optionsData.passengerTypeCode" />
                       </oc-form-item1>
                       <oc-form-item2 label="年龄范围"  prop ="minAndMaxPassengerAge" :names="['minPassengerAge','maxPassengerAge']"
                            :serviceTypeList='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.minPassengerAge"  /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.maxPassengerAge"  /></div>
                       </oc-form-item2>
                       <oc-form-item2 label="服务适用人数范围"  prop ="allowancePeopleMinAndMaximum" :names="['allowancePeopleMinimum','allowancePeopleMaximum']"
                            :serviceTypeList='["F","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.allowancePeopleMinimum"  /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.allowancePeopleMaximum"  /></div>
                       </oc-form-item2>

                       <oc-form-item2 label="旅客序号范围"  prop ="firstAndLastPassengerOccurrence" :names="['firstPassengerOccurrence','lastPassengerOccurrence']"
                            :serviceTypeList='["F","M","R","T"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.firstPassengerOccurrence"  /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.lastPassengerOccurrence"  /></div>
                       </oc-form-item2>
                       <oc-form-item1 label ="常旅客状态" prop ="frequentFlyerStatus" 
                         :serviceTypeList ='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-select v-model ="formData.frequentFlyerStatus" :options ="optionsData.frequentFlyerStatus" />
                       </oc-form-item1>
                       <oc-form-item2 label="客户积分范围"  prop ="firstAndLastPassengerOccurrence" :names="['customerIndexScoreMinimum','customerIndexScoreMaxmum']"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.customerIndexScoreMinimum"  /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.customerIndexScoreMaxmum"  /></div>
                       </oc-form-item2>
                       <oc-form-item1 label="大客户/特殊客户"  prop ="list172VO" 
                            :serviceTypeList='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-input-number />
                       </oc-form-item1>
                   </ContentLayout>

                  <ContentLayout title="发布">
                      <oc-form-item1 label="发布对象"  prop ="list178VO" 
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-input-number />
                      </oc-form-item1>
                      <oc-form-item1 label="公布私有"  prop ="publicPrivateIndicator" 
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-radio v-model ="formData.publicPrivateIndicator" :options ="optionsData.publicPrivateIndicator" />
                      </oc-form-item1>
                  </ContentLayout>

                  <ContentLayout title="航程">
                      <oc-form-item1 label="区域限制"  prop ="geoSpecFromToWithin" :span="6"
                            :serviceTypeList='["F","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-radio v-model ="formData.geoSpecFromToWithin" :options ="optionsData.geoSpecFromToWithin" />
                      </oc-form-item1>
                      <oc-form-item1 label="Sector/Portion/Journey"  prop ="geoSpecSectPortJourney" 
                            :serviceTypeList='["F","R","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-select v-model ="formData.geoSpecSectPortJourney" :options ="optionsData.geoSpecSectPortJourney" />
                      </oc-form-item1>
                      <oc-form-item1 label="指定区域"  prop ="geoSpecTravelIndicator" 
                            :serviceTypeList='["F","R","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-input v-model ="formData.geoSpecTravelIndicator" />
                      </oc-form-item1>
                      <oc-form-item2 label="经停时间"  prop ="geoSpecExceptionStopTimeAndUnit" :names="['geoSpecExceptionStopTime','geoSpecExceptionStopUnit']"
                            :serviceTypeList='["F","R","A","C","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.geoSpecExceptionStopTime"  /></div>
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecExceptionStopUnit" :options ="optionsData.geoSpecExceptionStopUnit" /></div>
                      </oc-form-item2>
                      <oc-form-item1 label="经停类型"  prop ="geoSpecStopConnDes" 
                            :serviceTypeList='["F","R","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-input v-model ="formData.geoSpecStopConnDes" />
                      </oc-form-item1>
                      <oc-form-item2 label="区域1"  prop ="geoSpec1" :names="['geoSpecLoc1Type','geoSpecLoc1']">
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecLoc1Type" :options ="optionsData.geoSpecLoc1Type" /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.geoSpecLoc1"  /></div>
                      </oc-form-item2>
                      <oc-form-item2 label="区域2"  prop ="geoSpec2" :names="['geoSpecLoc2Type','geoSpecLoc2']">
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecLo21Type" :options ="optionsData.geoSpecLoc1Type" /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.geoSpecLoc2"  /></div>
                      </oc-form-item2>
                      <oc-form-item2 label="经过区域"  prop ="geoSpec3" :names="['geoSpecLoc3Type','geoSpecLoc3']">
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecLoc3Type" :options ="optionsData.geoSpecLoc1Type" /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.geoSpecLoc3"  /></div>
                      </oc-form-item2>
                      <oc-form-item2 label="里程范围"  prop ="mileageMinAndMaximum" :names="['mileageMinimum','mileageMaximum']"
                            :serviceTypeList='["F","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.mileageMinimum"  /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.mileageMaximum"  /></div>
                      </oc-form-item2>
                      <oc-form-item1 label="是否联程"  prop ="indicatorInterline"
                            :serviceTypeList='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-radio v-model ="formData.indicatorInterline" :options ="optionsData.indicatorInterline" />
                      </oc-form-item1>
                  </ContentLayout>
                  <ContentLayout title="航班">
                      <oc-form-item1 label="旅行开始日期"  prop ="travelStartDate"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker v-model ="formData.travelStartDate">
                      </oc-form-item1>
                      <oc-form-item1 label="旅行结束日期"  prop ="travelStartDate"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker v-model ="formData.travelStartDate">
                      </oc-form-item1>
                      <oc-form-item1 label="开始时刻"  prop ="startTime"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker pickerType="time" v-model ="formData.startTime">
                      </oc-form-item1>
                      <oc-form-item1 label="结束时刻"  prop ="stopTime"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker pickerType="time" v-model ="formData.stopTime">
                      </oc-form-item1>
                      <oc-form-item1 label="星期"  prop ="dayOfWeek" :span ="7"
                            :serviceTypeList='["F","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-checkbox v-model ="formData.dayOfWeek" :options ="optionsData.dayOfWeek">
                      </oc-form-item1>
                      <oc-form-item1 label="机型"  prop ="equipmentAndlist165" :names ="['equipment']"
                            :serviceTypeList='["F","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-select v-model ="formData.equipment" :options ="optionsData.equipment">
                      </oc-form-item1>
                      <oc-form-item1 label ="航班号" prop ="list186VO">
                          <oc-input  />
                      </oc-form-item1>
                      <oc-form-item1 label ="舱位等级" prop ="cabin">
                          <oc-select v-model ="formData.cabin" :options ="optionsData.cabin">
                      </oc-form-item1>
                      <oc-form-item1 label ="升舱到的服务等级" prop ="upgradeToCabin">
                          <oc-select v-model ="formData.upgradeToCabin" :options ="optionsData.cabin">
                      </oc-form-item1>
                  </ContentLayout>
                  <ContentLayout title="购买" v-show ="serviceData.serviceType !== 'A' && serviceData.serviceType !== 'B' &&serviceData.serviceType !== 'E'">
                       <oc-form-item2 label="提前购票时间"  prop ="advancedPurchasePeriodAndUnit" :names="['advancedPurchasePeriod','advancedPurchaseUnit']"
                            :serviceTypeList='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.advancedPurchasePeriod"  /></div>
                           <div class="col-sm-2"><oc-select v-model ="formData.advancedPurchaseUnit" :options ="optionsData.advancedPurchaseUnit"  /></div>
                      </oc-form-item2>
                  </ContentLayout>
                  <ContentLayout title="兑换">
                      <oc-form-item0 label ="允许兑换的服务" >
                          <div class="table_control text-info">
                              航班号
                          </div>
                      </oc-form-item0>
                  </ContentLayout>
                  <ContentLayout title="票价">
                      <oc-form-item1 label ="旅行编码" prop ="tourCode">
                          <oc-input v-model ="formData.tourCode" />
                      </oc-form-item1>
                      <oc-form-item1 label ="TARIFF NO." prop ="tariff">
                          <oc-input v-model ="formData.tariff" />
                      </oc-form-item1>
                      <oc-form-item1 label ="RULE NO." prop ="rule">
                          <oc-input v-model ="formData.rule" />
                      </oc-form-item1>
                  </ContentLayout>

                  <ContentLayout title="票价">
                      <oc-form-item1 label ="与机票同时出票" prop ="advancedPurchaseTktIssue">
                          <oc-radio v-model ="formData.advancedPurchaseTktIssue" :options ="optionsData.advancedPurchaseTktIssue" />
                      </oc-form-item1>
                  </ContentLayout>
                  <ContentLayout title="退款">
                      <oc-form-item1 label ="是否可退" prop ="indicatorReissueRefund" :span ="6">
                          <oc-radio v-model ="formData.indicatorReissueRefund" :options ="optionsData.indicatorReissueRefund" />
                      </oc-form-item1>
                      <oc-form-item1 label ="退款形式" prop ="formOfRefund" :span ="6">
                          <oc-radio v-model ="formData.formOfRefund" :options ="optionsData.formOfRefund" />
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
                    specSevFeeAndOrIndicator:'',/*或-和*/
                    mileageExchangeIndicator:'',/*里程积分兑换标识*/
                    specifiedServiceFeeMileage:'',/*里程费*/
                    specifiedServiceFeeApp:'适用于',
                    specServiceFeeColSub:'',/*包含-扣除*/
                    specServiceFeeNetSell:'',/*净价-销售价*/
                    indicatorComission:'Y',/*有无代理费*/
                    taxApplication:'Y',/*有无税费*/
                    sequenceNumber:'',/*优先级序号*/
                    passengerTypeCode:'',/**旅客类型*/
                    minPassengerAge:'',/*年龄范围*/
                    maxPassengerAge:'',
                    allowancePeopleMinimum:'',/*服务人数范围*/
                    allowancePeopleMaximum:'',
                    firstPassengerOccurrence:'',/*旅客序号范围*/
                    lastPassengerOccurrence:'',
                    frequentFlyerStatus:'',/*常旅客状态*/
                    customerIndexScoreMinimum:'',/**客户积分范围*/
                    customerIndexScoreMaxmum:'',
                    list172VO:[],/*大客户-特殊客户**/
                    list178VO:[],/**发布对象*/
                    publicPrivateIndicator:'',/*公布私有**/
                    geoSpecFromToWithin:'',/*区域限制*/
                    geoSpecSectPortJourney:'',/**区域部分全程*/
                    geoSpecTravelIndicator:'',/*指定区域*/
                    geoSpecExceptionStopTime:'',/*经停时间*/
                    geoSpecExceptionStopUnit:'',/*经停单位*/
                    geoSpecStopConnDes:'',/*经停类型*/
                    geoSpecLoc1Type:'',/*区域1*/
                    geoSpecLoc1:'',
                    geoSpecLoc2Type:'',/*区域2*/
                    geoSpecLoc2:'',
                    geoSpecLoc3Type:'',/*区域3*/
                    geoSpecLoc3:'',
                    mileageMinimum:'',/*里程范围*/
                    mileageMaximum:'',
                    indicatorInterline:'Y',/*是否联程*/
                    travelStartDate:'',/*旅行开始日期*/
                    travelEndtDate:'',/*旅行截止日期*/
                    startTime:'',/*起始时刻*/
                    stopTime:'',/*结束时刻*/
                    dayOfWeek:['3'],/*星期*/
                    equipment:'',/*机型*/
                    cabin:'',/*舱位等级*/
                    upgradeToCabin:'',/*升舱到的服务等级*/
                    advancedPurchasePeriod:'',/*提前购票时间*/
                    advancedPurchaseUnit:'',/*提前购票时间单位*/
                    tourCode:'',/*旅行编码*/
                    tariff:'',/*TARIFF NO.**/
                    rule:'',/*RULE NO.*/
                    advancedPurchaseTktIssue:'',/*与机票同时出票**/
                    indicatorReissueRefund:'',/**是否可退*/
                    formOfRefund:''/*退款形式*/
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
                        {required: true, message: '销售起始日期必填', trigger: 'change' },
                        {validator:firstMaintenanceDate,trigger:'change'}
                    ],
                    lastMaintenanceDate:[
                        {validator: lastMaintenanceDate ,trigger: 'change'}
                    ],
                    serviceNumber:{
                        serviceNumberMinimum:[{required:true,trigger:'change',message: '服务套数1必填'}],
                        serviceNumberMaximum:[{ validator: serviceNumber ,trigger: 'change'}]
                    },
                    useDateLimit:{
                        firstUseDate:[
                            {validator: useDateLimit ,trigger: 'change'}
                        ]
                    }
                },
                options2:[
                    {name:"选择",value:""},
                    {name:"类型F",value:"F"}
                ],
                optionsData:{
                    effectivePeriodType:[
                        {name:"选择","value":""},{name:"距购买服务后",value:"A"},
                        {name:"距服务兑换后",value:"B"},
                        {name:"距航班起飞前",value:"D",disabled:true}
                    ] ,
                    effectivePeriodUnit:[
                        {name:"天",value:"D"},{name:"月",value:"M"},
                        {name:"小时",value:"H"}
                    ],
                    specSevFeeAndOrIndicator:[/*或-和*/
                        {name:"或",value:""},{name:"和",value:"A"},
                    ],
                    mileageExchangeIndicator:[/*里程积分兑换标识*/
                        {name:"不兑换",value:''},{name:"兑换，用里程支付",value:'1'},{name:"兑换，用里程或金额支付",value:'2'}
                    ],
                    specifiedServiceFeeApp:[/*适用于*/
                        {"name":"每一个票价组成部分算一次服务费用","value":"1"},{"name":"每一个票价组成部分算一半的服务费用","value":"2"},
                        {"name":"每用一次服务算一次服务费用","value":"3"},{"name":"匹配的部分航程算一次服务费用","value":"4"},
                        {"name":"往返程服务费用【F/R/T】","value":"5"},{"name":"每公斤按公布运价的0.5%收费","value":"H"},
                        {"name":"每公斤按公布运价的1%收费","value":"C"},{"name":"每公斤按公布运价的1.5%收费","value":"P"},
                        {"name":"按每公斤收费","value":"K"},{"name":"按每5公斤收费","value":"F"}
                    ],
                    specServiceFeeColSub:[/*包含扣除**/
                        {"name":"包含在票价中","value":"I"},{"name":"单独收费","value":""}
                    ],
                    specServiceFeeNetSell:[
                        {"name":"销售价","value":""},{"name":"净价","value":"N"}
                    ],
                    indicatorComission:[/*有无代理费*/
                        {"name":"有","value":"Y"},{"name":"无","value":"N"}
                    ],
                    taxApplication:[/*有无税费*/
                       {"name":"有","value":"Y"},{"name":"无","value":"N"}  
                    ],
                    passengerTypeCode:[/**旅客类型(这个数据从后台查询过来)*/
                        {name:'选择',value:''}
                    ],
                    frequentFlyerStatus:[/*常旅客状态(这个数据从后台查询过来)*/
                        {name:'选择',value:''}
                    ],
                    publicPrivateIndicator:[/*公布-私有*/
                         {name:'公布',value:''},{name:'私有',value:'P'}
                    ],
                    geoSpecFromToWithin:[/**区域限制*/
                        {name:'不限区域',value:''},{name:'区域1→2',value:'1'},
                        {name:'区域2→1',value:'2'},{name:'区域1内部',value:'W'}
                    ],
                    geoSpecSectPortJourney:[/**区域-部分-全程*/
                        {"name":"选择","value":""},{"name":"Sector","value":"S"},
                        {"name":"Portion","value":"P"},{"name":"Journey","value":"J"}
                    ],
                    geoSpecExceptionStopUnit:[/**经停时间单位*/
                        {"name":"选择","value":""},{"name":"分","value":"N"},
                        {"name":"小时","value":"H"},{"name":"天","value":"D"},
                        {"name":"月","value":"M"}
                    ],
                    geoSpecLoc1Type:[/**区域单位*/
                        {"name":"选择","value":""},
                        {"name":"大区","value":"A"},{"name":"城市","value":"C"},
                        {"name":"国家","value":"N"},{"name":"机场","value":"P"},
                        {"name":"州","value":"S"},{"name":"区域","value":"Z"}
                    ],
                    indicatorInterline:[
                        {"name":"是","value":"Y"},{"name":"否","value":"N"}
                    ],
                    dayOfWeek:[
                        {"name":"星期一","value":"1"},{"name":"星期二","value":"2"},
                        {"name":"星期三","value":"3"},{"name":"星期四","value":"4"},
                        {"name":"星期五","value":"5"},{"name":"星期六","value":"6"},
                        {"name":"星期日","value":"7"}
                    ],
                    equipment:[/*机型(这个数据从后台查询过来)**/
                         {name:'选择',value:''}
                    ],
                    cabin:[/*舱位等级*/
                        {"name":"选择","value":""},
                        {"name":"豪华头等舱","value":"R"},{"name":"头等舱","value":"F"},
                        {"name":"豪华商务舱","value":"J"},{"name":"商务舱","value":"C"},
                        {"name":"豪华经济舱","value":"P"},{"name":"经济舱","value":"Y"}
                    ],
                    advancedPurchaseUnit:[/*提前购票时间单位*/
                        {"name":"分","value":"N"}, {"name":"小时","value":"H"},
                        {"name":"天","value":"D"}, {"name":"月","value":"M"}
                    ],
                    advancedPurchaseTktIssue:[/**与机票同时出票*/
                        {"name":"是","value":""}, {"name":"否","value":"X"},
                    ],
                    indicatorReissueRefund:[/*是否可退*/
                        {"name":"不可退款","value":"N"},
                        {"name":"可退款","value":"Y"}, {"name":"可改","value":"R"}
                    ],
                    formOfRefund:[/**退款形式*/
                        {"name":"选择","value":""},{"name":"按原付款渠道退款","value":"1"},
				        {"name":"按电子凭证退款","value":"2"}
                    ]
                }
            } ;
        },
        methods:{
            handleSaveForm(type){
               console.info('formData : ' + JSON.stringify(this.formData)) ;

               //var jqFlag = this.validator.form() ;
               //console.info('jquery validate flag  : ' +jqFlag )  ;
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
                this.serviceData.recordS5Id = '';
                let retObj = this.serviceData.serviceChooseList.find(function(item){
                    return item.id === id ;
                });
                //if(){}
                let {attributesGroup,attributesSubgroup,serviceType,serviceSubCode} = retObj ||{} ;
                this.serviceData.recordS5Id = id || '';
                this.serviceData.serviceType = serviceType || 'F' ;
                this.serviceData.group = attributesGroup || '';
                this.serviceData.subGroup = attributesSubgroup || '' ;
                this.serviceData.subCode = serviceSubCode || '';
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
           //var validator = $("#s7_form").validate({meta : ""});
		   //this.validator = validator ;
       }
    }
</script>
<style>
    body{
        margin-bottom: 50px;
    }
</style>
