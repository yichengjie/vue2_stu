<template>
  <div v-if="rendered" v-show="visible" class="alert">
    <p>Alert!</p>
  </div>
</template>
<style>
  .alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<script>
  import Popup from 'vue-popup';
  require('vue-popup/lib/popup.css');
  export default {
      mixins: [Popup],
      props: {
        modal: {
          default: true
        },
        closeOnClickModal: {
          default: true
        }
      }
    };
</script>