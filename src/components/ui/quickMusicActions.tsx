"use client";
import React, { ReactNode } from "react";
import { MdPlayCircle } from "react-icons/md";
import { LuShuffle } from "react-icons/lu";
import { IoIosMore } from "react-icons/io";
import { Episode, Song } from "@/types";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

interface QuickMusicActionsProps {
  Data: (Song | Episode)[];
}

const QuickMusicActions: React.FC<QuickMusicActionsProps> = ({ Data }) => {
  const { SetAudioCurrentTimeStamp, SetCurrentAudioIndex, SetAudioFileLink } =
    useAudioPlayer();

  const PlayAudio = () => {
    SetAudioCurrentTimeStamp(0);
    SetCurrentAudioIndex(0);
    SetAudioFileLink(Data);
  };

  return (
    <div className=" flex flex-row gap-5 w-full items-center pb-2">
      <span>
        <MdPlayCircle
          size={40}
          className=" text-red-600 transform transition-transform duration-300 hover:scale-110"
          onClick={() => PlayAudio()}
        />
      </span>
      <span>
        <LuShuffle
          size={25}
          className=" text-zinc-300 transform transition-transform duration-300 hover:scale-110 hover:text-white "
        />
      </span>
      <span>
        <IoIosMore
          size={32}
          className=" text-zinc-300 transform transition-transform duration-300 hover:scale-110 hover:text-white"
        />
      </span>
    </div>
  );
};

export default QuickMusicActions;
