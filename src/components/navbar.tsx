"use client";
import { HiOutlineBars3 } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className=" bg-black w-[16rem] h-screen text-white p-5">
      <div className=" flex gap-6 items-center text-center mb-5">
        <HiOutlineBars3 size={24} />
        <span>
          <img src="./LogoVerse.png" className=" w-36"/>
        </span>
      </div>
      <div>Nayan Patidar</div>
    </div>
  );
};

export default Navbar;
