import { Axios } from "@/helpers/axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import React, { useEffect } from "react";
import { Profile, User } from "../types";
import { LoadingPageSpinner } from "@/routes";

interface IAuthState {
  isAuthenticated?: boolean;
  user: User | null;
  profile: Profile | null;
}
export type IAuthContext = IAuthState & {
  login: (user: User, access_token: string, refresh_token: string) => void;
  logout: () => void;
  initializeProfile: (profile: Profile) => void;
};

export const AuthContext = React.createContext<IAuthContext | null>(null);

const setSession = (access_token: string, refresh_token: string) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

function isValidToken(token: string | null) {
  if (!token) return false;
  try {
    const decode = jwtDecode<JwtPayload>(token);
    const currentTime = new Date().getTime() / 1000;
    if (decode.exp) {
      return decode.exp > currentTime;
    }
    return false;
  } catch (err) {
    return false;
  }
}

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);

  function login(user: User, access_token: string, refresh_token: string) {
    setSession(access_token, refresh_token);
    setIsAuthenticated(true);
    setUser(user);
  }

  function initializeProfile(profile: Profile) {
    setProfile(profile);
  }

  function logout() {
    setSession("", "");
    setIsAuthenticated(false);
    setUser(null);
    setProfile(null);
  }

  useEffect(() => {
    // TODO: checking if user was logged in and redirect him to the dashboard
    const intialize = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if ((access_token && isValidToken(access_token)) || refresh_token) {
          const { data } = await Axios.get("/auth", {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          });
          setUser(data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    intialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        initializeProfile: initializeProfile,
        profile,
        isAuthenticated,
        login: login,
        logout: logout,
      }}
    >
      {loading ? <LoadingPageSpinner /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
