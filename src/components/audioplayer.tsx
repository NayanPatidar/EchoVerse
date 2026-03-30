"use client";
import { Vibrant } from "node-vibrant/browser";
import { useEffect, useRef, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import Slider from "@mui/material/Slider";
import { Box, Stack } from "@mui/material";
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
import { DropupMenuAudioPlayer } from "./ui/SongFeaturesDropup";
import Image from "next/image";
import { getImageURL } from "@/lib/utils";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useGeneralContext } from "@/context/GeneralContext";

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
  const { IsAddToPlaylistFormOpen, IsUploadPostFormOpen, setColorPalette, secondaryAccentColor } =
    useGeneralContext();
  const [dominantColor, setDominantColor] = useState("#000");
  const [opacity, setOpacity] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#000");

  const {
    AudioFileLink,
    CurrentAudioIndex,
    SetCurrentAudioIndex,
    AudioCurrentTimeStamp,
    SetAudioCurrentTimeStamp,
    Play,
    SetPlay,
  } = useAudioPlayer();
  const intervalRef = useRef<NodeJS.Timeout | null | string | number>(null);
  // Tracks first mount so we don't reload audio that's already playing (e.g. after auth navigation)
  const isInitialMount = useRef(true);

  const playingRef = useRef(IsAddToPlaylistFormOpen);
  const playingRef2 = useRef(IsUploadPostFormOpen);

  useEffect(() => {
    playingRef.current = IsAddToPlaylistFormOpen;
    playingRef2.current = IsUploadPostFormOpen;
  }, [IsAddToPlaylistFormOpen, IsUploadPostFormOpen]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === " " &&
      playingRef.current == false &&
      playingRef2.current == false
    ) {
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

  useEffect(() => {
    if (!AudioFileLink || AudioFileLink.length === 0) return; // Prevent errors

    console.log("Audio File:", AudioFileLink[CurrentAudioIndex]);
    Vibrant.from(getImageURL(AudioFileLink[CurrentAudioIndex]?.image))
      .getPalette()
      .then((palette) => {
        console.log(palette);
        console.log(palette.Vibrant?.hex);
        if (palette && palette.Vibrant) {
          console.log("Setting Dominant Color :", palette.Vibrant.hex);
          setDominantColor(palette.Vibrant.hex);
          setColorPalette(palette.Vibrant.hex);
        }
      });
  }, [AudioFileLink, CurrentAudioIndex]);

  useEffect(() => {
    if (playing) {
      pause();
    }
  }, [Play]);

  const handleLoadAudio = () => {
    if (
      AudioFileLink &&
      AudioFileLink.length > 0 &&
      typeof AudioFileLink[CurrentAudioIndex].download_url[2].link === "string"
    ) {
      load(AudioFileLink[CurrentAudioIndex]?.download_url[2].link, {
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
    // On first mount: if audio is already playing (e.g. returning from auth page),
    // skip reload so playback continues seamlessly.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (playing) return;
    }
    handleLoadAudio();
  }, [AudioFileLink, CurrentAudioIndex]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        SetAudioCurrentTimeStamp(() => {
          const newVal = getPosition();
          if (newVal >= Math.floor(duration) - 0.5) {
            if (
              AudioFileLink &&
              CurrentAudioIndex < AudioFileLink?.length - 1
            ) {
              nextClick();
            } else if (!allowRepeat) {
              pause();
              SetAudioCurrentTimeStamp(0);
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

  useEffect(() => {
    let opacityValue = 1;

    const fadeOut = setInterval(() => {
      opacityValue -= 0.02;
      setOpacity(opacityValue);

      if (opacityValue <= 0) {
        clearInterval(fadeOut);
        setOpacity(0);
        setBackgroundColor(dominantColor);

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
  }, [dominantColor]);

  return (
    <div className="MainAudioPlayer fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 bg-black flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background: `linear-gradient(to right, ${backgroundColor} 0%, rgba(0, 0, 0, 0.8) 33%)`,
          opacity: opacity,
          transition: "background 2s ease-in-out",
        }}
      />
      <Slider
        sx={{
          padding: "0px",
          width: "100%",
          color: secondaryAccentColor,
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
      <div className="flex flex-row items-center flex-1 min-h-0 px-2 md:px-0">
        {/* Song info — compact on mobile, full on desktop */}
        <div className="flex items-center gap-2 pl-1 md:pl-5 flex-1 min-w-0 h-full">
          {AudioFileLink && (
            <Image
              src={getImageURL(AudioFileLink[CurrentAudioIndex]?.image)}
              alt="Song Image"
              width={36}
              height={36}
              className="rounded flex-shrink-0 md:w-[50px] md:h-[50px] cursor-pointer"
            />
          )}
          <div className="min-w-0 flex-1 md:w-56 cursor-pointer">
            {AudioFileLink && (
              <>
                <div className="text-white text-xs md:text-sm Montserrat-regular truncate">
                  {AudioFileLink[CurrentAudioIndex].name}
                </div>
                <div className="text-white/70 text-[10px] md:text-xs Montserrat-regular truncate hidden sm:block">
                  {AudioFileLink[CurrentAudioIndex].artist_map.artists[0].name}
                  {AudioFileLink[CurrentAudioIndex].artist_map.artists[1] && (
                    <span>
                      {", "}
                      {AudioFileLink[CurrentAudioIndex].artist_map.artists[1].name}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Playback controls — always visible, flex-shrink-0 keeps it centered between equal flex-1 sides */}
        <div className="flex-shrink-0 text-white flex flex-row items-center justify-center h-full gap-1 md:gap-5">
          <span
            className="cursor-pointer w-[34px] h-[34px] md:w-[42px] md:h-[42px] hidden sm:flex items-center justify-center"
            onClick={() => {
              setAllowRepeat((prev) => {
                loop(!prev);
                return !prev;
              });
            }}
          >
            {allowRepeat ? (
              <RepeatOneIcon sx={{ color: "white" }} className="SideIcons" />
            ) : (
              <RepeatIcon sx={{ color: "grey" }} className="SideIcons" />
            )}
          </span>
          <span
            className="cursor-pointer w-[34px] h-[34px] md:w-[42px] md:h-[42px] flex items-center justify-center"
            onClick={() => prevClick()}
          >
            <SkipPreviousIcon className="MainIcons" />
          </span>
          <span className="cursor-pointer" onClick={() => handlePlayPause()}>
            {!isReady && AudioFileLink ? (
              <div className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : !playing ? (
              <PlayArrowIcon className="MainIcons" />
            ) : (
              <PauseIcon className="MainIcons" />
            )}
          </span>
          <span
            className="cursor-pointer w-[34px] h-[34px] md:w-[42px] md:h-[42px] flex items-center justify-center"
            onClick={() => nextClick()}
          >
            <SkipNextIcon className="MainIcons" />
          </span>
          <span
            className="cursor-pointer w-[34px] h-[34px] md:w-[42px] md:h-[42px] hidden sm:flex items-center justify-center"
            onClick={() => setAllowShuffle((prev) => !prev)}
          >
            <ShuffleIcon
              sx={{ color: allowShuffle ? "white" : "grey" }}
              className="SideIcons"
            />
          </span>
        </div>

        {/* Volume + queue — desktop only */}
        <div className="h-full flex-1 text-white hidden md:flex items-center justify-around">
          <Box sx={{ width: 200, marginBottom: "0px" }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                sx={{
                  padding: "0px",
                  margin: "0px",
                  color: secondaryAccentColor,
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
