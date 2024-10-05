"use client";

import { useAuthProvider } from "@/context/AuthContext";
import { UserData } from "@/types/user";
import { Cross, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { useGeneralContext } from "@/context/GeneralContext";

const AddFriendToChat = () => {
  const [AllUser, SetAllUser] = useState<UserData[] | undefined>([]);
  const { SetNewMessage } = useGeneralContext();
  const [InputData, setInputData] = useState();
  const { token } = useAuthProvider();
  const router = useRouter();

  const GetUsers = async (e: any) => {
    setInputData(e.target.value);

    const value = e.target.value;
    console.log(value);

    if (value.length > 0) {
      try {
        const res = await fetch(`/api/friends/searchAll?searchTerm=${value}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Search error:", errorData.error);
          return;
        }

        const data = await res.json();
        console.log(data.Users);
        SetAllUser(data.Users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      SetAllUser([]);
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

  const searchProcess = debounce(GetUsers, 1000);

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
        <span className=" text-xs text-[#606060] w-full flex items-center justify-center mt-5">
          {
            <div className=" w-10/12 flex justify-center">
              "Search by name and chat with your friends!"
            </div>
          }
        </span>
      </span>

      {AllUser && AllUser.length ? (
        <div className=" absolute bg-[#383838] top-[5rem] w-10/12 right-1/2 transform translate-x-1/2 rounded-md flex flex-col p-2 gap-1">
          {AllUser.map((val, key) => {
            return (
              <div
                className=" flex px-2 h-6 justify-start items-center gap-2 hover:bg-black rounded-md"
              >
                <User2Icon className=" rounded-full bg-black" />
                <span className=" text-sm">{val.name}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AddFriendToChat;
