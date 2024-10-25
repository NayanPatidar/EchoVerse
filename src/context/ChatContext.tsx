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
import { FriendData } from "@/types/user";
import { io } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

interface ChatProps {
  Friends: FriendData[] | undefined;
  SetFriends: Dispatch<SetStateAction<FriendData[] | undefined>>;
  FriendsAdded: boolean;
  SetFriendAdded: Dispatch<SetStateAction<boolean>>;
  ChatUserName: String | undefined;
  SetChatUserName: Dispatch<SetStateAction<String | undefined>>;
  ChatFriendId: String | undefined;
  SetChatFriendId: Dispatch<SetStateAction<String | undefined>>;
}

const ChatContext = createContext<ChatProps | undefined>(undefined);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  const [Friends, SetFriends] = useState<FriendData[] | undefined>(undefined);
  const [FriendsAdded, SetFriendAdded] = useState(false);
  const [ChatUserName, SetChatUserName] = useState<String | undefined>(
    undefined
  );
  const [ChatFriendId, SetChatFriendId] = useState<String | undefined>(
    undefined
  );

  const { token } = useAuthProvider();

  const FetchFriends = async () => {
    const res = await fetch("/api/friends/getAllChatFriends", {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    SetFriends(data.res);
  };

  useEffect(() => {
    if (!token) return;
    FetchFriends();
  }, [token, FriendsAdded]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    setInterval(() => {
      console.log("Sending ping to server");
      socket.emit("ping");
    }, 300000);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        Friends,
        SetFriends,
        FriendsAdded,
        SetFriendAdded,
        SetChatUserName,
        ChatUserName,
        ChatFriendId,
        SetChatFriendId,
      }}
    >
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
