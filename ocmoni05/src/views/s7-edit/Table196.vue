<template>
     <div class="col-sm-6">
        <div class = "table_layout" style ="width:275px" v-show ="currentVisiable" >
            <table>
                <thead>
                    <tr>
                        <th>行李件数</th>
                        <th>行李子代码</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" @click ="clickTableTr(item)">
                       <td>1</td>
                       <td>2</td>  
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            list:Array,
        },
    } ;
</script>