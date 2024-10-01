"use client";
import { useState } from "react";
import { Input } from "./ui/input";

const SearchFriends = () => {
  const [users, setUsers] = useState([]);
  const [InputData, setInputData] = useState();

  const GetUsers = async (e: any) => {
    setInputData(e.target.value);

    const value = e.target.value;
    console.log(value);

    if (value.length > 0) {
      try {
        const res = await fetch(`/api/friends/searchAll?searchTerm=${value}`);

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Search error:", errorData.error);
          return;
        }

        const data = await res.json();
        console.log(data);

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      setUsers([]);
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
    <div className=" w-full p-3 bg-[#212121] rounded-md h-1/2">
      <Input
        className=" border border-[#3d3d3d] bg-[#1b1b1bbe] placeholder:text-[#555555]"
        onChange={searchProcess}
        placeholder="Search Friends ..."
        type="text"
        onKeyDown={handleSearchBarKeyDown}
      />
      <span className=" text-xs text-[#606060] w-full flex items-center justify-center mt-5">
        {users && users.length > 0 ? (
          <div></div>
        ) : (
          <div className=" w-10/12">
            "Search by name and connect with your friends!"
          </div>
        )}
      </span>
    </div>
  );
};

export default SearchFriends;
