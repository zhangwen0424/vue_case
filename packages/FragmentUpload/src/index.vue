<template>
  <div class="my-fragment-upload">
    <div class="default">
      <input
        type="file"
        multiple
        :ref="(el) => setRef(el, 'file')"
        style="display: none"
        @change="fileChange(($event.target as HTMLInputElement).files)"
      />
      <my-button @click="filesRef.file.click()">选择文件</my-button>
      <ul :if="fileChunkList.length">
        <li v-for="(file, index) in fileChunkList">{{ file }}-{{ index }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, ref } from "vue";
import * as SparkMD5 from "spark-md5";
import { uploadFile, mergeChunks } from "../../request";

// ref 存储
let filesRef: any = toRaw({});
function setRef(el: any, code: string) {
  filesRef[code] = el;
}

// 当前处理文件
const currFile = ref({});
// 当前文件分块
const fileChunkList = ref([]);
// 文件默认分块大小
const DefualtChunkSize = 5 * 1024 * 1024;
// 上传的文件
const chunkRequest = [];

// 清空表单
/* const clear = async (e: any) => {
  // debugger;
  // e.currentTarget.outerHTML = "";
  currFile.value = {};
}; */
// 文件变化
const fileChange = async (files: any) => {
  const file = files[0];
  if (!file) return;
  currFile.value = file;
  fileChunkList.value = [];
  let { hexHash } = await getFileChunk(file);
  uploadChunks(hexHash);
};

// 获取文件分块 + 对文件进行MD5加密(文件内容+文件标题形式)
const getFileChunk = function (file: any, chunkSize = DefualtChunkSize) {
  return new Promise((resolve) => {
    let fileSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice,
      currentChunk = 0,
      chunks = Math.ceil(file.size / chunkSize),
      spark = new SparkMD5.ArrayBuffer();
    let fileReader = new FileReader();
    // 文件分片
    function loadNext() {
      let start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize,
        chunk = fileSlice.call(file, start, end);
      fileChunkList.value.push({
        chunk,
        size: chunk.size,
        name: currFile.name,
      });
      fileReader.readAsArrayBuffer(chunk);
    }
    fileReader.onload = function () {
      console.log(`chunk： ${currentChunk + 1}  读取完成`);
      const chunk = fileReader.result;
      spark.append(chunk);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        let fileHash = spark.end();
        console.log("文件读取完毕：", fileHash);
        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
        // 想保留两个文件无法保留。所以把文件名称加上，但是有个弊端，同内容的不需要重复上传
        const sparkmd5 = new SparkMD5();
        sparkmd5.append(fileHash);
        sparkmd5.append(file.name);
        const hexHash: String = sparkmd5.end();
        resolve({ hexHash });
      }
    };
    fileReader.onerror = function () {
      console.warn("文件读取失败", fileReader.error);
    };
    loadNext();
  }).catch((err) => {
    console.log("err:", err);
  });
};

// 上传文件
const uploadChunks = async (fileHash: string) => {
  /**
   * 文件分片是按照分片序号命名的，而分片上传接口是异步的，
   * 无法保证服务器接收到的切片是按照请求顺序拼接。
   * 所以应该在合并文件夹里的分片文件前，根据文件名进行排序
   */
  for (let i = 0; i < fileChunkList.value.length; i++) {
    const formData = new FormData();
    formData.append(`${currFile.value.name}-${fileHash}-${index}`, item.chunk);
    formData.append("hash", `${fileHash}-${index}`);
    formData.append("fileHash", fileHash);
    let res = await uploadFile("/file/upload", formData);
    // chunkRequest.push();
    console.log("res", res);
  }
  // const requests = fileChunkList.value.map((item, index) => {});
};

// 合并文件
// const mergeChunks = async () => {
//   //
// };
</script>

<style lang="less" scoped>
@import "@packages/custom.less";
.my-fragment-upload {
}
</style>
