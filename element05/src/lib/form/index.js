import ElFormItem from './src/form-item.vue';
import ElForm from './src/form.vue';

/* istanbul ignore next */
export default function(Vue) {
  Vue.component(ElForm.name, ElForm);
  Vue.component(ElFormItem.name, ElFormItem);
};

export { ElForm, ElFormItem };
