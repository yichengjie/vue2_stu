<template>
    <div>
        <button @click="onClick">Open Dialog</button>
        <alert :visible="alertVisible"></alert>
    </div>
</template>
<script>
  const Alert = require('../components/alert.vue');
  export default {
    components: { Alert },
    data() {
      return {
        alertVisible: false
      };
    },
    methods:{
      onClick(){
        this.alertVisible= true ;
      }
    }
  };
</script>