import { Input } from "./ui/input";

const SearchFriends = () => {
  return (
    <div className=" w-full p-3 bg-[#212121] rounded-md h-1/2">
      <Input
        className=" border border-[#3d3d3d] bg-[#1b1b1bbe] placeholder:text-[#555555]"
        placeholder="Search Friends ..."
      />
      <span className=" text-xs text-[#606060] w-full flex items-center justify-center mt-5">
        <div className=" w-10/12">
          "Search by name and connect with your friends!"
        </div>
      </span>
    </div>
  );
};

export default SearchFriends;
