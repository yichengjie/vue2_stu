
var dateFormatStr = "YYYY-MM-DD hh:mm" ;

Vue.component('datetimepicker',{
    template:`
        <div class ="form-group">
            <label v-bind:for="randomId" class ="control-label">{{label}}</label>
            <input v-bind:id ="randomId" v-bind:value="value" v-on:input ="onInput"  
                type ="text" class ="form-control"/>
        </div>`,
    props:['value','label'],
    data:function(){
        return {
            randomId:('input-' + Math.random()).replace('\.','-') 
        } ;
    },
    methods:{
        onInput:function(event){
            console.info('value is change ...') ;
            this.$emit('input',event.target.value) ;
        }
    },
    mounted:function(el){
       var _self = this ;
       $('#'+this.randomId).datetimepicker({
            format: "yyyy-mm-dd hh:ii"
        }).on('changeDate', function(ev){
            var v = moment(ev.date).format(dateFormatStr) ;
            _self.$emit('input',v) ;
        });
    }
}) ;

new Vue({
    el:'#app',
    data:{
        message:'hello',
        startDate:''
    }
}) ;