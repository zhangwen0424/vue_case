<template>
  <div class="my-uploader">
    <!-- 阮一峰：https://wangdoc.com/javascript/bom/arraybuffer.html -->
    <!-- filereader: https://blog.csdn.net/ZYS10000/article/details/121053415 -->
    <!-- 简单实现：https://www.jb51.net/article/255711.htm -->
    <!-- 分片：https://www.jb51.net/article/252310.htm -->
    <!-- :ref="(el) => setRef(el, 'file')" -->

    <!-- 基础上传 -->
    <div v-if="type == 'default'" class="default">
      <input
        type="file"
        accept="image/*, *.txt"
        :ref="(el) => setRef(el, 'file')"
        @change="uploadImediate ? uploadImg($event) : ''"
      />
    </div>

    <!-- 拖拽上传 -->
    <div v-if="type == 'drag'" class="drag">
      <div
        class="drop_class"
        @drop="dropFile"
        @dragover="stopDefault($event)"
        @dragenter="stopDefault($event)"
      >
        拖拽到此处
      </div>
      <div></div>
    </div>

    <!-- 预览区域 -->
    <!-- :v-html="previewHtml" -->
    <div
      v-if="showPreview"
      :style="previewHeight"
      :ref="(el) => setRef(el, 'preview')"
      id="uploader_preview"
    ></div>

    <!-- 上传按钮 -->
    <div v-if="!uploadImediate" class="upload_btn">
      <my-button>上传文件</my-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, reactive } from "vue";
defineProps({
  //上传类型，default: 普通上传，drag: 拖拽上传
  type: {
    type: String,
    default: "drag",
  },
  // 选择文件后立即上传
  uploadImediate: {
    type: Boolean,
    default: false,
  },
  // 是否显示图片预览
  showPreview: {
    type: Boolean,
    default: true,
  },
});

// refs
let files: any = toRaw({});
function setRef(el: any, code: string) {
  files[code] = el;
}

// 预览内容
let previewHeight: any = reactive({ height: "0px" });

// 上传文件
function uploadImg(event: any) {
  let fileList = event.target.files;
  console.log("fileList", event, fileList);
  for (let i = 0; i < fileList.length; i++) {
    let file = fileList[i];
    console.log("file", file);
  }
}

// 阻止拖拽上传默认事件
function stopDefault(e: any) {
  e.preventDefault();
  e.stopPropagation();
}
// 拖拽文件  问题：1.兼容性问题 2.拖拽网页文件上传时, 要注意是否正确取到了文件
function dropFile(e: any) {
  e.preventDefault();
  e.stopPropagation();
  let files = e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let fileType = file.type.split("/")[0];
    // 是图片才可以预览
    // if (file.type.substring(0, 6) != "image/") continue;

    // FileReader 只接受 File 或 Blob 类型的数据(事实上 File 也 Blob 的一种)
    if (fileType == "image") {
      // 图片预览，实现 1
      let img = document.createElement("img");
      img.src = URL.createObjectURL(file); // 创建预览 url
      img.width = 200;
      img.onload = function (e) {
        console.log("data", e.target);
        let pre = document.getElementById("uploader_preview");
        previewHeight.height = "200px";
        pre && e.target && pre.appendChild(e.target as Node);
        URL.revokeObjectURL(img.src); // 释放一个通过URL.createObjectURL()创建的对象URL
      };
    }
    // 图片预览，实现 2

    if (fileType == "text") {
      let reader = new FileReader();
      let text = document.createElement("textarea");
      reader.readAsText(file, "utf-8");
      reader.onload = function (e) {
        console.log("e");
        text.value = String(e.target?.result || "");
        let pre = document.getElementById("uploader_preview");
        previewHeight.height = "200px";
        pre && e.target && pre.appendChild(text);
      };
    }

    // 读取文件并预览
    // let reader = new FileReader();
    // reader.readAsText(file, "utf-8");
    // reader.onload = function (evt) {
    //   let text = evt.target?.result;
    //   console.log("text", text);
    //   previewHtml = text;
    //   let pre: HTMLElement | null = document.getElementById("uploader_preview");
    //   pre && (pre.innerText = text || "");
    // };
  }
}
</script>

<style lang="less" scoped>
@import "@packages/custom.less";
.my-uploader {
  .drop_class {
    width: 200px;
    height: 200px;
    border: 1px solid #eee;
    // display: flex;
    align-items: center;
    justify-content: center;
  }
  .uploader {
    display: inline-block;
  }
  .upload_btn {
    margin: 10px 0px 10px 0px;
  }
  #uploader_preview {
    width: 200px;
    height: 200px;
  }
}
</style>
