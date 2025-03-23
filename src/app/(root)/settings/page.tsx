"use client";

import { useGeneralContext } from "@/context/GeneralContext";
import { useEffect, useState } from "react";

const ThemeSkeleton = ({ theme }: { theme: "light" | "dark" }) => {
  const isLight = theme === "light";

  return (
    <div
      className={`p-2 w-full h-full rounded-lg shadow-inner flex flex-col items-center justify-center ${
        isLight ? "bg-white" : "bg-[#1a1a1a]"
      }`}
    >
      <div className="w-full h-24 rounded flex flex-col p-2 gap-2">
        <div
          className={`w-full h-6 rounded-xl ${
            isLight ? "bg-gray-300" : "bg-gray-700"
          } animate-pulse`}
        />
        <div
          className={`w-full h-4 rounded ${
            isLight ? "bg-gray-300" : "bg-gray-700"
          } animate-pulse`}
        />
        <div
          className={`w-full h-4 rounded ${
            isLight ? "bg-gray-300" : "bg-gray-700"
          } animate-pulse`}
        />
      </div>
    </div>
  );
};

// Main Settings Component
const Settings = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  const [isLoading, setIsLoading] = useState(true);
  const {
    primaryAccentColor,
    setPrimaryAccentColor,
    secondaryAccentColor,
    setSecondaryAccentColor,
  } = useGeneralContext();

  const handleSelect = (theme: "light" | "dark") => {
    setSelectedTheme(theme);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[87.5%] flex flex-col p-4">
      <h2 className="gradientText2 font-bold text-2xl leading-relaxed">
        Appearance
      </h2>
      <span className="gradientText font-medium text-sm leading-relaxed">
        Automatically switch between light and dark themes based on your system
        preference.
      </span>

      <div className="flex gap-6 mt-6">
        {/* Light Theme Preview */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <div
            onClick={() => handleSelect("light")}
            className={`w-40 h-40 rounded-lg cursor-pointer border transition-all duration-300 flex items-center justify-center p-2 ${
              selectedTheme === "light"
                ? "border-2 border-white"
                : "border border-gray-500 hover:border-gray-400"
            }`}
          >
            {isLoading ? (
              <ThemeSkeleton theme="light" />
            ) : (
              <div className="p-2 w-full h-full bg-white rounded-lg shadow-inner flex flex-col items-center justify-center">
                <div className="w-full h-24 rounded flex flex-col p-2 gap-2">
                  <div className="bg-gray-400 w-full h-6 rounded-xl" />
                  <div className="bg-gray-300 w-full h-4 rounded" />
                  <div className="bg-gray-300 w-full h-4 rounded" />
                </div>
              </div>
            )}
          </div>
          <span className="font-normal text-sm text-center text-gray-400">
            Light
          </span>
        </div>

        {/* Dark Theme Preview */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <div
            onClick={() => handleSelect("dark")}
            className={`w-40 h-40 rounded-lg cursor-pointer border transition-all duration-300 flex items-center justify-center p-2 ${
              selectedTheme === "dark"
                ? "border-2 border-white"
                : "border border-gray-500 hover:border-gray-400"
            }`}
          >
            {isLoading ? (
              <ThemeSkeleton theme="dark" />
            ) : (
              <div className="p-2 w-full h-full bg-[#121212] rounded-lg shadow-inner flex flex-col items-center justify-center">
                <div className="w-full h-24 rounded flex flex-col p-2 gap-2">
                  <div className="bg-[#262626] w-full h-6 rounded-xl" />
                  <div className="bg-[#262626] w-full h-4 rounded-md" />
                  <div className="bg-[#262626] w-full h-4 rounded" />
                </div>
              </div>
            )}
          </div>
          <span className="font-normal text-sm text-center text-gray-400">
            Dark
          </span>
        </div>
      </div>

      <h2 className="gradientText2 font-bold text-2xl leading-relaxed mt-10">
        Theme
      </h2>
      <span className="gradientText font-medium text-sm leading-relaxed">
        Choose your preferred theme.
      </span>
      <div className="mt-4 flex items-center gap-4">
        <label
          htmlFor="themeColor"
          className="text-sm font-medium text-gray-300 whitespace-nowrap"
        >
          Primary Accent Color:
        </label>

        <input
          type="color"
          id="themeColor"
          value={primaryAccentColor}
          onChange={(e) => setPrimaryAccentColor(e.target.value)}
          className="w-10 h-10 p-1 rounded border border-gray-400 cursor-pointer bg-transparent"
        />

        <div
          className="w-8 h-8 rounded border"
          style={{ backgroundColor: primaryAccentColor }}
        />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <label
          htmlFor="themeColor"
          className="text-sm font-medium text-gray-300 whitespace-nowrap"
        >
          Secondary Accent Color:
        </label>

        <input
          type="color"
          id="themeColor"
          value={secondaryAccentColor}
          onChange={(e) => setSecondaryAccentColor(e.target.value)}
          className="w-10 h-10 p-1 rounded border border-gray-400 cursor-pointer bg-transparent"
        />

        <div
          className="w-8 h-8 rounded border"
          style={{ backgroundColor: secondaryAccentColor }}
        />
      </div>
    </div>
  );
};

export default Settings;
