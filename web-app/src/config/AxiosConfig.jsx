import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    return Promise.reject(error?.response?.data);
  }
);
export default instance;