<template>
  <div class ="query_section" >
    	<div class ="query_row">
	    	<span class="query_title">{{title}}</span>
	        <span>服务类型&nbsp;|</span>
	        <span>费用&nbsp;|</span>
	        <span>规则</span>
	        <span class="pull-right marginR15">
	        	<button type="button" id="back" @click ="backPage" class="btn btn-default btn-sm">返回</button>
	            <button type="button" id="s7_save" @click ="submitForm('save')" class="btn btn-default btn-sm">保存</button>
	            <button type="button" id="s7_saveAndPublish" @click="submitForm('saveAndPublish')"  class="btn btn-default btn-sm btn-success">保存并发布</button>
	        </span>
    	</div>
    </div>  
</template>
<script>
    export default {
        props:{
            title:{
                type:String,
                default:'新建服务费用'
            }
        },
        methods:{
            backPage(){
                console.info('back last page') ;
            },
            submitForm(type){
                console.info('type : ' + type) ;
            }
        }
    }
</script>