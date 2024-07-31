import { PiListLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className=" absolute flex bg-black w-full h-16 z-100 top-0 border-b-[1px] border-b-zinc-800 text-white">
      <div className=" w-[15rem] flex gap-3 h-16 items-center text-center justify-center">
        <div className=" w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-full cursor-pointer">
          <PiListLight size={24} color="white" />
        </div>
        <span>
          <img src="./LogoEchoVerse2.png" className=" w-40" />
        </span>
      </div>
      <div className=" border-white h-16 flex items-center ">
        <form className="h-16 pl-[100px] flex items-center">
          <div className="  border-[1px] border-zinc-600  w-[480px] rounded-md flex flex-row items-center bg-[#313131] pl-4">
            <CiSearch color="zinc" size={24} />
            <input
              className=" text-white text-lg lato-regular h-10 w-[440px] rounded-lg pl-4 bg-[#313131] focus:outline-none placeholder-zinc-400"
              placeholder="Search songs, albums, artists, podcasts"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
