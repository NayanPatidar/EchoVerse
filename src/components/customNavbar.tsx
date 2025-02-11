"use client";
import { PiListLight } from "react-icons/pi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useGeneralContext } from "@/context/GeneralContext";

interface CustomNavbarProps {
  visible: boolean;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ visible }) => {
  const { colorPalette } = useGeneralContext();

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const transparentColor = hexToRgba(colorPalette, 1);
  const shadowColor = hexToRgba(colorPalette, 1);

  console.log(`bg-[${transparentColor}]`);
  console.log(`bg-[${colorPalette}]`);
  return (
    <div
      className={`NavbarMain sticky top-0 z-10 flex items-center h-14 md:h-16 text-white max-w-full transition-colors duration-1000 ease-in-out`}
      style={{
        background: visible ? 
        colorPalette !== "#000000" ? `linear-gradient(to right, ${colorPalette} 0%, rgba(0, 0, 0, 1) 88%)` : "rgba(0, 0, 0, 0.0)"
         : colorPalette !== "#000000" ? `linear-gradient(to right, ${colorPalette} 0%, rgba(0, 0, 0, 1) 88%)` : "rgb(20, 20, 20)",
        transition: "background 1s ease-in-out",
      }}
    >
      <div className=" cursor-pointer px-2 md:hidden ">
        <PiListLight size={24} />
      </div>
      <div className=" h-full flex flex-row justify-start min-w-full gap-2">
        <div className=" border-white h-16 flex items-center justify-start pl-10 gap-2">
          <IoCaretBackOutline
            style={{ fontSize: "36px", color:   colorPalette !== "#000000" ? "#ffffff"  : "#7d7d7d" }}
            className=" cursor-pointer"
          />
          <IoCaretForwardOutline
            style={{ fontSize: "36px", color:   colorPalette !== "#000000" ? "#ffffff"  : "#7d7d7d" }}
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
