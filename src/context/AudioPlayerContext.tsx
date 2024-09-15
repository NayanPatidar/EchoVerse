"use client";
import { Episode, Song } from "@/types";
import { useRouter } from "next/navigation";
import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { boolean } from "zod";

interface AudioDetails {
  AudioFileLink: (Song | Episode)[] | undefined;
  CurrentAudioIndex: number;
  Duration: number;
  AudioCurrentTimeStamp: number;
  Play: boolean;
  SetPlay: Dispatch<SetStateAction<boolean>>;
  SetAudioCurrentTimeStamp: Dispatch<SetStateAction<number>>;
  SetDuration: Dispatch<SetStateAction<number>>;
  SetAudioFileLink: Dispatch<SetStateAction<(Song | Episode)[] | undefined>>;
  SetCurrentAudioIndex: Dispatch<SetStateAction<number>>;
}
const AudioContext = createContext<AudioDetails | undefined>(undefined);

interface AudioPlayerProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProps> = ({
  children,
}) => {
  const [AudioFileLink, SetAudioFileLink] = useState<
    (Song | Episode)[] | undefined
  >(undefined);
  const [Duration, SetDuration] = useState<number>(0);
  const [CurrentAudioIndex, SetCurrentAudioIndex] = useState(0);
  const [AudioCurrentTimeStamp, SetAudioCurrentTimeStamp] = useState<number>(0);
  const [Play, SetPlay] = useState<boolean>(false);

  return (
    <AudioContext.Provider
      value={{
        AudioFileLink,
        SetAudioFileLink,
        Duration,
        SetDuration,
        CurrentAudioIndex,
        SetCurrentAudioIndex,
        AudioCurrentTimeStamp,
        SetAudioCurrentTimeStamp,
        Play,
        SetPlay,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = (): AudioDetails => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "Use Audio Player has to bee used in the AudioPlayer Provider"
    );
  }
  return context;
};
