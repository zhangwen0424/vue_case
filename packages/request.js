import axios from "axios";

const baseURL = "/api";
const timeout = 60 * 1000;

// 添加请求拦截器
axios.interceptors.request.use(
  // 请求前
  function (config) {
    return config;
  },
  // 请求错误
  function (err) {
    debugger;
    console.log("err", err);
    return Promise.reject(err);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// 上传文件
export const uploadFile = (url, formData, onUploadProgress = () => {}) => {
  return axios({
    baseURL,
    timeout,
    url,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
    onUploadProgress,
  });
};

// 合并文件
export const mergeChunks = (url, data, onUploadProgress = () => {}) => {
  return axios({
    url,
    timeout,
    baseURL,
    method: "post",
    header: { "Content-Type": "application/json" },
    data,
    onUploadProgress,
  });
};
