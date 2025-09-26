import { toast } from 'react-toastify';
import instance from './AxiosConfig'
import publicInstance from './AxiosPublicReq';

export const loginApi = (username, password) =>
  publicInstance.post("/api/v1/auth/login", { username, password }, { withCredentials: true });

export const registerApi = (userData) =>
  publicInstance.post("/api/v1/account", userData
  );


export const getUserInfoApi = (access_token) =>
  instance.get("/realms/Lingo/protocol/openid-connect/userinfo", {
    baseURL: "http://localhost:8180",
    headers: { Authorization: `Bearer ${access_token}` }
  });

export const loginGoogleApi = (code) =>
  publicInstance.post(`/api/v1/auth/google/${code}`, {}, { withCredentials: true });

export const registerGG = (userData, access_token) => {
  publicInstance.post(
    `/api/v1/account/gg`,
    userData,
    {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    }
  )
}

export function handleApiError(err, defaultMsg = "Có lỗi xảy ra") {
  const msg = err?.response?.data?.detail || defaultMsg;
  toast.error(msg);
  console.error(msg, err);
}