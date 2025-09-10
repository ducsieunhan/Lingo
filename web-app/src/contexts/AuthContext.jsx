import { createContext, useEffect, useState } from "react";
import keycloak from "../service/keycloak";
import axios from "axios";
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mutex = new Mutex();

  useEffect(() => {
    const checkKeycloak = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
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
      //logic login

      // console.log("User name: " + username);
      // console.log("password: " + password);

      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', 'lingo-ui');
      params.append('username', username);
      params.append('password', password);
      params.append('scope', 'openid');

      const response = await axios.post(
        `http://localhost:8180/realms/Lingo/protocol/openid-connect/token`, params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      const { access_token, refresh_token, refresh_expires_in } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      Cookies.set('refresh_token', refreshToken, {
        // secure: config.NODE_ENV === 'production',
        secure: true,
        httpOnly: true,
        maxAge: refresh_expires_in,
      });

      //set default for each time call api by axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      // logic get user info
      const userInfo = await axios.get(
        `http://localhost:8180/realms/Lingo/protocol/openid-connect/userinfo`
      )

      setUser(userInfo.data);
      localStorage.setItem('user_name', userInfo.data.name);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.log("Login failed with error: " + err);
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
      const response = await axios.post(
        `http://localhost:8080/api/v1/account`,
        userData
      )
      return true;

    } catch (err) {
      console.error("Error when creating new account:" + err);
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

  const refreshToken = async () => {
    return await mutex.runExclusive(async () => {
      try {

        // testing phase
        console.log("Refresh token before get new: " + localStorage.getItem('refresh_token'));
        console.log("Access token before get new: " + localStorage.getItem('access_token'));


        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', 'lingo-ui');
        params.append('refresh_token', localStorage.getItem('refresh_token'));

        const response = await axios.post(
          `http://localhost:8180/realms/Lingo/protocol/openid-connect/token`, params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )

        const { access_token, refresh_token } = response.data;

        console.log("Refresh token after get new: " + refresh_token);
        console.log("Access token after get new: " + access_token);

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

        setIsAuthenticated(true);
        return true;
      } catch (err) {
        console.log("Get refreshed token failed with error: " + err);
        logout();
        return false;
      }
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, register }}>
      {children}
    </AuthContext.Provider>
  );

}

export default AuthContext;