import React, { createContext, useContext, useState } from "react";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState =
    Cookie.get("jwt") || localStorage.getItem("messanger");
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
