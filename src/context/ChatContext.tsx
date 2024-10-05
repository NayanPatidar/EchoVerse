"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthProvider } from "./AuthContext";

interface ChatProps {
  Friends: Object | undefined;
  SetFriends: Dispatch<SetStateAction<Object | undefined>>;
}

const ChatContext = createContext<ChatProps | undefined>(undefined);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  const [Friends, SetFriends] = useState<Object | undefined>(undefined);
  const { token } = useAuthProvider();

  const FetchFriends = async () => {
    const res = await fetch("api/friends/getAllFriends", {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    if (!token) return;
    FetchFriends();
  }, [token]);

  return (
    <ChatContext.Provider value={{ Friends, SetFriends }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "Use Chat Context has to bee used in the Chat Context Provider"
    );
  }
  return context;
};
