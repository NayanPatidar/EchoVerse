"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthInterface {
  isAuthenticated: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthInterface | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    } else if (status === "unauthenticated") {
      setIsAuthenticated(false);
    }
  }, [status]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = (): AuthInterface => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth context not initialized !");
  }

  return context;
};
