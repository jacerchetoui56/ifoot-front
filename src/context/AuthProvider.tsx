import React, { useEffect } from "react";
import { User } from "../types";

interface IAuthState {
  isAuthenticated?: boolean;
  user: User | null;
}
export type IAuthContext = IAuthState & {
  login: (user: User, access_token: string, refresh_token: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<IAuthContext | null>(null);

//! -- set the session --
const setSession = (access_token: string, refresh_token: string) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const [authState, setAuthState] = React.useState<IAuthState>({
    isAuthenticated: false,
    user: null,
  });

  function login(user: User, access_token: string, refresh_token: string) {
    setSession(access_token, refresh_token);
    setAuthState({ isAuthenticated: true, user });
  }

  function logout() {
    setSession("", "");
    setAuthState({ isAuthenticated: false, user: null });
  }

  useEffect(() => {
    // TODO: checking if user was logged in and redirect him to the dashboard
  }, []);

  console.log(authState);
  return (
    <AuthContext.Provider value={{ ...authState, login: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
