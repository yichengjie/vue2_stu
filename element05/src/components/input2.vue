<template>
    <div :class="[
        'el-input',
        size ? 'el-input--'+size :'' ,
        {
            'is-disabled':disabled
        }
        ]">
        <!--input 图标-->
        <i class="el-input__icon" 
           :class ="[icon ? 'el-icon--'+icon:'']"
           v-if="icon" @click="handleIconClick" >
        </i> 
        <input type="text" 
            class="el-input__inner"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :value="value"
            ref="input"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            />
    </div>
</template>
<script>
    export default{
        
    }
</script>
<style>

</style>