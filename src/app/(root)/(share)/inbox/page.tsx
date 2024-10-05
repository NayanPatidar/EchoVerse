"use client";
import AddFriendToChat from "@/components/chat/addFriendsToChat";
import ChatFriends from "@/components/chat/chatFriends";
import { Button } from "@/components/ui/button";
import { useGeneralContext } from "@/context/GeneralContext";
import { MessageCircleHeart, MessageCircleX } from "lucide-react";
import { useState } from "react";

const Inbox = () => {
  const { NewMessage, SetNewMessage } = useGeneralContext();

  return (
    <div className=" w-full flex flex-row gap-2 p-2">
      <div className=" w-4/12 h-full flex flex-col gap-2">
        <div className=" p-3 bg-[#212121] rounded-md   flex justify-center font-semibold">
          Chats
        </div>

        <ChatFriends />
      </div>
      <div
        className=" w-8/12 h-full overflow-y-hidden p-3 bg-[#212121] rounded-md flex justify-center items-center text-sm gap-1  "
        style={{ height: "calc(100vh - 11.5rem)" }}
      >
        <div className=" flex flex-col justify-center items-center gap-2">
          <MessageCircleHeart size={75} />
          Send a message to start a chat.
          <Button
            className=" bg-[#191919] hover:bg-black"
            onClick={() => SetNewMessage(true)}
          >
            Send Message
          </Button>
        </div>
      </div>
      {NewMessage ? <AddFriendToChat /> : null}
    </div>
  );
};

export default Inbox;
