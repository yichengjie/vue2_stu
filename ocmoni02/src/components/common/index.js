import Form from "./form/index.js" ;
import FormItem from './form-item/index.js' ;
import Input from './input/index.js' ;
import Icon from './icon/index.js' ;
function install (Vue,options){
    console.info('inside installed MyPlugin  .........') ;
    if (install.installed) return;
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Input.name, Input);
    Vue.component(Icon.name, Icon);
    install.installed = true ;
}
if (typeof window !== 'undefined' && window.Vue) {
   console.info('global installed MyPlugin ...') ;
   install(window.Vue);
};


function MyPlugin(){

}

MyPlugin.install = function (Vue, options) {
    install(Vue, options) ;
}

export default MyPlugin ;
