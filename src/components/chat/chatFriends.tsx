"use client";

import { useChatContext } from "@/context/ChatContext";
import { useEffect, useState } from "react";

const ChatFriends = () => {
  const { Friends } = useChatContext();

  return (
    <div className=" h-64 bg-[#212121]  text-white flex flex-col w-full">
      {Friends &&
        Friends.map((val, key) => {
          return (
            <div className=" bg-[#1c1c1c] hover:bg-[#101010] px-2 font-medium text-sm p-3">
              {val.friendName}
            </div>
          );
        })}
    </div>
  );
};

export default ChatFriends;
