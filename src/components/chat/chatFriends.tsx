"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { FriendData } from "@/types/user";
import { MessageCircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatFriends = () => {
  const { SetChatUserName, SetChatFriendId, FriendsAdded } = useChatContext();
  const router = useRouter();
  const { token } = useAuthProvider();
  const [friends, setFriends] = useState<FriendData[] | undefined>(undefined);

  const fetchFriends = async () => {
    const res = await fetch("/api/friends/getAllChatFriends", {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setFriends(data.res);
  };

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (!token) return;
    fetchFriends();
  }, [FriendsAdded]);

  return (
    <div className=" h-full  bg-[#212121]  text-white flex flex-col w-full p-1 rounded-md">
      {friends && friends.length > 0 ? (
        friends.map((val, key) => {
          return (
            <div
              className=" bg-[#1c1c1c] hover:bg-[#101010] px-3 font-medium text-sm p-3 cursor-pointer transition-colors duration-150 ease-in-out"
              key={key}
              onClick={() => {
                router.push(`/inbox/direct/${val.relationId}`),
                  SetChatUserName(val.friendName);
                SetChatFriendId(val.friendId);
              }}
            >
              {capitalizeFirstLetter(val.friendName)}
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
