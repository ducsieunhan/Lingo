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
};
export const sendOTP = (email, reset) => {
  return publicInstance.post(
    `/api/v1/account/send-otp`,
    null,
    {
      params: {
        email: email,
        resetPass: reset
      }
    }
  )
};
export const verifyOTP = (email, value) => {
  return publicInstance.post(
    `/api/v1/account/verify-otp`,
    null,
    {
      params: {
        email,
        otp: value
      }
    }
  )
};

export const resetPassword = (email, password) => {
  return publicInstance.put("/api/v1/account/reset-password", { email, password }
  );
}



// auth end here 

export const getListTests = (params) => {
  return instance.get("/api/v1/tests", { params });
};

export const postAttempt = (testData) => {
  return publicInstance.post("/api/v1/attempt", testData);
};

export const putAttempt = (attemptData => {
  return publicInstance.put("/api/v1/attempt", attemptData);
})

export const getAttemptUserShort = (userId) => {
  // return publicInstance.get("api/v1/attempt", { params: { userId } })
  return publicInstance.get("api/v1/attempt", { params: { userId } })
};

export const getAttempt = (attemptId) => {
  return publicInstance.get(`api/v1/attempt/${attemptId}`)
};

export function handleApiError(err, defaultMsg = "Có lỗi xảy ra") {
  const msg = err?.response?.data?.detail || defaultMsg;
  toast.error(msg);
  console.error(msg, err);
};

export const getAllAttempts = () => {
  return publicInstance.get(`api/v1/attempt/all`)
};


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
export const getAccountByUsername = (username) => {
  return publicInstance.get(`api/v1/account/getByUsername/${username}`);
};

export const removeAccount = (accountId) => {
  return publicInstance.delete(`api/v1/account/${accountId}`);
};

export const updateAvatar = (userData) => {
  publicInstance.post("/api/v1/account/avatar", userData);
}

// notification starts here 

const notifiURL = "/api/v1/notifications";

export const getNotificationsOfUser = (accountId) => {
  return publicInstance.get(`${notifiURL}/user/${accountId}`)
}

export const getNotificationById = (notiId) => {
  return publicInstance.get(`${notifiURL}/${notiId}`)
}

export const putNotificationAsRead = (notiId) => {
  return publicInstance.put(`${notifiURL}/mark-as-read/${notiId}`)
}

export const deleteNotification = (notiId) => {
  return publicInstance.delete(`${notifiURL}/${notiId}`)
}

// notification ends here 

// notification settings start here 

const NotiSettingsURL = "/api/v1/user-settings";

export const getNotiUserSettings = (accountId) => {
  return publicInstance.get(`${NotiSettingsURL}/${accountId}`)
}

// export const getNotiUserSettingsEnabled = (accountId) => {
//   return publicInstance.get(`${NotiSettingsURL}/${accountId}/app-enabled`)
// }

export const putNotiUserSettings = (settings) => {
  return publicInstance.put(`${NotiSettingsURL}`,
    settings
  )
}

// notification settings end here 