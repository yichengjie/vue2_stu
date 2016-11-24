<template>
      <input
        class="form-control input-sm"
        type="text"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :value="currentValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
</template>
<script>
  import emitter from './util/emitter';
  //import calcTextareaHeight from './calcTextareaHeight';
  export default {
    name: 'oc-input-number',
    mixins: [emitter],
    props: {
      value: [String, Number],
      placeholder: String,
      name: String,
      maxlength: Number,
      disabled:Boolean,
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: 0
      },
      value: {
        default: 0
      },
    },
    data(){
        // let value = this.value;
        // if (value < this.min) {
        //     this.$emit('input', this.min);
        //     value = this.min;
        // }
        // if (value > this.max) {
        //     this.$emit('input', this.max);
        //     value = this.max;
        // }
        return {
            currentValue:this.value
        };
    },
    methods: {
      handleBlur(event) {
         let value = Number(this.currentValue);
         if (isNaN(value) || value > this.max || value < this.min) {
            this.currentValue = this.value;
         } else {
           this.currentValue = value;
         }
         this.$emit('blur', this.currentValue);
         this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
         var val = event.target.value;
         this.currentValue = val ;
         let valNum = Number(val);
         if (valNum <= this.max && valNum >= this.min) {
           this.$emit('change', valNum);
           this.$emit('input', valNum);
           this.dispatch('form-item', 'el.form.blur', [valNum]);
         }
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      }
    },
  };
</script>
