import { PiListLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="NavbarMain sticky top-0 bg-[#121212] z-50 flex h-auto text-white rounded-t-lg ">
      <div className=" border-white h-16 flex items-center ">
        <form className="h-14 pl-[48px] flex items-center">
          <div className="  border-[1px] border-zinc-600  w-[480px] rounded-md flex flex-row items-center bg-[#242424] pl-4">
            <CiSearch color="zinc" size={24} />
            <input
              className=" text-white text-lg lato-regular h-10 w-[440px] rounded-lg pl-4 bg-[#242424] focus:outline-none placeholder-zinc-600"
              placeholder="Search songs, albums, artists, podcasts"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
