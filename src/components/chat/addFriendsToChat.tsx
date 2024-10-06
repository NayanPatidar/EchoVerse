"use client";

import { useAuthProvider } from "@/context/AuthContext";
import { FriendData, UserData } from "@/types/user";
import { Cross, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { useGeneralContext } from "@/context/GeneralContext";
import { useChatContext } from "@/context/ChatContext";

const AddFriendToChat = () => {
  const [Friend, SetFriend] = useState<FriendData[] | undefined>([]);
  const { SetNewMessage } = useGeneralContext();
  const { SetFriendAdded } = useChatContext();
  const [InputData, setInputData] = useState();
  const { token } = useAuthProvider();
  const router = useRouter();

  const AddFriendToChatList = async (id: String, name: String) => {
    try {
      const res = await fetch(`/api/friends/searchAllFriends`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          friendId: id,
          friendName: name,
        }),
      });

      console.log("Add to the Friend Chat List");

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Search error:", errorData.error);
        return;
      }

      SetNewMessage(false);
      SetFriendAdded((prev) => !prev);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const GetUsers = async (e: any) => {
    setInputData(e.target.value);
    const value = e.target.value;

    if (value.length > 0) {
      try {
        const res = await fetch(
          `/api/friends/searchAllFriends?searchTerm=${value}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Search error:", errorData.error);
          return;
        }

        const data = await res.json();
        SetFriend(data.friends);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      SetFriend([]);
    }
  };

  const debounce = (cb: Function, time: number) => {
    let timer: any;
    return (e: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = cb(e);
      }, time);
    };
  };

  const handleSearchBarKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === " ") {
      event.stopPropagation();
    }
  };

  const searchProcess = debounce(GetUsers, 200);

  return (
    <div className=" absolute z-[150] w-2/5 p-3 bg-[#060606] rounded-md h-1/2 overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span
        className=" flex flex-col gap-1 justify-center items-end"
        onClick={() => SetNewMessage(false)}
      >
        <Cross className=" rotate-45" size={15} />
      </span>
      <span className="flex flex-col gap-1 justify-center items-center">
        <Input
          className=" w-11/12 border border-[#3d3d3d] bg-[#1b1b1bbe] placeholder:text-[#555555]"
          onChange={searchProcess}
          placeholder="Search Friends ..."
          type="text"
          onKeyDown={handleSearchBarKeyDown}
        />
        <div className=" w-10/12 flex justify-center text-xs text-[#606060]items-center  mt-5">
        &quot;Search by name and chat with your friends!&quot;
        </div>
      </span>

      {Friend && Friend.length ? (
        <div className=" absolute bg-black w-10/12 top-[5rem] right-1/2 transform translate-x-1/2 rounded-md flex flex-col gap-2">
          {Friend.map((val, key) => {
            console.log(val);

            return (
              <div
                key={key}
                onClick={() =>
                  AddFriendToChatList(val.friendId, val.friendName)
                }
                className=" h-8 flex justify-start items-center gap-2  rounded-md bg-[#161616] hover:bg-[#333333] pl-2"
              >
                <User2Icon className=" rounded-full bg-black" />
                <span className=" text-sm">{val.friendName}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AddFriendToChat;
