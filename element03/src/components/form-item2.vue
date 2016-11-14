<template>
  <div class="el-form-item" :class="{
      'is-error': error !== '',
      'is-validating': validating,
      'is-required': isRequired || required
    }">
    <label class="el-form-item__label" v-bind:style="labelStyle" v-if="label">
      {{label + form.labelSuffix}}
    </label>
    <div class="el-form-item__content2" v-bind:style="contentStyle">
      <slot name="range1"></slot>
    </div>
    <div class="el-form-item__content2" v-bind:style="contentStyle">
      <slot name="range2"></slot>
    </div>
    <transition name="md-fade-bottom">
        <div class="el-form-item__error2" v-if="error !== ''">{{error}}</div>
    </transition>
  </div>
</template>

<script>
  import AsyncValidator from 'async-validator';
  import emitter from './emitter.js';

  export default {
    name: 'ElFormItem',
    componentName: 'form-item',
    mixins: [emitter],

    props: {
      label: String,
      labelWidth: String,
      prop: String,
      required: Boolean,
      rules: [Object, Array]
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
      onFieldChange() {
        if (this.validateDisabled) {
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
<style scoped>
   .el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-textarea__inner{
    border-color:#ff4949
}
.el-form-item.is-required .el-form-item__label:before{
    content:'*';
    color:#ff4949;
    margin-right:4px
}
.el-form-item{
  margin-bottom: 10px;
}
.el-form-item__label{
    text-align:right;
    vertical-align:middle;
    float:left;
    font-size:14px;
    color:#5e6d82;
    line-height:1;
    padding:11px 12px 11px 0;
    box-sizing:border-box
}
.el-form-item .el-form-item__content2{
    display: inline-block ;
    line-height:36px;
    font-size:14px;
    /*width:30%;*/
    margin-left: 10px !important;
}

.el-form-item .el-form-item__error2{
    display: inline-block ;
    color:#ff4949;
    font-size:12px;
    line-height:1;
    padding-top:4px;
    /*width:30%;*/
}
</style>
