import Vue from 'vue' ;
import ElementUI from 'element-ui';
Vue.use(ElementUI) ;
import App from './App.vue' ;
new Vue({
  el: '#app',
  render: h => h(App)
})