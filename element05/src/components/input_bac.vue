<template>
   <span>
      <input
        v-if="type !== 'textarea'"
        class="form-control input-sm"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autoComplete"
        :autofocus="autofocus"
        :min="min"
        :max="max"
        :form="form"
        :value="value"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <textarea
        v-else
        class="form-control"
        v-model="currentValue"
        ref="textarea"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :style="textareaStyle"
        :readonly="readonly"
        :rows="rows"
        :form="form"
        :autofocus="autofocus"
        :maxlength="maxlength"
        :minlength="minlength"
        @focus="handleFocus"
        @blur="handleBlur">
      </textarea>
    </span>
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
      size: String,
      readonly: Boolean,
      autofocus: Boolean,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {}
    },

    methods: {
      handleBlur(event) {
        this.$emit('blur', event);
        this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
      },
      inputSelect() {
        this.$refs.input.select();
      },
      resizeTextarea() {
        var { autosize, type } = this;
        if (!autosize || type !== 'textarea') {
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;
        //this.textareaStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
        this.currentValue = event.target.value;
      },
      handleIconClick(event) {
        this.$emit('click', event);
      }
    },

    data() {
      return {
        currentValue: this.value,
        textareaStyle: {}
      };
    },

    created() {
      this.$on('inputSelect', this.inputSelect);
    },

    mounted() {
      this.resizeTextarea();
    },

    computed: {
      validating() {
        return this.$parent.validating;
      }
    },

    watch: {
      'value'(val, oldValue) {
        this.currentValue = val;
      },
      'currentValue'(val) {
        this.$nextTick(_ => {
          this.resizeTextarea();
        });
        this.$emit('input', val);
        this.$emit('change', val);
        this.dispatch('form-item', 'el.form.change', [val]);
      }
    }
  };
</script>
