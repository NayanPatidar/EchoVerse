"use client";

import { useEffect, useRef, useState } from "react";
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
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DropupMenuAudioPlayer } from "./ui/SongFeaturesDropup";
import Image from "next/image";
import { getImageURL } from "@/lib/utils";

const AudioPlayer = () => {
  const {
    isReady,
    load,
    play,
    pause,
    playing,
    duration,
    loop,
    seek,
    getPosition,
    setVolume,
  } = useGlobalAudioPlayer();
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [volume, setLocalVolume] = useState<number>(1);
  const [allowRepeat, setAllowRepeat] = useState<boolean>(false);
  const [allowShuffle, setAllowShuffle] = useState<boolean>(false);
  const {
    AudioFileLink,
    CurrentAudioIndex,
    SetCurrentAudioIndex,
    AudioCurrentTimeStamp,
    SetAudioCurrentTimeStamp,
  } = useAudioPlayer();
  const intervalRef = useRef<NodeJS.Timeout | null | string | number>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === " ") {
      console.log("Space Pressed");
      event.preventDefault();
      handlePlayPause();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playing]);

  const handleVolumeChange = (newValue: number | number[]) => {
    setVolume((newValue as number) / 100);
    setLocalVolume((newValue as number) / 100);
  };

  const handlePlayPause = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const handleLoadAudio = () => {
    if (
      AudioFileLink &&
      AudioFileLink.length > 0 &&
      typeof AudioFileLink[CurrentAudioIndex].download_url[3].link === "string"
    ) {
      load(AudioFileLink[CurrentAudioIndex]?.download_url[3].link, {
        autoplay: true,
      });
      setAudioDuration(AudioFileLink[CurrentAudioIndex]?.duration);
    }
  };

  const sliderPositionChange = (value: number | number[]) => {
    seek(value as number);
    SetAudioCurrentTimeStamp(value as number);
  };

  const prevClick = () => {
    if (CurrentAudioIndex > 0) {
      SetCurrentAudioIndex((index) => index - 1);
      SetAudioCurrentTimeStamp(0);
    }
  };

  const nextClick = () => {
    if (AudioFileLink && CurrentAudioIndex < AudioFileLink?.length - 1) {
      SetCurrentAudioIndex((index) => index + 1);
      SetAudioCurrentTimeStamp(0);
    }
  };

  useEffect(() => {
    handleLoadAudio();
  }, [AudioFileLink, CurrentAudioIndex]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        SetAudioCurrentTimeStamp(() => {
          const newVal = getPosition();
          if (newVal >= Math.floor(duration)) {
            if (!allowRepeat) {
              pause();
            }
            return 0;
          }
          return newVal;
        });
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [playing]);

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
        value={AudioCurrentTimeStamp}
        min={0}
        max={audioDuration}
        step={1}
        onChange={(_, value) => sliderPositionChange(value)}
      />
      <div className=" flex flex-row items-center justify-center align-middle h-full ">
        <div className=" h-full w-full">
          <div className=" flex justify-start items-center h-full pl-5 gap-2">
            <div>
              {AudioFileLink ? (
                <Image
                  src={getImageURL(AudioFileLink[CurrentAudioIndex]?.image)}
                  alt="Song Image"
                  width={50}
                  height={50}
                  className=" rounded-md  cursor-pointer"
                />
              ) : (
                ""
              )}
            </div>
            <div className=" h-full flex flex-col justify-center w-56  cursor-pointer">
              {AudioFileLink ? (
                <div>
                  <div className=" w-56 text-white text-sm Montserrat-regular overflow-hidden whitespace-nowrap text-ellipsis">
                    <span>{AudioFileLink[CurrentAudioIndex].name}</span>
                  </div>
                  <div className=" w-56 text-white text-xs Montserrat-regular overflow-hidden whitespace-nowrap text-ellipsis">
                    {" "}
                    <span>
                      <span className="text-white">
                        {
                          AudioFileLink[CurrentAudioIndex].artist_map.artists[0]
                            .name
                        }
                      </span>
                      {AudioFileLink[CurrentAudioIndex].artist_map
                        .artists[1] ? (
                        <span className="text-white">
                          ,{" "}
                          {
                            AudioFileLink[CurrentAudioIndex].artist_map
                              .artists[1]?.name
                          }
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className=" text-white flex flex-row items-center justify-center h-full gap-5 transform ">
          <span
            className=" cursor-pointer w-[42px] h-[42px] flex items-center justify-center"
            onClick={() => {
              setAllowRepeat((prev) => {
                loop(!prev);
                return !prev;
              });
            }}
          >
            {allowRepeat ? (
              <RepeatOneIcon sx={{ fontSize: "2rem", color: "white" }} />
            ) : (
              <RepeatIcon sx={{ fontSize: "2rem", color: "grey" }} />
            )}
          </span>
          <span
            className=" cursor-pointer w-[42px] h-[42px] flex items-center justify-center"
            onClick={() => prevClick()}
          >
            <SkipPreviousIcon sx={{ fontSize: "3rem" }} />
          </span>
          <span className=" cursor-pointer" onClick={() => handlePlayPause()}>
            {!playing ? (
              <PlayArrowIcon sx={{ fontSize: "3rem" }} />
            ) : (
              <PauseIcon sx={{ fontSize: "3rem" }} />
            )}
          </span>
          <span className=" cursor-pointer" onClick={() => nextClick()}>
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
        <div className=" h-full w-full text-white flex items-center justify-around">
          <Box sx={{ width: 200, marginBottom: "0px" }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                sx={{
                  padding: "0px",
                  margin: "0px",
                }}
                min={0}
                max={100}
                step={1}
                aria-label="Volume"
                size="small"
                value={volume * 100}
                onChange={(_, value) => handleVolumeChange(value as number)}
              />
              <VolumeUp />
            </Stack>
          </Box>
          <div>
            <DropupMenuAudioPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
