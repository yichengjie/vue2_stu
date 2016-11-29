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
            <ShowHideTable v-model ="currentVisiable" /> 
            <!--折扣的时候不支持表格复用-->
            <TableNoReuse v-show ="discountOrNot === '1' && isCommonServiceType " />
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
                    <tr v-for="(item,index) in list170VO" @click ="clickTableTr(item)">
                        <td>
                            1
                        </td>
                        <td>
                            2
                        </td>
                        <td >
                        3
                        </td>
                        <td>
                            4
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="table_footer">
                <button type ="button" class="btn btn-success btn-sm" @click ="addLine">增加一行</button>
                <button type ="button" class="btn btn-default btn-sm" @click ="deleteLine">删除一行</button>
            </div>
        </div>
         <!--201-->
         <div class = "table_layout" style="width: 440px;"  v-show="currentVisiable && discountOrNot=='0'">
             <table>
				<tbody>
                    <tr v-for="(item,index) in list201VO" @click ="clickTableTr(item)">
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
           visiable:{
               type:Boolean,
               default:true
           },
           serviceType:String,
           list201VO:Array,
           list170VO:Array
        },
        data(){
            return {
                discountOrNot:'1',
                currentVisiable:this.visiable
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
            clickTableTr(obj){
                this.list170VO.map(item=>{
                    item.checked = false;
                });
                obj.checked = true ;
            },
            addLine(){
               this.list170VO.map(item=>{
                   item.checked = false;
               }) ;
               this.list170VO.push({count:'',code:'',checked:true}) ;
            },
            deleteLine(){
               if(this.list170VO&&this.list170VO.length>0){
                   var index = this.list170VO.findIndex(item=>{
                        return item.checked = true ;
                   }) ;
                   this.list170VO.splice(index,1) ;
               }
            }
        },
        components:{
            ShowHideTable,
            TableNoReuse
        },
        watch:{
            visiable(newVal){
                this.currentVisiable = newVal ;
            }
        }
    }

    function checkIsCommonServiceType(serviceType){
        //data.serviceType=='M'||data.serviceType=='F'||data.serviceType=='R'||data.serviceType=='T'
        var arr = ['M','F','R','T'] ;
        return (arr.indexOf(serviceType) != -1) ;
    }
</script>