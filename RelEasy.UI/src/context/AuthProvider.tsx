import { useState, createContext, useContext, useEffect } from "react";
import { UserService } from "../services/UserService";
import { authProvider } from "../models/authentication/authProvider";

const AuthContext = createContext<authProvider | null>(null);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<string | undefined>(
    UserService.getClaims?.email
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(UserService.isLoggedIn);

  const logOut = () => {
    UserService.logOut();
  };

  const logIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, logOut, logIn }}>
      {props?.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
