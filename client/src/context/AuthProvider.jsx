import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialUserState = () => {
    try {
      const stored = localStorage.getItem("messanger");
      return stored ? JSON.parse(stored) : undefined;
    } catch (e) {
      return undefined;
    }
  };

  const [authUser, setAuthUser] = useState(getInitialUserState);

  return (
    <AuthContext.Provider value={[ authUser, setAuthUser ]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
