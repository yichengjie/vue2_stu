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
                            <oc-datetimepicker pickerType="datetime" v-model ="formData.firstMaintenanceDate"  />
                        </oc-form-item1>
                        <oc-form-item1 label="销售截止日期"  prop ="lastMaintenanceDate">
                            <oc-datetimepicker pickerType="datetime" v-model ="formData.lastMaintenanceDate"   />
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
                      <oc-form-item1 label="旅行结束日期"  prop ="travelEndDate"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker v-model ="formData.travelEndDate">
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
<script src ="./app-script.js">
</script>
<style>
    body{margin-bottom: 50px;}
</style>
