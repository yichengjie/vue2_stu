<template>
      <input
        class="form-control input-sm"
        type="text"
        :name="name"
        :disabled="readonly"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="value"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
</template>
<script>
  import emitter from './util/emitter';
  //import calcTextareaHeight from './calcTextareaHeight';
  export default {
    name: 'ElInput',
    mixins: [emitter],
    props: {
      value: [String, Number],
      placeholder: String,
      autofocus: Boolean,
      name: String,
      maxlength: Number,
      readonly:Boolean
    },
    methods: {
      handleBlur(event) {
        this.$emit('blur', event);
        this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
        var val = event.target.value;
        this.$emit('input', val);
        this.$emit('change', val);
        this.dispatch('form-item', 'el.form.change', [val]);
      }
    }
  };
</script>
