<template>
 <form :id ="id" class="form-horizontal" role="form">
    <slot></slot>
  </form>
</template>
<script>
  export default {
    name: 'oc-form',
    componentName: 'form',
    props: {
      id:String,
      model: Object,
      rules: Object,
      labelPosition: String,
      labelWidth: {
        type:String,
        default:'100px'
      },
      labelSuffix: {
        type: String,
        default: ''
      },
      inline: Boolean
    },
    data() {
      return {
        fields: {},
        fieldLength: 0
      };
    },
    created() {
      this.$on('el.form.addField', (field) => {
        //fields['age'] = field ;
        this.fields[field.prop] = field;
        this.fieldLength++;
      });
      /* istanbul ignore next */
      this.$on('el.form.removeField', (field) => {
        delete this.fields[field.prop];
        // delete this.fileds['age'] ;
        this.fieldLength--;
      });
    },
    methods: {
      resetFields() {
        for (let prop in this.fields) {
          let field = this.fields[prop];
          field.resetField();
        }
      },
      validate(callback) {
        var count = 0;
        var valid = true;
        for (let prop in this.fields) {
          //遍历出所有需要校验的规则eg: [age ,name ,addr]
          let field = this.fields[prop];
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            //等所有formItem的validate都执行完成以后返回一个是否全部验证通过的flag
            if (++count === this.fieldLength) {
              callback(valid);
            }
          });
        }
      },
      validateField(prop, cb) {
        var field = this.fields[prop];
        if (!field) { throw new Error('must call validateField with valid prop string!'); }
        field.validate('', cb);
      }
    }
  };
</script>
<style>
  
</style>
