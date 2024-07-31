import { PiListLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className=" absolute flex bg-black w-full h-16 z-100 top-0 border-b-[1px] border-b-zinc-800">
      <div className=" w-[15rem] flex gap-3 h-16 items-center text-center justify-center">
        <PiListLight size={24} color="white" />
        <span>
          <img src="./LogoEchoVerse.png" className=" w-40" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
