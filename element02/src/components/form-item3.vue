<template>
  <div class="form-group" :class ="{'has-error':error !== '',
      'is-validating': validating,
      'is-required': isRequired || required
    }">
    <label class="col-sm-2 control-label"> <span v-if ="label">{{label + form.labelSuffix}}</span></label>
    <div class="col-sm-3">
      <slot name="range1"></slot>
    </div>
    <div class="col-sm-3">
      <slot name="range2"></slot>
    </div>
    <div class="col-sm-3">
       <transition name="md-fade-bottom">
        <div class="error-tip" v-if="error !== ''">{{error}}</div>
       </transition>
    </div>
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
          var temp = this.prop.split('_');
          
          if(temp.length > 1){
            var name1 = temp[0] ;
            var name2 = temp[1] ;
            return {[name1]:model[temp[0]],[name2]:model[temp[1]]} ;
          }else{
            return {[temp[0]]:model[temp[0]]} ;
          }
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
        var descriptor = {[this.prop]:rules};
        //descriptor[this.prop] = rules;
        //console.info('rules -----------> : ' ,rules) ;
        var validator = new AsyncValidator(descriptor);
        var model = {[this.prop]:this.fieldValue};
        //model[this.prop] = this.fieldValue;
        //console.info('fieldValue :' +this.fieldValue) ;
        validator.validate(model, { firstFields: true }, (errors, fields) => {
          //console.info('errors : ' ,errors) ;
          this.valid = !errors;
          this.error = errors ? errors[0].message : '';

          cb && cb(errors);
          this.validating = false;
        });
      },
      resetField() {
        this.valid = true;
        this.error = '';
        var temp = this.prop.split('_');

        let model = this.form.model;

        let name1 = temp[0] ;
        let name2 = temp[1] ;
        let value1 = this.initialValue[name1];
        let value2 = this.initialValue[name2];
        
        this.validateDisabled = true;
        model[name1] = value1 ;
        model[name2] = value2 ;
       // model
        // if (Array.isArray(value) && value.length > 0) {
        //   this.validateDisabled = true;
        //   model[this.prop] = [];
        // } else if (value) {
        //   this.validateDisabled = true;
        //   model[this.prop] = this.initialValue;
        // }
      },
      getRules() {
        var formRules = this.form.rules;
        var selfRuels = this.rules;
        formRules = formRules ? formRules[this.prop] : [];
        //console.info('formRules ---- : ' ,formRules) ;
        //console.info('selfRuels ---- : ' ,selfRuels) ;
        return [].concat(selfRuels || formRules || []);
      },
      getFilteredRule(trigger) {
        var rules = this.getRules();
        var tmp = rules.filter(rule => {
          return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
        });
        return tmp ;
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

        var temp = this.prop.split('_');
        var value1 = this.form.model[temp[0]] ;
        var value2 = this.form.model[temp[1]] ;
        

        //var name1 = temp[0] ;
        //var name2 = 

        return {[temp[0]]:value1,[temp[1]]:value2} ;
       // var value = this.form.model[this.prop];
        // if (value === undefined) {
        //   return value;
        // } else {
        //   return JSON.parse(JSON.stringify(value));
        // }
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
  .error-tip{
    color: red ;
    font-size: 12px;
    margin-top: 7px;
  }
</style>
