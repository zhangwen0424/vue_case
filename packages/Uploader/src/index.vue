<template>
  <div class="my-uploader">
    <!-- 阮一峰：https://wangdoc.com/javascript/bom/arraybuffer.html -->
    <!-- filereader: https://blog.csdn.net/ZYS10000/article/details/121053415 -->
    <!-- 简单实现：https://www.jb51.net/article/255711.htm -->
    <!-- 分片：https://www.jb51.net/article/252310.htm -->

    <!-- 基础上传 -->
    <div v-if="type == 'default'" class="default">
      <input
        type="file"
        accept="image/*, *.txt"
        :ref="(el) => setRef(el, 'file')"
        @change="uploadImediate ? uploadImg($event) : ''"
      />
      <!-- single ，multiple -->
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
    </div>

    <!-- 预览区域 -->
    <!-- :style="previewHeight" -->
    <div
      v-if="showPreview"
      class="preview"
      :ref="(el) => setRef(el, 'preview')"
      id="uploader_preview"
    >
      <div v-for="(file, index) in fileList" class="file_container">
        <img
          v-if="file.fileType == 'image'"
          class="file"
          :src="file.url"
          :alt="fileList.name"
        />
        <span>{{ file.name }}</span>
      </div>
    </div>

    <!-- 上传按钮 -->
    <div v-if="!uploadImediate" class="upload_btn">
      <my-button>上传文件</my-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, reactive } from "vue";

const { limit } = defineProps({
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
  // 上传个数限制
  limit: {
    type: Number,
    default: 2,
  },
});

// ref 存储
let filesRef: any = toRaw({});
function setRef(el: any, code: string) {
  filesRef[code] = el;
}

// 预览内容
let previewHeight: any = reactive({ height: "0px" });
let fileList: any = reactive([]);

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

  // 文件个数限制
  console.log("limit", limit, fileList.length);
  if (fileList.length >= limit) {
    return confirm("超过个数限制：" + limit);
  }

  // 拖拽文件预览处理
  let files = e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let fileType = file.type.split("/")[0];
    // 是图片才可以预览
    // if (file.type.substring(0, 6) != "image/") continue;
    if (!["image", "text"].includes(fileType)) {
      confirm("只允许 image 和 text 格式");
      continue;
    }
    file["fileType"] = fileType;

    // 读取数据
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log("result", reader.result);
      file["url"] = reader.result;
      fileList.push(file);
    };

    console.log("file", file);

    /* previewHeight.height = "200px";

    if (fileType == "image") {
      // FileReader 只接受 File 或 Blob 类型的数据(事实上 File 也 Blob 的一种)
      // 图片预览，实现 1
      let img = document.createElement("img");
      img.src = URL.createObjectURL(file); // 创建预览 url
      img.width = 200;
      img.style.margin = "10px 10px 10px 0px";
      img.style.border = "1px solid #000";
      img.onload = function (e) {
        console.log("data", e.target);
        let pre = document.getElementById("uploader_preview");
        pre && e.target && pre.appendChild(e.target as Node);
        URL.revokeObjectURL(img.src); // 释放一个通过URL.createObjectURL()创建的对象URL
      };

      // 图片预览，实现 2
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = ()=>{
      //     console.log(reader.result);
      // }
    }

    // 读取文件并预览
    if (fileType == "text") {
      let reader = new FileReader();
      let text = document.createElement("textarea");
      text.style.width = "200px";
      text.style.margin = "10px 10px 10px 0px";
      text.style.border = "1px solid #000";
      reader.readAsText(file, "utf-8");
      reader.onload = function (e) {
        text.value = String(e.target?.result || "");
        let pre = document.getElementById("uploader_preview");
        pre && e.target && pre.appendChild(text);
      };
    } */
  }
}
</script>

<style lang="less" scoped>
@import "@packages/custom.less";
.my-uploader {
  // 拖拽样式
  .drag {
    display: flex;
    align-items: center;
    .drop_class {
      width: 200px;
      height: 200px;
      border: 1px solid #eee;
      text-align: center;
      line-height: 200px;
      display: inline-block;
    }
  }

  // 预览样式
  .preview {
    display: flex;
    .file_container {
      .file {
        width: 200px;
        height: 200px;
        border: 1px solid #eee;
        display: inline-block;
      }
    }

    // img {
    //   position: relative;
    //   &::after {
    //     content: "x";
    //     position: absolute;
    //     width: 10px;
    //     height: 10px;
    //     border-radius: 10px;
    //     background-color: #fff;
    //     top: 0;
    //     right: 0;
    //   }
    // }
  }

  // 上传按钮
  .upload_btn {
    margin: 10px 0px 10px 0px;
  }
}
</style>
