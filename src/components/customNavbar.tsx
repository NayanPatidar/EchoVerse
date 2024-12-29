"use client";
import { PiListLight } from "react-icons/pi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";

interface CustomNavbarProps {
  visible: boolean;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ visible }) => {
  return (
    <div
      className={`NavbarMain sticky top-0 ${
        visible ? "bg-[#12121200]" : "bg-[#121212]"
      } z-10 flex items-center h-14 md:h-16 text-white max-w-full transition-colors duration-1000 ease-in-out`}
    >
      <div className=" cursor-pointer px-2 md:hidden ">
        <PiListLight size={24} />
      </div>
      <div className=" h-full flex flex-row justify-start min-w-full gap-2">
        <div className=" border-white h-16 flex items-center justify-start pl-10 gap-2">
          <IoCaretBackOutline
            style={{ fontSize: "36px", color: "#7d7d7d" }}
            className=" cursor-pointer"
          />
          <IoCaretForwardOutline
            style={{ fontSize: "36px", color: "#7d7d7d" }}
            className=" cursor-pointer"
          />
        </div>
        <div className="h-full text-black text-center text-sm w-24 flex items-center cursor-default">
          <span className=" h-8 p-1 rounded-2xl w-full bg-[#ffffff] flex items-center justify-center disable-select">
            Hello !
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
