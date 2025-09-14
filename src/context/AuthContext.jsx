import { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      // Success toast
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 2500,
      });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    toast.info("Logged out", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
