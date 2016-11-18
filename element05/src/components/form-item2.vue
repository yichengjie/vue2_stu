<template>
  <div class="form-group" :class ="{'has-error':error !== ''}">
    <label class="control-label" v-bind:style="labelStyle" v-if ="label"> 
      <span>{{label}}</span>
    </label>
    <div class="col-sm-3">
      <slot name ="range1"></slot>
    </div>
    <div class="col-sm-3">
      <slot name ="range2"></slot>
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
      fieldNameArr(){//获取字段名称数组
          var formRules = this.form.rules;//[this.prop]
          var fieldRules = formRules ? formRules[this.prop] : undefined ;
          if(fieldRules && fieldRules['names']){
            return fieldRules['names'] ;
          }else{
            return [] ;
          }
      },
      fieldValueArr: {
        cache: false,
        get() {
          var model = this.form.model;
          if (!model || !this.prop) { return; }
          var names = this.fieldNameArr ;
          return [model[names[0]],model[names[1]]] 
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
        initialValueArr: null
      };
    },
    methods: {
      validate(trigger, cb) {
        //console.info('validate .......') ;
        var rules = this.getFilteredRule(trigger);
        if (!rules || rules.length === 0) {
          cb && cb();
          return true;
        }
        this.validating = true;
        var descriptor = {};
        descriptor[this.prop] = rules;
        //console.info('descriptor , ' , JSON.stringify(descriptor) ) ;
        var validator = new AsyncValidator(descriptor);
        var names = this.fieldNameArr ;
        var values = this.fieldValueArr ;
        var model = {};
        model[this.prop] = {[names[0]]:values[0],[names[1]]:values[1]};
        //console.info('model : ' ,JSON.stringify(model)) ;
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
        var names = this.fieldNameArr ;
        var initialValues = this.initialValueArr ;
        this.validateDisabled = true;
        for(let i = 0 ; i < names.length; i++){
           model[names[i]] = initialValues[i];
        }
      },
      getRuleObj() {
        var formRules = this.form.rules;
        var ruleObj = formRules ? formRules[this.prop] : undefined;
        return ruleObj;
      },
      getFilteredRule(trigger) {
        var ruleObj = this.getRuleObj();
        var names = this.fieldNameArr ;
        var retRules = [] ;
        if(ruleObj){
           let fields = ruleObj['fields'] ;
           if(fields&&fields.length>0){
              var emptyFlag = true ;
              var tmp = {type: 'object', fields: {}}  ;
              for(let i = 0 ; i < fields.length; i ++ ){
                 let field = fields[i] ;
                 let name = names[i] ;
                 var fieldTrigger = field['trigger'] || '' ;
                 //!rule.trigger || rule.trigger.indexOf(trigger) !== -1
                 console.info('fieldTrigger ['+fieldTrigger+']') ;
                 console.info('trigger ['+trigger+']') ;
                 if(!fieldTrigger|| fieldTrigger.indexOf(trigger)!==-1 ){
                    tmp['fields'][name] = field ;
                    emptyFlag = false ;
                 }
              }
              if(!emptyFlag){
                retRules.push(tmp) ;
              }
           }
           var validator = ruleObj['validator'] ;
           if(validator){
               var validatorTrigger = validator.trigger ;
               if(!validatorTrigger|| validatorTrigger.indexOf(trigger)!==-1 ){
                  retRules.push(ruleObj['validator']) ;
               }
           }
        }
        return retRules ;
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
      getInitialValueArr() {
        var names = this.fieldNameArr ;
         var values = [] ;
        for(let name of names){
           var value = this.form.model[name] || '';
           values.push(value) ;
        }
        return values ;
      }
    },
    mounted() {
      if (this.prop) {
        this.dispatch('form', 'el.form.addField', [this]);
        this.initialValueArr = this.getInitialValueArr();
        //console.info(' this.initialValueArr : ' ,this.initialValueArr) ;
        //----------------------------
        if(this.getRuleObj()){
            var validator = this.getRuleObj().validator;
            var names = this.fieldNameArr ;
            if (names.length>0 || validator) {
              this.$on('el.form.blur', this.onFieldBlur);
              this.$on('el.form.change', this.onFieldChange);
            }
        }
      }
    },
    beforeDestroy() {
      this.dispatch('form', 'el.form.removeField', [this]);
    }
  };
</script>
