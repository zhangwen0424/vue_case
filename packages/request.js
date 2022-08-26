import axios from "axios";

const baseURL = "http://localhost:8888";

// 上传文件
export const uploadFile = (url, formData, onUploadProgress = () => {}) => {
  return axios({
    baseURL,
    url,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
    onUploadProgress,
  });
};

// 合并文件
export const mergeChunks = (url, data) => {
  return axios({
    url,
    baseURL,
    method: "post",
    header: { "Content-Type": "application/json" },
    data,
  });
};
