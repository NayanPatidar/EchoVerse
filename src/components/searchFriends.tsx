"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { User, User2Icon } from "lucide-react";
import { UserData } from "@/types/user";
import { useRouter } from "next/navigation";
import { useAuthProvider } from "@/context/AuthContext";

const SearchFriends = () => {
  const [AllUser, SetAllUser] = useState<UserData[] | undefined>([]);
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
    <div className=" w-full p-3 bg-[#212121] rounded-md h-1/2 relative overflow-hidden">
      <Input
        className=" border border-[#3d3d3d] bg-[#1b1b1bbe] placeholder:text-[#555555]"
        onChange={searchProcess}
        placeholder="Search Friends ..."
        type="text"
        onKeyDown={handleSearchBarKeyDown}
      />
      <span className=" text-xs text-[#606060] w-full flex items-center justify-center mt-5">
        {
          <div className=" w-10/12">
            "Search by name and connect with your friends!"
          </div>
        }
      </span>

      {AllUser && AllUser.length ? (
        <div className=" absolute bg-[#383838] top-[4rem] w-full right-1/2 transform translate-x-1/2 rounded-md flex flex-col p-2 gap-1">
          {AllUser.map((val, key) => {
            return (
              <div
                className=" flex px-4 py-1 justify-start items-center gap-2 hover:bg-slate-400"
                onClick={() => router.push(`/user/${val.id}`)}
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

export default SearchFriends;
