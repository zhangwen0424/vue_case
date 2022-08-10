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
        multiple
        accept="image/*, *.txt"
        :ref="(el) => setRef(el, 'file')"
        style="display: none"
        @change="saveFile(($event.target as HTMLInputElement).files)"
      />
      <my-button @click="filesRef.file.click()">选择文件</my-button>
      <span>只能上传{{ limit }}个，支持 image 和 txt</span>
      <!-- 多选，单选 single ，multiple -->
    </div>

    <!-- 拖拽上传 -->
    <div v-if="type == 'drag'" class="drag">
      <div
        class="drop_class"
        @drop="dropFile"
        @dragover="stopDefault($event)"
        @dragenter="stopDefault($event)"
      >
        <span> 拖拽到此处 </span>
        <span>支持 text、image</span>
        <span>只能上传{{ limit }}个</span>
      </div>
    </div>

    <!-- 预览区域 -->
    <div
      v-if="showPreview"
      class="preview"
      :ref="(el) => setRef(el, 'preview')"
      id="uploader_preview"
    >
      <div
        v-for="(file, index) in fileList"
        :class="['file_container', file.uploaded ? 'uploaded' : '']"
      >
        <!-- 图片 -->
        <img
          v-if="file.fileType == 'image'"
          class="file"
          :src="file.url"
          :alt="fileList.name"
        />
        <!-- 文本 -->
        <textarea
          v-if="file.fileType == 'text'"
          :value="file.value"
          class="file"
          >{{ file.value }}</textarea
        >
        <span>{{ file.name }}</span>
        <i class="fa fa-close" @click="deleteFile(file)"></i>
      </div>
    </div>

    <!-- 上传按钮 -->
    <div v-if="!uploadImediate" class="upload_btn">
      <my-button @click="uploadFile">上传文件</my-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, reactive, ref, shallowReactive, isReactive } from "vue";

const { limit, uploadImediate, beforeUpload } = defineProps({
  //上传类型, default: 普通上传，drag: 拖拽上传
  type: {
    type: String,
    default: "default",
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
    default: 3,
  },
  // 上传前的校验
  beforeUpload: Function,
});

// ref 存储
let filesRef: any = toRaw({});
function setRef(el: any, code: string) {
  filesRef[code] = el;
}

// 预览内容
let fileList: any = reactive([]);

// 上传文件
async function uploadFile() {
  if (beforeUpload) {
    await Promise.resolve(beforeUpload());
  }
  // 模拟异步上传
  setTimeout(() => {
    let files = fileList.map((f: any) => {
      f["uploaded"] = true;
      return f;
    });
    fileList.length = 0;
    fileList.push(...files);
  }, 1000);
}
// 删除文件
function deleteFile(file: any) {
  let index = fileList.indexOf(file);
  fileList.splice(index, 1);
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
  // 拖拽文件
  let files = e.dataTransfer.files;
  saveFile(files);
}
// 存储文件
async function saveFile(files: any) {
  // 文件个数限制
  if (fileList.length + files.length > limit) {
    return confirm("超过个数限制：" + limit);
  }

  // 拖拽文件预览处理
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

    // 解决异步处理获取不到 fileList 问题
    await new Promise((resolve) => {
      // 读取数据 用于预览功能
      let reader = new FileReader();
      reader[fileType == "image" ? "readAsDataURL" : "readAsText"](file);
      reader.onload = (e) => {
        file["url"] = reader.result;
        file["value"] = reader.result;
        file["uploaded"] = false;
        fileList.push(reactive(file));
        resolve("");
      };
    });

    /* 如果是操作 dom 可以按照下面写法
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

  // 选中即上传
  if (uploadImediate) {
    uploadFile();
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
      display: flex;
      flex-direction: column;
      span {
        height: 20px;
      }
    }
  }

  // 预览样式
  .preview {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    .file_container {
      display: flex;
      flex-direction: column;
      width: 200px;
      margin: 10px 10px 10px 0px;
      position: relative;
      &:hover {
        i {
          display: inline-block;
        }
      }
      .file {
        width: 200px;
        height: 200px;
        margin-bottom: 10px;
        border: 2px dashed @warning-color;
      }
      &.uploaded {
        .file {
          border: 2px dashed @success-color;
        }
      }
      .file span {
        width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i {
        display: none;
        position: absolute;
        bottom: 1px;
        right: 3px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
