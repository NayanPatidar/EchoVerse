"use client";

import { useChatContext } from "@/context/ChatContext";
import { MessageCircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatFriends = () => {
  const { Friends, SetChatUserName } = useChatContext();
  const router = useRouter();

  return (
    <div className=" h-full  bg-[#212121]  text-white flex flex-col w-full">
      {Friends ? (
        Friends.map((val, key) => {
          return (
            <div
              className=" bg-[#1c1c1c] hover:bg-[#101010] px-2 font-medium text-sm p-3"
              key={key}
              onClick={() => {
                router.push(`/inbox/direct/${val.relationId}`),
                  SetChatUserName(val.friendName);
              }}
            >
              {val.friendName}
            </div>
          );
        })
      ) : (
        <div className=" flex justify-center items-center gap-2 pt-4">
          <MessageCircleX />
          Add friends to chat with them !
        </div>
      )}
    </div>
  );
};

export default ChatFriends;
