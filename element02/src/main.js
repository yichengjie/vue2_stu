import Vue from 'vue' ;
//import ElementUI from 'element-ui';
import App from './App.vue' ;
import MyForm from 'lib/form/index.js' ;
MyForm(Vue) ;

new Vue({
  el: '#app',
  render: h => h(App)
})