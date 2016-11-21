<template>
      <div class="data_section " ng-controller="ChargeConfirmCtrl">
            <div class="title_layout">
                <span class="left">2.确定费用</span>
                <span class="right text-info"> 描述  | 费用 </span>
            </div>
            <slot></slot>
      </div>
</template>
<script>
    export default {
        props:['left','right']
    }
</script>