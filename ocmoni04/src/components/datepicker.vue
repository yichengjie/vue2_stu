<template>
    <span class="oc-datepicker-container">
        <input type ="text"   
            class ="form-control input-sm"
            :id ="randomId"
            :value="currentValue" 
            @input ="onInput" 
            @blur ="onBlur" 
            :disabled="disabled"
        />
        <!--oc-datepicker-icon-->
        <label  class="el-icon-date  oc-input__icon"></label>
    </span>
</template>
<script>
    import emitter from './mixin/emitter';
    import util from 'util' ;

    export default {
         name:'oc-datepicker',
         //props:['value'],
         mixins: [emitter],
         props:{
             value:{
                 type:String,
                 default:''
             },
             disabled:Boolean,
             time:{
                 type:Boolean,
                 default:false
             },
             splitChar:{
                 type:String,
                 default:'-'
             }
         },
         data:function(){
            return {
                randomId:('input-' + Math.random()).replace('\.','-') ,
                currentValue:this.value
            } ;
         },
         methods:{
            onInput(event){
                var val = event.target.value ;
                this.currentValue = val ;
                //this.$emit('input',val) ;
                //this.$emit('change', val);
                //this.dispatch('form-item', 'el.form.change', val);
            },
            onBlur(event){
                let val = event.target.value ;
                let flag = checkInputValid(val,this.time,this.splitChar) ;//inputStr,withTimeFlag,splitChar
                if(flag){
                    this.$emit('input',val) ;
                    this.dispatch('form-item', 'el.form.blur', val);
                }else{
                    this.currentValue = this.value ;
                    this.dispatch('form-item', 'el.form.blur', this.value);
                }
                //console.info('---------------> ' + this.currentValue) ;
            }
         },
         mounted:function(el){
            var _self = this ;
            var minDate = new Date() ;
            var dataFormat = "yy"+this.splitChar+"mm"+this.splitChar+"dd" ;
            var timeFormat = "HH:mm" ;
            var optionObj = {"showButtonPanel":true,"dateFormat":this.dataFormat} ;
            optionObj.onSelect = function(dateText,picker){
                _self.$emit('input',dateText) ;
                _self.$emit('change', dateText);
                _self.dispatch('form-item', 'el.form.change', dateText);
            }
            //optionObj.minDate = minDate ;
            if(this.time){
                optionObj.timeFormat = this.timeFormat ;
                optionObj.timeText="&nbsp;&nbsp;时间" ; 
                optionObj.hourText ="&nbsp;&nbsp;时" ;
                optionObj.minuteText ="&nbsp;&nbsp;分" ;  
                //optionObj.secondText = "&nbsp;&nbsp;秒" ;
                optionObj.currentText = "当前" ;
                optionObj.closeText = "关闭" ;
                $('#'+this.randomId).datetimepicker(optionObj) ;
            }else{
                $('#'+this.randomId).datepicker(optionObj) ;
            }
         },
         watch:{
             value(newVal,oldVal){
                 this.currentValue = newVal ;
             }
         }
    }

    /**
     *检查输入字符串是否合法
     *  */
    function checkInputValid(inputStr,withTimeFlag,splitChar){
        if(withTimeFlag){//如果是日期+时间
            let datetimeStr = inputStr || '' ;
            let infos = datetimeStr.split(' ') ;//日期与时间之前以空格分隔
            if(infos.length!==2) return false;
            if(checkDate(infos[0],splitChar)&&checkTime(infos[1])){
                return true ;
   			}
            return false;
        }else{//仅仅是日期
            return checkDate(inputStr,splitChar);
        }
    }

    function checkDate(dataStr,splitChar){
        let noTimeLimit = true ;
        let flag =  util.checkDataValid(dataStr,splitChar,noTimeLimit) ;
        return flag ;
    }
    function checkTime(timeStr){
       let flag = util.isTimeOC(timeStr) ;
       return flag ;
    }

</script>
<style>
    .oc-datepicker-container{
        display: block;
        position: relative ;
    }
    .oc-datepicker-icon{
        display: inline-block;
        position: absolute ;
        right: 10px;
        top: 9px;
    }
</style>