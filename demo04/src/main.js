import Vue from 'vue' ;
import Vuex from 'vuex' ;
import App from './App.vue' ;
require('assets/css/common.css') ;
require('assets/css/jquery_ui.datepicker-modify.css') ;
require('assets/css/jquery-ui-timepicker-addon.css') ;
require('assets/css/oc_query.css') ;
require('assets/iconfont/iconfont.css') ;

Vue.use(Vuex) ;
new Vue({
    el:'#app',
    template:'<App/>',
    components: { App }
}) ;