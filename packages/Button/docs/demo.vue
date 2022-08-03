<template>
  <div>
    <my-button @click="onClick(1)">默认按钮</my-button>
    <my-button @click="onClick(2)" :type="'success'">成功按钮</my-button>
    <my-button @click="onClick(3)" :type="'danger'">危险按钮</my-button>
    <my-button @click="onClick(4)" :type="'danger'" :disabled="true"
      >禁用按钮</my-button
    >
  </div>
</template>

<script setup>
const onClick = (num) => {
  console.log(`我是第 ${num} 个自定义按钮`);
};
</script>
