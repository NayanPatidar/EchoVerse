"use client";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/context/ChatContext";
import { useEffect } from "react";
import { io } from "socket.io-client";

const FriendChat = ({ params }: { params: { roomId: string } }) => {
  const { ChatUserName } = useChatContext();

  let socket: any;

  useEffect(() => {
    console.log(params.roomId);

    socket = io("http://localhost:3000");

    // Join the chat room with userId and friendId
    socket.emit("joinRoom", { });

    // Listen for messages from the server
    // socket.on("receiveMessage", ({ userId, message }) => {
    //   setMessages((prevMessages) => [...prevMessages, { userId, message }]);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className=" flex flex-col justify-between w-full h-full gap-1">
      <div className=" w-full p-2 h-10 text-white text-start flex bg-black rounded-md">
        {ChatUserName}
      </div>
      <div className=" h-full bg-[#151515] rounded-md"></div>
      <div>
        <Input
          className=" bg-[#151515]"
          placeholder="Enter the text to send... "
        />
      </div>
    </div>
  );
};

export default FriendChat;
