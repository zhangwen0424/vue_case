<template>
  <button
    :class="['my-button', type]"
    @click="$emit('click', $event)"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(["click"]);
// 参数接收
const { type } = defineProps({
  type: { type: String, default: "default" },
  disabled: Boolean,
});
</script>

<style scoped lang="less">
@import "@packages/custom.less";
.my-button {
  appearance: none;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  &:active {
    opacity: 0.8;
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
  &.default {
    background-color: @theme-color;
  }
  &.success {
    background-color: @success-color;
  }
  &.danger {
    background-color: @error-color;
  }
}
</style>
