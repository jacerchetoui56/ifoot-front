import { User } from "../types";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../helpers/axios";

interface IAuthState {
  isAuthenticated?: boolean;
  user: User | null;
  login?: (email: string, password: string) => void;
  register?: (name: string, email: string, password: string) => void;
}
const initialAuthState: IAuthState = {
  isAuthenticated: false,
  user: null,
};
export const AuthContext = React.createContext<IAuthState>(initialAuthState);

//! -- set the session --
const setSession = (accessToken: string, user: User) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.clear();
  }
};

// ! --- check for the jwt expiration --
const isValidToken = (token: string | null) => {
  try {
    const decode = jwtDecode(token || "");
    const currentTime = Date.now() / 1000;
    return decode.exp! > currentTime;
  } catch (err) {
    return false;
  }
};

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = React.useState(initialAuthState);
  const pathname = useLocation();

  // !--- LOGIN ----
  const login = async (email: string, password: string) => {
    const response = await Axios.post("/auth/login", { email, password });
    if (!response) return null;

    const { accessToken, user } = response.data;
    setSession(accessToken, user);
    setAuthState({ user, isAuthenticated: true });
  };

  //! --- REGISTER ---
  const register = async (name: string, email: string, password: string) => {
    const response = await Axios.post("/auth/register", {
      name,
      email,
      password,
    });
    if (!response) return null;

    const { accessToken, user } = response.data;
    setSession(accessToken, user);
    setAuthState({ user, isAuthenticated: true });
  };

  useEffect(() => {
    // !-- this function checks the users authentication everytime he changes the page
    const intialize = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const user = localStorage.getItem("user");

      if (accessToken && (await isValidToken(refreshToken))) {
        if (!authState.user) {
          setAuthState({
            user: user ? JSON.parse(user) : {},
            isAuthenticated: true,
          });
        }
      } else if (!isValidToken(refreshToken)) {
        setAuthState({ user: null, isAuthenticated: false });
      }
    };
    intialize();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ ...authState, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
