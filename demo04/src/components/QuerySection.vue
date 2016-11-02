<template>
<div class ="query_section">
    <div class="query_row">
        <span class="query_title">基础信息</span>
        <input id ="releaseStatus01" name ="statusArr" type="checkbox" value ="1" 
            v-model ="formData.statusArr" /><label for="releaseStatus01">未发布</label>
        <input id ="releaseStatus02" name ="statusArr" type="checkbox" value ="2" 
            v-model ="formData.status" /><label for="releaseStatus02">已发布</label>
        <input  id ="effectStatus01" name="effStatusArr" type="checkbox" value ="1" 
            v-model ="formData.effStatusArr" /><label for="effectStatus01"> 未生效</label>
        <input  id ="effectStatus02" name="effStatusArr" type="checkbox" value ="2" 
            v-model ="formData.effStatusArr" /> <label for="effectStatus02">已生效</label>
        <input  id ="effectStatus03" name="effStatusArr" type="checkbox" value ="3" 
            v-model ="formData.effStatusArr" /> <label for="effectStatus03">已过期</label>

        <label  class="marginR5 title">SUBCODE</label>
        <input type="text" class="common_input" v-model ="formData.subcode" mode="upper" style="width:150px;" 
            placeholder="多个用/分割"/><label  class="marginR5 title">优先级序号</label>
        <input type="text" class="common_input" v-model ="formData.startSequenceNumber" style="width:80px;" />
        <span class="marginRL2">—</span>
        <input type="text" class="common_input" v-model ="formData.endSequenceNumber" style="width:80px;" />
            
        <span class="pull-right marginR15">
            <input  id ="moreInputBtn" type="checkbox" v-model="showMoreQuerySectionFlag" /> 
            <label for="moreInputBtn">更多条件</label>
            <button type="button" id="s7QueryBtn" url="${pageContext.request.contextPath}/s7/s7Query.action"
                    class="btn btn-sm btn-primary" v-on:click="handleClickQuery">查询</button>
        </span>
    </div>
    <transition name="fade">
    <div  v-show ="showMoreQuerySectionFlag" >
        <div class="query_row">
            <span class="query_title">服务等级&nbsp;|&nbsp;日期</span>
            <input id ="serviceType01" value="F" name="serviceTypeArr"  v-model ="formData.serviceTypeArr" type="checkbox"><label for="serviceType01">F-航班服务</label>
            <input id ="serviceType02" value="A" name="serviceTypeArr"  v-model ="formData.serviceTypeArr" type="checkbox"><label for="serviceType02">A-免费行李</label>
            <input  id ="serviceType03" value="C" name="serviceTypeArr" v-model ="formData.serviceTypeArr" type="checkbox"><label for="serviceType03">C-逾重行李</label>
            <input  id ="serviceType04" value="P" name="serviceTypeArr" v-model ="formData.serviceTypeArr" type="checkbox"> <label for="serviceType04">P-预付费行李</label>
            <span class="marginR15"></span>
            <label class="marginR5 title">销售日期</label>
            <input type="text" id="effectMinDate" v-model ="formData.effectMinDate" class="common_input datepicker" style="width: 110px" />
            <label for="effectMinDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span style="margin-right:4px;">—</span>
            <input type="text" id="effectMaxDate"  v-model ="formData.effectMaxDate" class="common_input datepicker" style="width: 110px">
            <label for="effectMaxDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span class="marginR15"></span>
            <label class="marginR5 title">旅行日期</label>
            <input type="text" id="travelStartDate"  v-model ="formData.travelStartDate" class="common_input datepicker" style="width: 110px" />
            <label for="travelStartDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span style="margin-right:4px;">—</span>
            <input type="text" id="travelEndDate"  v-model ="formData.travelEndDate" class="common_input datepicker" style="width: 110px">
            <label for="travelEndDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
        </div>

        <div class="query_row">
            <span class="query_title">常客等级|区域</span>
            <input id ="passengerTypeCode01" value="1" name="passengerTypeCodeArr"  v-model ="formData.passengerTypeCodeArr" 
                type="checkbox"><label for="serviceType01">白金卡</label>
            <input id ="passengerTypeCode02" value="2" name="passengerTypeCodeArr"  v-model ="formData.passengerTypeCodeArr" 
                type="checkbox"><label for="serviceType02">金卡</label>
            <input  id ="passengerTypeCode03" value="3" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox"><label for="serviceType03">银卡</label>
            <input  id ="passengerTypeCode04" value="4" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox"> <label for="serviceType04">普卡</label>
            <input  id ="passengerTypeCode05" value="5" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox"><label for="passengerTypeCode05">非会员</label>
            <input  id ="passengerTypeCode06" value="6" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox"> <label for="passengerTypeCode06">飞行卡</label>
            <label class="marginR5 title">区域</label>
            <input type="text" id="geoSpecLoc1" v-model ="formData.geoSpecLoc1" mode="upper" maxlength="3"  class="common_input" style="width: 100px">
            <span class="marginLR5"> <i class="glyphicon glyphicon-sort ts90 myhand text-success" title="切换区域" v-on:click="switchGeoLocValue"></i> </span>
            <input type="text" id="geoSpecLoc2" v-model ="formData.geoSpecLoc2" mode="upper" maxlength="3"  class="common_input" style="width: 100px">
        </div>

        <div class="query_row">
            <span class="query_title">更新人|更新日期</span>
            <label class="title">最后更新人</label>
            <input  type="text" v-model ="formData.updateUser" class="common_input" style="width:100px" />
            <label class="marginR5 title">最后时间</label>
            <input type="text" id="updateStartDate"  v-model ="formData.updateStartDate" class="common_input datepicker" style="width: 110px" />
            <label for="updateStartDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span style="margin-right:4px;">—</span>
            <input type="text" id="updateEndDate"  v-model ="formData.updateEndDate" class="common_input datepicker" style="width: 110px">
            <label for="updateEndDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
        </div>

    </div>
    </transition>
  </div>
</div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    export default {
        computed: mapGetters([
            'pageBar'
        ]),
        data:function(){
            return {
                showMoreQuerySectionFlag:false,
                formData:{
                    statusArr:[],/**发布状态 */
                    effStatusArr:[],/**生效状态 */
                    subcode:"",
                    startSequenceNumber:"", 
                    endSequenceNumber:"",
                    serviceTypeArr:[],/**服务等级(服务类型) */
                    effectMinDate:"",
                    effectMaxDate:"",
                    travelStartDate:"",
                    travelEndDate:"",
                    passengerTypeCodeArr:[],/**常旅客等级 */
                    geoSpecLoc1:"",
                    geoSpecLoc2:"",
                    updateUser:"",
                    updateStartDate:"",
                    updateEndDate:"" 
                }
            };
        },
        methods:{
            handleClickQuery(){
                //只要是点击查询都是查询第一页
                //console.info('你点击了查询按钮',JSON.stringify(this.formData)) ;
                //进行查询操作
                let toPageNum = 1 ;
                let pageSize = this.pageBar.pageSize ;
                let orderName = "lastUpdateDate" ;
                let isAsc = true ;
                let qureyParam = {toPageNum,pageSize,orderName,isAsc} ;

                this.queryList4Page({...qureyParam,...this.formData}) ;
            },
            switchGeoLocValue(){
                console.info('你点击了切换区域') ;
                // 触发组件 A 中的事件
                //bus.$emit('id-selected', 1)
            },
            ...mapActions([
                'queryList4Page'
            ])
        },
    }
</script>
<style>
    .fade-enter-active {
       transition: height .3s ease ;
       height: 90px;
    }

    .fade-leave-active {
        height: 0;
    }
    
</style>