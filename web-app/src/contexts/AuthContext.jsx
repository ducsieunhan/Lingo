import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserInfoApi, handleApiError, loginApi, registerApi } from "../config/api";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from "../slice/authentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authentication);


  useEffect(() => {
    const checkKeycloak = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          dispatch(setIsAuthenticated(true));
        } else {
          dispatch(setIsAuthenticated(false));
        }
      } catch (error) {
        console.log("Cant't authorize user: " + error);
      } finally {
        setLoading(false);
      }
    }
    checkKeycloak();
  }, [])


  const login = async (username, password) => {
    try {
      setLoading(true);

      const response = await loginApi(username, password);

      const { access_token } = response.data;

      localStorage.setItem("access_token", access_token);

      //set default for each time call api by axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      // logic get user info
      const userInfo = await getUserInfoApi(access_token);

      storeUserInfo(userInfo);
      setIsAuthenticated(true);
      toast.info("Đăng nhập thành công")
      return true;
    } catch (err) {
      handleApiError(err, "Đăng nhập thất bại");
      return false;
    }
    finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      console.log(userData);
      const response = await registerApi(userData);
      toast.info("Đăng ký tài khoản thành công")
      return true;

    } catch (err) {
      handleApiError(err, "Đăng ký tài khoản thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_name');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  }

  const loginGoogle = async (code) => {
    try {
      setLoading(true);
      console.log("From auth : ", code);

      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/google/${code}`,
        {},
        { withCredentials: true }
      );

      const { access_token } = response.data;

      localStorage.setItem("access_token", access_token);

      //set default for each time call api by axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      // logic get user info
      const userInfo = await getUserInfoApi(access_token);
      storeUserInfo(userInfo);


      const gg = await axios.post(
        `http://localhost:8080/api/v1/account/gg`,
        userInfo,
        {
          headers: {
            "Authorization": `Bearer ${access_token}`
          }
        }
      );

      setIsAuthenticated(true);
      toast.info("Đăng nhập thành công")
      return true;

    } catch (err) {
      console.log("Login failed with error: ", err?.message);
      toast.error(err?.response?.data?.detail);
      return false;
    }
    finally {
      setLoading(false);
    }
  }

  const storeUserInfo = (info) => {
    localStorage.setItem('user_profile', JSON.stringify(info));
    setUser(info);
  }


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, register, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );

}

export default AuthContext;