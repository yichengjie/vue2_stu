import Vue from 'vue' ;
import Vuex from 'vuex' ;
import App from './App.vue' ;

Vue.use(Vuex) ;
new Vue({
    el:'#app',
    template:'<App/>',
    components: { App }
}) ;