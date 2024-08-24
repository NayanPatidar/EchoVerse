"use client";

import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import Slider from "@mui/material/Slider";
import { IoMdPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { MdSkipNext } from "react-icons/md";
import { IoMdSkipBackward } from "react-icons/io";
import { Box, IconButton, Stack } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const AudioPlayer = () => {
  const { load } = useGlobalAudioPlayer();
  const [play, setPlay] = useState<boolean>(false);
  const [value, setValue] = useState<number>(30);
  const [allowRepeat, setAllowRepeat] = useState<boolean>(false);
  const [allowShuffle, setAllowShuffle] = useState<boolean>(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  //   useEffect(() => {
  //     load("./SamjhoNa.mp3", {
  //       autoplay: true,
  //     });
  //   }, []);
  return (
    <div className=" fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 bg-black h-20 flex flex-col">
      <Slider
        sx={{
          padding: "0px",
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
      <div className=" flex flex-row items-center justify-center align-middle h-full ">
        <div className=" h-full w-full"></div>
        <div className=" text-white flex flex-row items-center justify-center h-full gap-5 transform ">
          <span
            className=" cursor-pointer w-[42px] h-[42px] flex items-center justify-center"
            onClick={() => setAllowRepeat((prev) => !prev)}
          >
            {allowRepeat ? (
              <RepeatOneIcon sx={{ fontSize: "2rem", color: "white" }} />
            ) : (
              <RepeatIcon sx={{ fontSize: "2rem", color: "grey" }} />
            )}
          </span>
          <span className=" cursor-pointer w-[42px] h-[42px] flex items-center justify-center">
            <SkipPreviousIcon sx={{ fontSize: "3rem" }} />
          </span>
          <span className=" cursor-pointer" onClick={() => setPlay(!play)}>
            {play ? (
              <PlayArrowIcon sx={{ fontSize: "3rem" }} />
            ) : (
              <PauseIcon sx={{ fontSize: "3rem" }} />
            )}
          </span>
          <span className=" cursor-pointer">
            <SkipNextIcon sx={{ fontSize: "3rem" }} />
          </span>
          <span
            className=" cursor-pointer w-[42px] h-[42px] flex items-center justify-center"
            onClick={() => setAllowShuffle((prev) => !prev)}
          >
            <ShuffleIcon
              sx={{ fontSize: "2rem", color: allowShuffle ? "white" : "grey" }}
            />
          </span>
        </div>
        <div className=" h-full w-full text-white flex items-center justify-center">
          <Box sx={{ width: 200, marginBottom: "0px" }}>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                sx={{
                  padding: "0px",
                  margin: "0px",
                }}
                aria-label="Volume"
                value={value}
                onChange={handleChange}
              />
              <VolumeUp />
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
