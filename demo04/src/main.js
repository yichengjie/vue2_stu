import Vue from 'vue' ;
import App from './App.vue' ;
require('assets/css/common.css') ;
require('assets/css/jquery_ui.datepicker-modify.css') ;
require('assets/css/jquery-ui-timepicker-addon.css') ;
require('assets/css/oc_query.css') ;
require('assets/iconfont/iconfont.css') ;
require('tui_core_lib');
require('tui_drag_lib') ;
require('jq_datepicker_lib');
require("jq_timepicker_lib") ;
import store from './store/index.js'; // import 我们刚刚创建的 store
//var bus = new Vue() ;
//window.bus = bus ;


new Vue({
    el:'#app',
    render: h => h(App),
    store: store // 在根组件加入 store，让它的子组件和 store 连接
}) ;