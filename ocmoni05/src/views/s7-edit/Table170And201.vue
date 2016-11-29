<template>
    <div class="col-sm-6" >
        <div class="table_control">
            <span @click.stop="clickDiscount('1')"  class ="discountBtn"
                :class ="{'discountCheck':discountOrNot === '1'}" >全额
            </span>
            <span @click.stop="clickDiscount('0')" class ="discountBtn marginR15" 
               :class ="{'discountCheck':discountOrNot === '0'}" v-show="isCommonServiceType"
               >折扣 
            </span>
            <span class ="marginR10">&nbsp;</span>
        </div>
        <!--170-->
        <div class = "table_layout" style ="width:440px" v-show="currentVisiable && discountOrNot=='1'">
            <table>
                <thead>
                    <tr>
                        <th width ="110">销售地类型</th>
                        <th width ="110">销售地代码</th>
                        <th width ="110">金额</th>
                        <th width ="110">货币类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list170VO">
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </div>
         <!--201-->
         <div class = "table_layout" style="width: 440px;"  v-show="currentVisiable && discountOrNot=='0' ">
             <table>
				<tbody>
                    <tr v-for="(item,index) in list201VO">
                        <td width ="300">1</td>
                        <td width ="180">2</td>
                        <td width ="180">3</td>
                    </tr>
				</tbody>
             </table>
         </div>
    </div>
</template>
<script>
    import ShowHideTable from './ShowHideTable.vue' ;
    import TableNoReuse from './TableNoReuse.vue' ;
    export default {
        props:{
           serviceType:String,
           list201VO:Array,
           list170VO:Array
        },
        data(){
            return {
                discountOrNot:'1'
            } ;
        },
        computed:{
            isCommonServiceType(){
                return checkIsCommonServiceType(this.serviceType) ;
            }
        },
        methods:{
            clickDiscount(type){
                this.discountOrNot = type ;
            },
        }
    }

    function checkIsCommonServiceType(serviceType){
        //data.serviceType=='M'||data.serviceType=='F'||data.serviceType=='R'||data.serviceType=='T'
        var arr = ['M','F','R','T'] ;
        return (arr.indexOf(serviceType) != -1) ;
    }
</script>