import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  const setAuthData = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
  };
  const logout_url = "/api/logout";
  const login_url = "/api/login";
  const logout = async () => {
    try {
      await fetch(logout_url, {
        method: "POST",
        credentials: "include", // Important for cookies
      });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setToken(null);
      setUserId(null);
    }
  };
  const login = async (email, password,account_type) => {
        try {
          const response = await fetch("api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, account_type }),
          });
          if (response.ok) {
            const data = await response.json();
            toast.success(data.msg || "Login succesful", {
              position: "top-right",
              autoClose: 6000,
              style: {
                borderRadius: "10px",
                background: "#101f3c",
                color: "#fff",
              },
            });
            console.log(data);
            navigate("/parent_portal");
            localStorage.setItem("authToken", `${data.token}`);
          const { token, userId } = await response.json();

          setAuthData(token, userId);
          } else {
            const errorData = await response.json();
            toast.error(errorData.msg || "An error occurred", {
              position: "top-right",
              autoClose: 6000,
              style: {
                borderRadius: "10px",
                background: "#101f3c",
                color: "#fff",
              },
            });
            throw new Error(errorData.msg || "An error occurred");
          }
        } catch (error) {
          console.error("Erorror submitting form:", error);
        }
    try {
      const response = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const { token, userId } = await response.json();

      setAuthData(token, userId);
      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: "Invalid username or password" };
    }
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
