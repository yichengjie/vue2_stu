<template>
   <span>
      <input
        v-if ="readonly"
        class="form-control input-sm"
        type="text"
        :name="name"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :value="value"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span class="readonly-input" v-else>{{value || '空'}}</span>
    </span>
</template>
<script>
  import emitter from './emitter';
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
      minlength: Number,
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
