<template>
  <div>
    <my-tabs v-model="activedTab" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
// const list = reactive(["a", "b", "c"]);:list="list"
const activedTab = ref("a");
</script>
