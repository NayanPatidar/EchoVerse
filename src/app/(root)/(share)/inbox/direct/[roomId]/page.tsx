"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthProvider } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

interface Message {
  content: string;
  senderId: string;
}

const FriendChat = ({ params }: { params: { roomId: string } }) => {
  const { ChatUserName, Friends, ChatFriendId } = useChatContext();
  const { tokenDetails, token } = useAuthProvider();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomMessages, setRoomMessages] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/friends/chat?relationId=${params.roomId}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const messages = await res.json();

        console.log(messages);

        const filteredMessage: Message[] = messages.res.map((message: any) => ({
          content: message.content,
          senderId: message.senderId,
        }));

        setMessages(filteredMessage);
      } catch (error: any) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (tokenDetails && tokenDetails.userId) {
      const socketInstance: Socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
      setSocket(socketInstance);
      const userId = tokenDetails.userId;
      const name = tokenDetails.name;
      const roomId = params.roomId;

      socketInstance.emit("joinRoom", { name, userId, roomId });

      socketInstance.on("roomMessage", (msg: string) => {
        if (msg) {
          setRoomMessages((prevMessages) => [...prevMessages, msg]);
        } else {
          console.warn("Received empty message from user:", userId);
        }
      });

      socketInstance.on("receiveMessage", ({ name, userId, message }) => {
        if (message) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: message, senderId: userId },
          ]);
        } else {
          console.warn("Received empty message from user:", userId);
        }
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [tokenDetails]);

  const sendMessage = () => {
    if (message.trim()) {
      socket?.emit("sendMessage", message);
      setMessage("");
      AddMessageToDB();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const AddMessageToDB = async () => {
    if (!ChatFriendId) {
      return;
    }

    const res = await fetch("/api/friends/chat/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        friendId: ChatFriendId,
        relationId: params.roomId as string,
        message: message,
      }),
    });
  };

  const handleSearchBarKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === " ") {
      event.stopPropagation();
    } else if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full gap-1">
      <div className="w-full p-2 h-10 text-white text-start flex bg-black rounded-md">
        {ChatUserName}
      </div>
      <div className="MyChat h-full bg-[#151515] rounded-md overflow-auto">
        <div className=" overflow-hidden flex flex-col gap-2 p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === tokenDetails.userId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-md text-white ${
                  msg.senderId === tokenDetails.userId
                    ? "bg-blue-500"
                    : "bg-gray-700"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="w-full flex flex-row">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="text-black"
          onKeyDown={handleSearchBarKeyDown}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default FriendChat;
