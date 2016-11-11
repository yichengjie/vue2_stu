<template>
  <el-select v-model="value3" disabled>
    <el-option
      v-for="item in options"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
  
<script>
  //禁用状态
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value3: ''
      }
    }
  }
</script>