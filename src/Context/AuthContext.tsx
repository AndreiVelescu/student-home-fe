import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      role
      lastName
      email
      FirstName
      university
      phone
      preferences {
        cleanliness
        quietness
        lifestyle
      }

      id
    }
  }
`;

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  currentUser: () => User | null;
  loadCurrentUser: () => void;
}

export type User = {
  lastName: string;
  FirstName: string;
  role: string;
  email: string;
  id: number;
  phone: string;
  university: string;
  preferences: {
    cleanliness: number;
    quietness: number;
    lifestyle: string;
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ACCESS_TOKEN_KEY = "accessToken";
export const USER_KEY = "currentUser";
export const REFRESH_TOKEN_KEY = "refreshToken";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
  );

  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
    skip: true,
  });

  const currentUser = (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  const loadCurrentUser = async () => {
    const { data } = await refetch();
    localStorage.setItem(USER_KEY, JSON.stringify(data.getCurrentUser));
  };

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      loadCurrentUser,
      currentUser,
    }),
    [isAuthenticated, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
