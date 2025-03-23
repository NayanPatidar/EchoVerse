"use client";
import { PiListLight } from "react-icons/pi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useGeneralContext } from "@/context/GeneralContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CustomNavbarProps {
  visible: boolean;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ visible }) => {
  const { colorPalette } = useGeneralContext();
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let opacityValue = 1;

    const fadeOut = setInterval(() => {
      opacityValue -= 0.02;
      setOpacity(opacityValue);

      if (opacityValue <= 0) {
        clearInterval(fadeOut);
        setOpacity(0);
        setBackgroundColor(colorPalette);

        let fadeInOpacity = 0;
        const fadeIn = setInterval(() => {
          fadeInOpacity += 0.02;
          setOpacity(fadeInOpacity);

          if (fadeInOpacity >= 1) {
            clearInterval(fadeIn);
            setOpacity(1);
          }
        }, 10);
      }
    }, 10);

    return () => clearInterval(fadeOut);
  }, [colorPalette]);

  return (
    <div
      className="NavbarMain sticky top-0 z-10 flex items-center h-14 md:h-16 text-white max-w-full transition-opacity duration-1000 ease-in-out "
      style={{
        opacity: 1,
        background: visible ? 0 : `rgb(20, 20, 20)`,
      }}
    >
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background: visible
            ? backgroundColor !== "#000000"
              ? `linear-gradient(to right, ${backgroundColor} 0%, rgba(0, 0, 0, 1) 88%)`
              : "rgba(0, 0, 0, 0.0)"
            : backgroundColor !== "#000000"
            ? `linear-gradient(to right, ${backgroundColor} 0%, rgba(0, 0, 0, 1) 88%)`
            : "rgb(20, 20, 20)",
          opacity: opacity,
          transition: "background 2s ease-in-out",
        }}
      />
      <div className=" cursor-pointer px-2 md:hidden ">
        <PiListLight size={24} />
      </div>
      <div className=" h-full flex flex-row justify-start min-w-full gap-2">
        <div className=" border-white h-16 flex items-center justify-start pl-10 gap-2">
          <IoCaretBackOutline
            onClick={() => router.back()}
            style={{
              fontSize: "36px",
              color: colorPalette !== "#000000" ? "#ffffff" : "#7d7d7d",
            }}
            className=" cursor-pointer"
          />
          <IoCaretForwardOutline
            onClick={() => window.history.forward()}
            style={{
              fontSize: "36px",
              color: colorPalette !== "#000000" ? "#ffffff" : "#7d7d7d",
            }}
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
