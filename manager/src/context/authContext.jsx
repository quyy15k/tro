import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { userLogin } from "../service/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkTokenValidity = () => {
    try {
      const token = Cookies.get("token");
      const tokenExpiration = Cookies.get("tokenExpiration");

      if (token && tokenExpiration) {
        const currentTime = Date.now();
        if (currentTime < tokenExpiration) {
          const decodedToken = jwtDecode(token);
          const userInfo = {
            id: decodedToken.id,
            phone: decodedToken.phone,
            role: decodedToken.role,
          };
          if (decodedToken.role === "admin") {
            setUser(userInfo);
            setIsAuthenticated(true);
            toast.success("Đăng nhập thành công");
          } else {
            toast.info("Tài khoản không đủ quyền hạng");
            logout();
          }
        } else {
          logout();
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      logout();
    }
  };

  const login = async (phone, password) => {
    try {
      const res = await userLogin({
        phone: phone,
        password: password,
      });
      if (res.data?.err === 0) {
        const token = res.data.token;
        const expirationTime = Date.now() + 48 * 60 * 60 * 1000;
        Cookies.set("token", token);
        Cookies.set("tokenExpiration", expirationTime);
        const decodedToken = jwtDecode(token);
        const userInfo = {
          id: decodedToken.id,
          phone: decodedToken.phone,
          role: decodedToken.role,
        };
        if (decodedToken.role === "admin") {
          setUser(userInfo);
          setIsAuthenticated(true);
          toast.success("Đăng nhập thành công");
        } else {
          toast.info("Tài khoản không đủ quyền hạng");
        }
      } else {
        toast.error("Đăng nhập Thất bại");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const logout = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("tokenExpiration");
      setUser(null);
      setIsAuthenticated(false);
      if (window.location.pathname !== "/login")
        window.location.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
