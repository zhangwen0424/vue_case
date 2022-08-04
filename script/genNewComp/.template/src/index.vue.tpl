<template>
  <div class="my-{{ compClassName }}">
    我是{{ compZhName }}组件
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
@import "@packages/custom.less";
.my-{{ compClassName }} {
  
}
</style>