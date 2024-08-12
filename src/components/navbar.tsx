import { PiListLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <div className="NavbarMain sticky top-0 bg-[#121212] z-50 flex h-auto text-white rounded-t-lg ">
      <div className=" border-white h-16 flex items-center ">
        <form className="h-14 pl-[48px] flex items-center">
          <div className="  border-[1px] border-zinc-600  w-[480px] rounded-md flex flex-row items-center bg-[#242424] pl-4">
            <CiSearch color="zinc" size={24} />
            <Input
              placeholder="Search songs, albums, artists, podcasts"
              className="bg-[#242424] border-none w-[440px] rounded-lg placeholder-[#535353]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
