import { PiListLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className=" absolute flex bg-black w-full h-16 z-100 top-0 border-b-[1px] border-b-zinc-800">
      <div className=" w-[15rem] flex gap-3 h-16 items-center text-center justify-center">
        <div className=" w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-full cursor-pointer">
          <PiListLight size={24} color="white" />
        </div>
        <span>
          <img src="./LogoEchoVerse2.png" className=" w-40" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
