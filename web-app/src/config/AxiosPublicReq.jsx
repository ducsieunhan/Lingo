import axios from "axios";

const publicInstance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

publicInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default publicInstance; 