import { Mutex } from "async-mutex";
import axios from "axios";
import publicInstance from "./AxiosPublicReq";
import { useNavigate } from "react-router-dom";

const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

export const refreshToken = async () => {
  return await mutex.runExclusive(async () => {
    try {
      const response = await publicInstance.post('/api/v1/auth/refresh');
      // SỬA LỖI #2: Lấy token từ response.data
      const { access_token } = response;

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return true;
      }
      return false;
    } catch (err) {
      console.error("Refresh token failed:", err);
      return false;
    }
  });
};

instance.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.headers[NO_RETRY_HEADER]) {
      // originalRequest.headers[NO_RETRY_HEADER] = 'true';  // might be multi requests 

      const refreshSuccess = await refreshToken();

      if (refreshSuccess) {
        const newAccessToken = localStorage.getItem('access_token');
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_profile');
      delete instance.defaults.headers.common['Authorization'];

      window.dispatchEvent(new Event('logout'));

      return Promise.reject(new Error('Session expired. Please log in again.'));
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(new Error('A network error occurred.'));
  }
);
export default instance;