<template>
     <div class="col-sm-6">
        <div class="table_control">
            <ShowHideTable v-model ="visiable"/>
            <TableNoReuse />
        </div>
        <div class = "table_layout" style ="width:275px" v-show ="visiable" >
            <table>
                <thead>
                    <tr>
                        <th>行李件数</th>
                        <th>行李子代码</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" @click ="clickTableTr(item)" :class ="{'selected_td':item.checked}">
                     <td>
                        <input  :name="'t1961'+index" v-model = "item.count" style="width:97%;"
                            maxlength = "2"  type="text" class="positiveInteger common_input"/>
                    </td>
                    <td>
                        <input :name="'t1962'+index" v-model = "item.code"   maxlength = "3"  type="text"
                             class="lettersOrNumber common_input" style="width:97%;" />
                    </td>   
                    </tr>
                </tbody>
            </table>
            <div class="table_footer">
                <button type ="button" class="btn btn-success btn-sm" @click ="addLine">增加一行</button>
                <button type ="button" class="btn btn-default btn-sm" @click ="deleteLine">删除一行</button>
            </div>
        </div>
    </div>
</template>
<script>
    import ShowHideTable from './ShowHideTable.vue' ;
    import TableNoReuse from './TableNoReuse.vue' ;

    export default {
        props:{
            list:Array
        },
        components:{
            ShowHideTable,
            TableNoReuse
        },
        data(){
            return {
                visiable:false
            } ;
        },
        methods:{
            clickTableTr(obj){
                this.list.map(item=>{
                    item.checked = false;
                });
                obj.checked = true ;
            },
            addLine(){
               this.list.map(item=>{
                   item.checked = false;
               }) ;
               this.list.push({count:'',code:'',checked:true}) ;
            },
            deleteLine(){
               if(this.list&&this.list.length>0){
                   var index = this.list.findIndex(item=>{
                        return item.checked = true ;
                   }) ;
                   this.list.splice(index,1) ;
               }
            }
        },
        mounted(){
        }
    } ;
</script>