"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthProvider } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the Message type
interface Message {
  text: string;
  sender: string;
}

const FriendChat = ({ params }: { params: { roomId: string } }) => {
  const { ChatUserName } = useChatContext();
  const { tokenDetails } = useAuthProvider();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]); // Use Message type
  const [roomMessages, setRoomMessages] = useState<string[]>([]);

  useEffect(() => {
    if (tokenDetails && tokenDetails.userId) {
      const socketInstance: Socket = io("http://localhost:3000");
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
            { text: message, sender: name },
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
    }
  };

  const handleSearchBarKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === " ") {
      event.stopPropagation();
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
                msg.sender === tokenDetails.name
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-md text-white ${
                  msg.sender === tokenDetails.name
                    ? "bg-blue-500"
                    : "bg-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
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
