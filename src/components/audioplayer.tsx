"use client";

import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import Slider from "@mui/material/Slider";
import { IoMdPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { MdSkipNext } from "react-icons/md";
import { IoMdSkipBackward } from "react-icons/io";

const AudioPlayer = () => {
  const { load } = useGlobalAudioPlayer();
  const [play, setPlay] = useState<boolean>(false);

  //   useEffect(() => {
  //     load("./SamjhoNa.mp3", {
  //       autoplay: true,
  //     });
  //   }, []);
  return (
    <div className=" absolute bottom-0 w-full left-1/2 transform -translate-x-1/2 bg-black h-24 flex flex-col">
      <div>
        <Slider
          className=" absolute -top-[15px]"
          sx={{
            width: "100%",
            color: "red",
            "& .MuiSlider-rail": {
              color: "white",
            },
            "& .MuiSlider-thumb": {
              borderRadius: "10px",
              width: "12px",
              height: "12px",
            },
          }}
        />
      </div>
      <div className=" text-white flex flex-row items-center justify-center h-full gap-5">
        <span className=" cursor-pointer w-[42px] h-[42px] flex items-center justify-center">
          <IoMdSkipBackward size={28} width={42} />
        </span>
        <span className=" cursor-pointer" onClick={() => setPlay(!play)}>
          {play ? <IoMdPlay size={32} /> : <IoIosPause size={32} />}
        </span>
        <span className=" cursor-pointer">
          <MdSkipNext size={42} />
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
