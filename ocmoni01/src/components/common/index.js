import YJForm from "./form.vue" ;
import YJFormItem from './form-item.vue' ;
import YJFormItem2 from './form-item2.vue' ;
import YJInput from './input.vue' ;
import YJSelect from './select.vue' ;
import YJCheckbox from './checkbox.vue' ;
import YJRadio from './radio.vue' ;
import YJDatepicker from './datepicker.vue' ;
function install (Vue,options){
    console.info('inside installed MyPlugin  .........') ;
    if (install.installed) return;
    Vue.component(YJForm.name, YJForm);
    Vue.component(YJFormItem.name, YJFormItem);
    Vue.component(YJFormItem2.name, YJFormItem2);
    Vue.component(YJInput.name, YJInput);
    Vue.component(YJSelect.name, YJSelect);
    Vue.component(YJCheckbox.name, YJCheckbox);
    Vue.component(YJRadio.name, YJRadio);
    Vue.component(YJDatepicker.name, YJDatepicker);
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

