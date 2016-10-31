Vue.component('my-input',{
    template:`
        <div class ="form-group">
            <label v-bind:for="randomId" class ="control-label">{{label}}</label>
            <input v-bind:id ="randomId" v-bind:value="value" v-on:input ="onInput"  type ="text" class ="form-control"/>
        </div>`,
    props:['value','label'],
    data:function(){
        return {
            randomId:'input-' + Math.random() 
        } ;
    },
    methods:{
        onInput:function(event){
            this.$emit('input',event.target.value) ;
        }
    }
}) ;


Vue.component('my-upper',{
    template:`
        <div class ="form-group">
            <label v-bind:for="randomId" class ="control-label">{{label}}</label>
            <input type="text" v-bind:id="randomId" v-bind:value="value" v-on:input="onInput" class ="form-control"/>
        </div>`,
    props:['value','label'],
    data:function(){
        return {
            randomId:'input-'+Math.random() 
        };
    },
    methods:{
        onInput:function(event){
            var str = event.target.value.toUpperCase() ;
            this.$emit('input',str) ;
        }
    }
}) ;

new Vue({
    el:'#app',
    data:{
        message:'hello',
        message2:'hello2',
        subcode:''
    }
}) ;