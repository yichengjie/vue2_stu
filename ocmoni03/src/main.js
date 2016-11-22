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
require('assetsPath/css/common.css') ;
require('assetsPath/css/oc_edit.css') ;
require('assetsPath/css/tui_dialog.css') ;
require('assetsPath/css/jquery_ui.datepicker-modify.css') ;
require('assetsPath/css/jquery-ui-timepicker-addon.css') ;
//css_path/jquery.autocomplete.css
require('assetsPath/icon/icon.css') ;
import MyPlugin from './components/index.js' ;
//调用插件
Vue.use(MyPlugin) ;

import App from './views/s7-edit/App.vue' ;
new Vue({
  el: '#app',
  render: h => h(App)
})