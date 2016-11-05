<template>
    <div class="table-responsive" v-show ="pageBar.isQueryDB">
        <table class="table table-bordered table_records7">
            <thead>
                <tr>
                    <th width="4%">
                        <input type="checkbox" v-bind:checked ="checkAllRecords7Flag" v-on:click="clickRecords7CheckAll">
                        <label class="tbtitle" for="checkAllRecords7">全选 </label>
                    </th>
                    <th width="5%" class="relative" 
                        v-on:click="clickTableTitle('subcode')">
                        sub<br/>code
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'subcode'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'subcode' && tableTitleOrder.subcode"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'subcode'  && !tableTitleOrder.subcode"></use>
                        </svg>
                    </th>
                    <th width="4%" class="relative" v-on:click="clickTableTitle('serviceType')">
                        服务<br/>类型 
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'serviceType'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'serviceType' && tableTitleOrder.serviceType"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'serviceType'  && !tableTitleOrder.serviceType"></use>
                        </svg>
                    </th>
                    <th width="5%" class="relative" v-on:click="clickTableTitle('sequenceNumber')">
                        优先级<br/>序号
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'sequenceNumber'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'sequenceNumber' && tableTitleOrder.sequenceNumber"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'sequenceNumber'  && !tableTitleOrder.sequenceNumber"></use>
                        </svg>
                    </th>
                    <th width="4%" class="relative" v-on:click="clickTableTitle('statusDes')">
                        状态  
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'statusDes'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'statusDes' && tableTitleOrder.statusDes"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'statusDes'  && !tableTitleOrder.statusDes"></use>
                        </svg>
                    </th>
                    <th width="9%" class="relative" v-on:click="clickTableTitle('saleStartDate')">
                      	 销售起始日期
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'saleStartDate'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'saleStartDate' && tableTitleOrder.saleStartDate"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'saleStartDate'  && !tableTitleOrder.saleStartDate"></use>
                        </svg>
                    </th>
                    <th width="9%" class="relative" v-on:click="clickTableTitle('saleEndDate')">
                        销售截止日期
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'saleEndDate'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'saleEndDate' && tableTitleOrder.saleEndDate"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'saleEndDate'  && !tableTitleOrder.saleEndDate"></use>
                        </svg>
                    </th>
                    <th width="7%" class="relative" v-on:click="clickTableTitle('travelStartDate')">
                        旅行开始日期
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'travelStartDate'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'travelStartDate' && tableTitleOrder.travelStartDate"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'travelStartDate'  && !tableTitleOrder.travelStartDate"></use>
                        </svg>
                    </th>
                    <th width="7%" class="relative" v-on:click="clickTableTitle('travelEndDate')">
                        旅行结束日期
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'travelEndDate'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'travelEndDate' && tableTitleOrder.travelEndDate"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'travelEndDate'  && !tableTitleOrder.travelEndDate"></use>
                        </svg>
                    </th>
                    <th width="5%">区域1 </th>
                    <th width="5%"> 区域2 </th>
                    <th width="4%" class="relative" v-on:click="clickTableTitle('flyerStatus')">
                        常客<br>等级 
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'flyerStatus'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'flyerStatus' && tableTitleOrder.flyerStatus"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'flyerStatus'  && !tableTitleOrder.flyerStatus"></use>
                        </svg>
                    </th>
                    <th width="6%" >金额</th>  
                    <th width="8%">描述  </th>
                    <th width="6%" class="relative" v-on:click="clickTableTitle('lastUpdateUser')">
                        最后<br/>更新人
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'lastUpdateUser'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'lastUpdateUser' && tableTitleOrder.lastUpdateUser"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'lastUpdateUser'  && !tableTitleOrder.lastUpdateUser"></use>
                        </svg> 
                    </th>
                    <th width="9%" class="relative" v-on:click="clickTableTitle('lastUpdateDate')">
                        最后更新日期 
                        <svg class="icon tb_order" aria-hidden="true" >
                            <use xlink:href="#icon-sort-small" v-if ="orderTitleName != 'lastUpdateDate'"></use>
                            <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == 'lastUpdateDate' && tableTitleOrder.lastUpdateDate"></use>
                            <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == 'lastUpdateDate'  && !tableTitleOrder.lastUpdateDate"></use>
                        </svg>  
                    </th>
                    <th width="3%">操作</th>
                </tr>
            </thead>
            <tbody>
                 <tr v-for="item in records7List" v-bind:key="item.id">
                    <td>
                        <input type="checkbox" name="records7_checkbox" v-on:click="clickCheckRecords7Item" 
                            v-bind:value="item.id" />
                    </td>
                    <td>
                   	  <span class="myhand" data-toggle="tooltip" data-placement="top" 
                         v-bind:title="item.s5DescrbeInfo">
                   	 	{{item.subcode}}<i class =" glyphicon glyphicon-info-sign s5descr"></i> 
                   	  </span>
                    </td>
                    <td>{{item.serviceType}}</td>
                    <td>{{item.sequenceNumber}}</td>
                    <td>{{item.statusShow}}</td>
                    <td>{{item.saleStartDateShow}}</td>
                    <td>{{item.saleEndDateShow}}</td>
                    <td>{{item.travelStartDate}}</td>
                    <td>{{item.travelEndDate}}</td>
                    <td>{{item.loc1}}</td>
                    <td>{{item.loc2}}</td>
                    <td>{{item.flyerStatus}}</td>
                    <td>
                    	<span class ="ttt" style ="width:70px;"  v-bind:title ="item.money+ item.moneyUnit" >
                    		{{item.money + item.moneyUnit}}
                    	</span>
                    </td>
                    <td>
                    	<span class="descr" v-bind:title="item.descr">{{item.descr}}</span>
                    </td>
                    <td><span class ="updateUser" v-bind:title="item.lastUpdateUser">{{item.lastUpdateUser}}</span></td>
                    <td>{{item.lastUpdateDate}}</td>
                    <td class="oper_item">
                    	<a v-if="item.statusDes=='1'||item.statusDes=='2'||item.statusDes=='3'" title ="修改"  
                            v-bind:href ="'${pageContext.request.contextPath}/oc/toUpdateS7UI.action?s7Id='+item.id">
				        	<i class="glyphicon glyphicon-pencil"></i>
				        </a>
				        <i v-else title ="修改" class="glyphicon glyphicon-pencil gray"></i>
				        <a v-bind:href ="'${pageContext.request.contextPath}/oc/toCopyS7UI.action?s7Id='+item.id" title ="复制">
				        	<i class ="iconfont icon-copy" ></i>	
				        </a>
                    </td>
                 </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    //const defaultOrderFlag = true ;
    import {defaultOrderFlag} from '../store/mutation-types.js' ;
    const topHight = 140 ;
    import { mapGetters, mapActions } from 'vuex' ;
    export default {
        data(){
            return {
               
            } ;
        },
        methods:{
            clickRecords7CheckAll(e){
                //console.info('checkAllRecords7Flag : ' + this.checkAllRecords7Flag) ;
                let flag = e.target.checked ;
                this.updateSimpleState({"checkAllRecords7Flag":flag}) ;
                $(":checkbox[name='records7_checkbox']").prop('checked',flag) ;
            },
            clickCheckRecords7Item(event){
                let len1 = $(":checkbox[name='records7_checkbox']:checked").length ;
                let len2 =  $(":checkbox[name='records7_checkbox']").length ;
                if(len1<len2){
                    this.updateSimpleState({"checkAllRecords7Flag":false}) ;
                }else{
                    this.updateSimpleState({"checkAllRecords7Flag":true}) ;
                }
            },
            clickTableTitle(titleName){
                //判断是不是再同一个标题上点击
                let oldFlag = !defaultOrderFlag ;
                if(this.orderTitleName!=null&&this.orderTitleName===titleName){
                    oldFlag = this.tableTitleOrder[titleName] ;
                }	
                //1.更新当前排序呢的列名称
                this.updateSimpleState({"orderTitleName":titleName}) ;
                //2.更新当前排序的状态(升序/倒序)
                //console.info('oldFlag : ' + oldFlag) ;
                this.updateTableTitleOrder({[titleName]:!oldFlag }) ;
                //2.执行排序操作
                //let queryDBFlag = $("")
                if(this.queryDBFlag){//查询数据库
                    //let toPageNum = this.pageBar.curPage*1 ;
                    let toPageNum = 1 ;
                    this.queryDB(toPageNum) ;
                }else{
                    let list = this.records7List ;
                    let ascFlag = !oldFlag ;
                    this.updateSimpleState({"dealPageOrderFlag":true}) ;
                    let param = {titleName,ascFlag} ;
                    this.orderListData(param) ;
                }
                //console.info('records7List : ' ,this.records7List ) ;
                //_clearOrderStatusOnPage
            },
            queryDB:function(toPageNum){
                this.dealPageOrderFlag = false;
                let pageSize = this.pageBar.pageSize ;
                let orderName =  this.orderTitleName ;
                let isAsc = this.tableTitleOrder[this.orderTitleName] ;
                let queryParam = {toPageNum,pageSize,orderName,isAsc } ;
                //查询数据库
                this.queryList4Page(queryParam) ;
            },
            ...mapActions([
                'queryList4Page',
                'updateSimpleState',
                'orderListData',
                'updateTableTitleOrder',
                'clearTableTitleOrderInfo'
            ])
        },
        computed: mapGetters([
            'records7List',
            'queryDBFlag',
            'dealPageOrderFlag',
            'pageBar',
            'orderTitleName',
            'checkAllRecords7Flag',
            'tableTitleOrder'
        ])
    }
</script>
<style scoped>
.icon {
    width: 2.5em; height: 2.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>