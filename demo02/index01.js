Vue.component('button-counter',{
    template:'<button v-on:click="increment" type="button" class ="btn btn-default">{{counter}}</button>',
    data:function(){
        return {
            counter:0
        };
    },
    methods:{
        increment:function(){
            this.counter += 1 ;
            this.$emit('increment') ;
        }
    }
}) ;

new Vue({
    el:'#app',
    data:{
        total:0,
        hello:'yicj'
    },
    methods:{
        incrementTotal:function(){
            this.total += 1 ;
        }
    }
}) ;