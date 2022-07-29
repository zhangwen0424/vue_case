<!-- 这里编写 Button 组件 -->

<template>
  <button class="my-button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
// 子组件向父组件事件传递
defineEmits(["click"]);
</script>

<style scoped>
.my-button {
  background-color: yellow;
}
</style>
