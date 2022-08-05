<template>
  <div class="my-uploader">
    <!-- 阮一峰：https://wangdoc.com/javascript/bom/arraybuffer.html -->
    <!-- filereader: https://blog.csdn.net/ZYS10000/article/details/121053415 -->
    <!-- 简单实现：https://www.jb51.net/article/255711.htm -->
    <!-- 分片：https://www.jb51.net/article/252310.htm -->
    <input type="file" accept=".png, .jpg" @change="uploadImg" />
    <my-button></my-button>
  </div>
</template>

<script lang="ts" setup>
// defineC
// import Button from "@packages/Button/src/index";
// 上传文件
function uploadImg() {
  //
}
</script>

<style lang="less" scoped>
@import "@packages/custom.less";
.my-uploader {
}
</style>
