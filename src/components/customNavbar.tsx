"use client";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
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
      className="NavbarMain sticky top-0 z-10 flex items-center h-14 md:h-16 text-white max-w-full"
      style={{
        background: visible ? "transparent" : "rgb(18, 18, 18)",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background: visible
            ? backgroundColor !== "#000000"
              ? `linear-gradient(to right, ${backgroundColor} 0%, rgba(0, 0, 0, 1) 88%)`
              : "transparent"
            : backgroundColor !== "#000000"
            ? `linear-gradient(to right, ${backgroundColor} 0%, rgba(0, 0, 0, 1) 88%)`
            : "rgb(18, 18, 18)",
          opacity: opacity,
          transition: "background 2s ease-in-out",
        }}
      />
      <div className="h-full flex flex-row items-center pl-4 md:pl-6 gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors"
          aria-label="Go back"
        >
          <IoChevronBack
            size={18}
            color={colorPalette !== "#000000" ? "#ffffff" : "#b3b3b3"}
          />
        </button>
        <button
          onClick={() => window.history.forward()}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors"
          aria-label="Go forward"
        >
          <IoChevronForward
            size={18}
            color={colorPalette !== "#000000" ? "#ffffff" : "#b3b3b3"}
          />
        </button>
      </div>
    </div>
  );
};

export default CustomNavbar;
