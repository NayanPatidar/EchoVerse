"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthProvider } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const FriendChat = ({ params }: { params: { roomId: string } }) => {
  const { ChatUserName } = useChatContext();
  const { tokenDetails } = useAuthProvider();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [roomMessages, setRoomMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log(params.roomId);

    const socketInstance: Socket = io("http://localhost:3000");
    setSocket(socketInstance);
    const userId = tokenDetails.userId;
    const roomId = params.roomId;

    socketInstance.emit("joinRoom", { userId, roomId });

    socketInstance.on("roomMessage", (msg: string) => {
      setRoomMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for received messages
    socketInstance.on(
      "receiveMessage",
      ({ userId, message }: { userId: string; message: string }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${userId}: ${message}`,
        ]);
      }
    );

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket?.emit("sendMessage", message); // Emit sendMessage event to the server
    setMessage(""); // Clear input after sending
  };

  return (
    <div className=" flex flex-col justify-between w-full h-full gap-1">
      <div className=" w-full p-2 h-10 text-white text-start flex bg-black rounded-md">
        {ChatUserName}
      </div>
      <div className=" h-full bg-[#151515] rounded-md">
        <div>
          <h2>Room Messages</h2>
          {roomMessages.map((msg: any, index: number) => (
            <div key={index}>{msg}</div>
          ))}
        </div>

        {/* Chat messages section */}
        <div>
          <h2>Chat Messages</h2>
          {messages.map((msg: any, index: number) => (
            <div key={index}>
              <strong>{msg.userId}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div className=" w-full flex flex-row">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className=" text-black"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default FriendChat;
