import Vue from 'vue' ;
//import ElementUI from 'element-ui';
//import ElForm from './components/form.vue' ;
//import ElFormItem from './components/form-item.vue' ;
//Vue.component('el-form', ElForm) ;
//Vue.component('form-item',ElFormItem) ;
require('tui_core_lib') ;
require('tui_dialog_lib') ;
require('tui_drag_lib') ;
require('jq_datepicker_lib') ;
require('assetsPath/css/jquery_ui.datepicker-modify.css') ;

import App from './App.vue' ;
new Vue({
  el: '#app',
  render: h => h(App)
})