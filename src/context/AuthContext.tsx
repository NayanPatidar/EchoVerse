"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { jwtDecode, JwtDecodeOptions } from "jwt-decode";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DecodedTokenDetails, TokenDetails } from "@/types/tokenDetails";
import { Jwt } from "jsonwebtoken";

interface AuthInterface {
  isAuthenticated: boolean;
  session: Session | null;
  token: String | null;
  isLoading: boolean;
  tokenDetails: TokenDetails;
  setTokenDetails: Dispatch<SetStateAction<TokenDetails>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<String | null>>;
  setOnChange: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthInterface | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<String | null>(null);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>({
    name: "",
    email: "",
  });
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [onchange, setOnChange] = useState(false);

  const VerifyExpired = (exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = currentTime > exp;
    if (isExpired) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  };

  useEffect(() => {
    setIsLoading(true);
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode<DecodedTokenDetails>(storedToken);
      if (!VerifyExpired(decoded.exp)) {
        storedToken = null;
      } else {
        const { name, email } = decoded;
        setTokenDetails({
          name,
          email,
        });
      }
    }
    if (
      status === "authenticated" ||
      (storedToken != null && storedToken != undefined)
    ) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, [status, onchange]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        session,
        setToken,
        token,
        isLoading,
        setIsLoading,
        tokenDetails,
        setTokenDetails,
        setOnChange,
      }}
    >
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
