<template>
    <div class="form-group">
        <label class="control-label" :style="labelStyle" v-if ="label"> 
            <span>{{label}}</span>
        </label>
        <div :class="contentClass">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'oc-form-item0',
        componentName: 'form-item',
        props: {
            label: String,
            labelWidth: String,
            required: Boolean,
            span:{
                type:Number,
                default:6
            }
        },//computed:
        computed: {
            labelStyle() {
                var ret = {};
                var labelWidth = this.labelWidth || this.form.labelWidth;
                if (labelWidth) {
                ret.width = labelWidth;
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
            contentClass() {
                return 'col-sm-' + this.span ;
            },
        },
    }
</script>
<style>

</style>