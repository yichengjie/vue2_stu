<template>
    <div class="table-responsive" >
        <table class="table table-bordered table_records7">
            <thead>
                <tr>
                    <th width="4%">
                        <input type="checkbox" id ="checkAllRecords7" v-on:click="checkAllRecords7($event)">
                        <label class="tbtitle" for="checkAllRecords7">全选 </label>
                    </th>
                    <th width="5%" class="relative" 
                        v-on:click="clickTableTitle('subcode')">
                        sub<br/>code
                           <i v-bind:class="{ 
                                'iconfont tb_order': true, 
                                'icon-paixu1': !tableTitleOrder.subcode,
                                'icon-paixu2': tableTitleOrder.subcode,
                                'active':orderTitleName=='subcode'
                             }" 
                            ></i>
                    </th>
                    <th width="4%" class="relative" v-on:click="clickTableTitle('serviceType')">
                        	服务<br/>类型 
                            <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.serviceType,
                            'icon-paixu2': tableTitleOrder.serviceType ,
                            'active':orderTitleName=='serviceType'}" 
                        ></i>
                    </th>
                    <th width="5%" class="relative" v-on:click="clickTableTitle('sequenceNumber')">
                        优先级<br/>序号
                        <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.sequenceNumber,
                            'icon-paixu2': tableTitleOrder.sequenceNumber ,
                            'active':orderTitleName=='sequenceNumber'}" >
                        </i>
                    </th>
                    <th width="4%" class="relative" v-on:click="clickTableTitle('statusDes')">
                        	状态  
                        	<i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.statusDes,
                            'icon-paixu2': tableTitleOrder.statusDes ,
                            'active':orderTitleName=='statusDes'
                            }" 
                            ></i>
                    </th>
                    <th width="9%" class="relative" v-on:click="clickTableTitle('saleStartDate')">
                      	 销售起始日期
                       <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.saleStartDate,
                            'icon-paixu2': tableTitleOrder.saleStartDate ,
                            'active':orderTitleName=='saleStartDate'
                            }" 
                            ></i>
                    </th>
                    <th width="9%" class="relative" v-on:click="clickTableTitle('saleEndDate')">
                        销售截止日期
                         <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.saleEndDate,
                            'icon-paixu2': tableTitleOrder.saleEndDate ,
                            'active':orderTitleName=='saleEndDate'
                            }" 
                            ></i>
                    </th>
                    <th width="7%" class="relative" v-on:click="clickTableTitle('travelStartDate')">
                        旅行开始日期
                         <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.travelStartDate,
                            'icon-paixu2': tableTitleOrder.travelStartDate,
                            'active':orderTitleName=='travelStartDate'
                             }" 
                            ></i>
                    </th>
                    <th width="7%" class="relative" v-on:click="clickTableTitle('travelEndDate')">
                        旅行结束日期
                         <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.travelEndDate,
                            'icon-paixu2': tableTitleOrder.travelEndDate ,
                            'active':orderTitleName=='travelEndDate'
                            }" 
                            ></i>
                    </th>
                    <th width="5%">区域1 </th>
                    <th width="5%"> 区域2 </th>
                    <th width="4%" class="relative" v-on:click="clickTableTitle('flyerStatus')">
                        	常客<br>等级 
                        <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.flyerStatus,
                            'icon-paixu2': tableTitleOrder.flyerStatus ,
                            'active':orderTitleName=='flyerStatus'}" 
                            ></i>
                    </th>
                    <th width="6%" >金额</th>  
                    <th width="8%">描述  </th>
                    <th width="6%" class="relative" v-on:click="clickTableTitle('lastUpdateUser')">
                        最后<br/>更新人 
                        <i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.lastUpdateUser,
                            'icon-paixu2': tableTitleOrder.lastUpdateUser ,
                            'active':orderTitleName=='lastUpdateUser'}" 
                            ></i>
                    </th>
                    <th width="9%" class="relative" v-on:click="clickTableTitle('lastUpdateDate')">
                        	最后更新日期  
                        	<i v-bind:class="{ 
                            'iconfont tb_order': true, 
                            'icon-paixu1': !tableTitleOrder.lastUpdateDate,
                            'icon-paixu2': tableTitleOrder.lastUpdateDate,
                            'active':orderTitleName=='lastUpdateDate' }" 
                            ></i>
                    </th>
                    <th width="3%">操作</th>
                </tr>
            </thead>
            <tbody>
                 <tr v-for="item in records7List">
                    <td><input type="checkbox" name="records7_checkbox" v-on:click="checkRecords7Item" v-bind:value="item.id" /></td>
                    <td>
                   	  <span class="myhand" data-toggle="tooltip" data-placement="top" v-bind:title="item.s5DescrbeInfo">
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
                    	<span class ="ttt" style ="width:70px;" v-bind:title ="item.money+ item.moneyUnit" >
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
    const defaultOrderFlag = true ;
    const topHight = 140 ;
    import { mapGetters, mapActions } from 'vuex' ;
    export default {
        data(){
            return {
                tableTitleOrder:{"subcode":defaultOrderFlag,"serviceType":defaultOrderFlag,"sequenceNumber":defaultOrderFlag,"statusDes":defaultOrderFlag,"saleStartDate":defaultOrderFlag,
                    "saleEndDate":defaultOrderFlag,"travelStartDate":defaultOrderFlag,"travelEndDate":defaultOrderFlag,"loc1":defaultOrderFlag,
                    "loc2":defaultOrderFlag,"flyerStatus":defaultOrderFlag,"money":defaultOrderFlag,"descr":defaultOrderFlag,"lastUpdateUser":defaultOrderFlag,
                    "lastUpdateDate":defaultOrderFlag
                },/**所有列的排序状态 */
                orderTitleName:"",/**当前排序的列名称 */
            } ;
        },
        methods:{
            checkAllRecords7(){

            },
            clickTableTitle(titleName){
                //判断是不是再同一个标题上点击
                let oldFlag = !defaultOrderFlag ;
                if(this.orderTitleName!=null&&this.orderTitleName===titleName){
                    oldFlag = this.tableTitleOrder[titleName] ;
                }	
                //1.更新当前排序呢的列名称
                this.orderTitleName = titleName ;
                //2.更新当前排序的状态(升序/倒序)
                //console.info('oldFlag : ' + oldFlag) ;
                let keys = Object.keys(this.tableTitleOrder) ;
                for(let key of keys){
                    this.tableTitleOrder[key] = defaultOrderFlag ;
                }
                this.tableTitleOrder[titleName] = !oldFlag ;



                //console.info('records7List : ' ,this.records7List ) ;
            },
            checkRecords7Item(){

            }
        },
        computed: mapGetters([
            'records7List'
        ])
    }
</script>
<style>

</style>