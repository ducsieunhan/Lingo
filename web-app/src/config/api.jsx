import { toast } from 'react-toastify';
import instance from './AxiosConfig'
import publicInstance from './AxiosPublicReq';

export const loginApi = (username, password) =>
  publicInstance.post("/api/v1/auth/login", { username, password }, { withCredentials: true });

export const registerApi = (userData) =>
  publicInstance.post("/api/v1/account", userData
  );


export const getUserInfoApi = (access_token) =>
  publicInstance.get("/realms/Lingo/protocol/openid-connect/userinfo", {
    baseURL: "http://localhost:8180",
    headers: { Authorization: `Bearer ${access_token}` }
  });

export const loginGoogleApi = (code) =>
  publicInstance.post(`/api/v1/auth/google/${code}`, {}, { withCredentials: true });

export const logoutApi = (client_id) =>
  instance.post(`/api/v1/auth/logout/${client_id}`, {}, { withCredentials: true });

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


export const getListTests = (params) => {
  return instance.get("/api/v1/tests", { params });
}

export const postAttempt = (testData) => {
  return instance.post("/api/v1/attempt", testData);
}

export const getAttemptUserShort = (userId) => {
  // return instance.get("api/v1/attempt", { params: { userId } })
  return instance.get("api/v1/attempt", { params: { userId } })
};

export const getAttempt = (attemptId) => {
  return instance.get(`api/v1/attempt/${attemptId}`)
};

export function handleApiError(err, defaultMsg = "Có lỗi xảy ra") {
  const msg = err?.response?.data?.detail || defaultMsg;
  toast.error(msg);
  console.error(msg, err);
};

export const getAllAttempts = () => {
  return instance.get(`api/v1/attempt/all`)
}


// account

export const getAllAccounts = (params) => {
  return publicInstance.get("api/v1/account", { params });
};

export const getAccount = (accountId) => {
  return publicInstance.get(`api/v1/account/${accountId}`);
};

export const enableAccount = ({ id, enable }) => {
  return publicInstance.post(
    "api/v1/account/enable",
    null,
    {
      params: { id, enable }
    }
  );
};

export const createAccount = (userData) =>
  publicInstance.post("/api/v1/account", userData
  );

export const updateAccount = (userData) =>
  publicInstance.put("/api/v1/account", userData
  );


export const removeAccount = (accountId) => {
  return publicInstance.delete(`api/v1/account/${accountId}`);
};

export const updateAvatar = (userData) => {
  publicInstance.post("/api/v1/account/avatar", userData);
}