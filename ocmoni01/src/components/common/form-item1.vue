<template>
  <div class="form-group" :class ="{'has-error':error !== ''}">
    <label class="control-label" v-bind:style="labelStyle" v-if ="label"> 
      <span>{{label}}</span>
    </label>
    <div :class="contentClass">
      <slot></slot>
    </div>
    <div class="error-tip" v-show="error !== ''">
       {{error}}
    </div>
  </div>
</template>

<script>
  import AsyncValidator from 'async-validator';
  import emitter from './util/emitter';

  export default {
    name: 'oc-form-item1',
    componentName: 'form-item',
    mixins: [emitter],
    props: {
      label: String,
      labelWidth: String,
      prop: String,
      required: Boolean,
      rules: [Object, Array],
      span:{
        type:Number,
        default:6
      }
    },
    computed: {
      labelStyle() {
        var ret = {};
        var labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.width = labelWidth;
        }
        return ret;
      },
      contentStyle() {
        var ret = {};
        var labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.marginLeft = labelWidth;
        }
        return ret;
      },
      contentClass() {
        return 'col-sm-' + this.span ;
      },
      form() {
        var parent = this.$parent;
        while (parent.$options.componentName !== 'form') {
          parent = parent.$parent;
        }
        return parent;
      },
      fieldValue: {
        cache: false,
        get() {
          var model = this.form.model;
          if (!model || !this.prop) { return; }
          var temp = this.prop.split(':');
          return temp.length > 1
            ? model[temp[0]][temp[1]]
            : model[this.prop];
        }
      }
    },
    data() {
      return {
        valid: true,
        error: '',
        validateDisabled: false,
        validating: false,
        validator: {},
        isRequired: false,
        initialValue: null
      };
    },
    methods: {
      validate(trigger, cb) {
        var rules = this.getFilteredRule(trigger);
        if (!rules || rules.length === 0) {
          cb && cb();
          return true;
        }
        this.validating = true;
        var descriptor = {};
        descriptor[this.prop] = rules;
        var validator = new AsyncValidator(descriptor);
        var model = {};
        model[this.prop] = this.fieldValue;
        //console.info('model : ' ,model) ;
        validator.validate(model, { firstFields: true }, (errors, fields) => {
          this.valid = !errors;
          this.error = errors ? errors[0].message : '';
          cb && cb(errors);
          this.validating = false;
        });
      },
      resetField() {
        this.valid = true;
        this.error = '';

        let model = this.form.model;
        let value = this.fieldValue;

        if (Array.isArray(value) && value.length > 0) {
          this.validateDisabled = true;
          model[this.prop] = [];
        } else if (value) {
          this.validateDisabled = true;
          model[this.prop] = this.initialValue;
        }
      },
      getRules() {
        var formRules = this.form.rules;
        var selfRuels = this.rules;
        formRules = formRules ? formRules[this.prop] : [];
        return [].concat(selfRuels || formRules || []);
      },
      getFilteredRule(trigger) {
        var rules = this.getRules();
        return rules.filter(rule => {
          return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
        });
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {//当字段变化的时候，如果需要校验，则进行校验，否则不校验
        //主要原因在于，点击‘重置按钮’的时，表单数据的change事件不能进行校验，否则又将显示出校验错误信息
        if (this.validateDisabled) {//如果之前不能校验，则直接返回，并将状态改为能校验
          this.validateDisabled = false;
          return;
        }
        this.validate('change');
      },
      getInitialValue() {
        var value = this.form.model[this.prop];
        if (value === undefined) {
          return value;
        } else {
          return JSON.parse(JSON.stringify(value));
        }
      }
    },
    mounted() {
      if (this.prop) {
        this.dispatch('form', 'el.form.addField', [this]);
        this.initialValue = this.getInitialValue();
        let rules = this.getRules();
        if (rules.length) {
          rules.every(rule => {
            if (rule.required) {
              this.isRequired = true;
              return false;
            }
          });
          this.$on('el.form.blur', this.onFieldBlur);
          this.$on('el.form.change', this.onFieldChange);
        }
      }
    },
    beforeDestroy() {
      this.dispatch('form', 'el.form.removeField', [this]);
    }
  };
</script>
