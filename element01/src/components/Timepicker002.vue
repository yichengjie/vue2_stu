<template>
  <el-time-picker
    v-model="value2"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    placeholder="任意时间点">
  </el-time-picker>
</template>

<script>
  //任意时间点
  export default {
    data() {
      return {
        value2: new Date(2016, 9, 10, 18, 40)
      };
    }
  }
</script>